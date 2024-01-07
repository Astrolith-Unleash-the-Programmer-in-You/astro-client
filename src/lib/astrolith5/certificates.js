import { fabric } from "fabric";
import { Temporal } from "@js-temporal/polyfill";
import { VerifiableCredential, PresentationExchange } from "@web5/credentials";

/**
 *@notice certificate manager
 *@dev : This class manages certificates for astrolith
 **/
export class Certificates {
	certifcatePresentationDefinitions = {
		id: "CertificateOfCompletionAstrolithProtocol",
		name: "Astrolith Certificate",
		purpose: "Certification of completion for astrolith ",
		input_descriptors: [
			{
				id: "CertificateOfCompletion",
				purpose: "Certification of completion for astrolith ",
				constraints: {
					fields: [
						{
							path: ["$.credentialSubject.isCertified"],
						},
					],
				},
			},
		],
	};



	constructor(web5, protocol, certificateSchema, protocolID) {
		this.web5 = web5;
		this.protocolID = protocolID;
		this.protocol = protocol;
		this.certificateSchema = certificateSchema;
		this.certificateFilter = {
				protocol,
				protocolPath: "certificates",
				schema: certificateSchema,
			};
	}

	//get a user certificate
	getCertificate = async (certificateRecordID, userDID) => {
		const { record: certificateData } = await this.web5.dwn.records.read({
			from: userDID,
			message: {
				filter: {
					recordId: certificateRecordID,
					...this.certificateFilter,
				},
			},
		});
		const certificate = await certificateData.data?.json();
		return certificate;
	};

	//get all user certificates
	getAllCertificates = async (userDID) => {
		const { record: certifcatesData } = await this.web5.dwn.records.read({
			from: userDID,
			message: {
				filter: {
					...this.certificateFilter,
				},
			},
		});
		const certificates = await Promise.all(
			certifcatesData.map((el) => el.data?.json())
		);
		return certificates;
	};
	//using fabric js to generate images from templates
	//issue certificate
	issueCertificate = async (template, userDID, certificateObject) => {
		//process file object to base64 string
		const image = await this.convertTemplateToImage(template);
		const obj = { ...certificateObject, image };
		let now = Temporal.Now.instant();
		const expirationDate = now.add({ years: 100 });
		//create VC for astrolith
		const vc = await VerifiableCredential.create({
			type: "AstrolithCertificate",
			issuer: this.protocolID,
			subject: userDID,
			expirationDate: expirationDate,
			data: obj,
		});

		//sign certificate
		const vc_jwt_certificate = await vc.sign({ did: userDID });

		//create certificate
		const { record: certificateData } = await this.web5.dwn.records.create({
			data: { ...obj, verifiableCertificate: vc_jwt_certificate },
			message: {
				...this.certificateFilter,
				published: true,
			},
		});

		//attach certificate to subject DID
		await Promise.all([
			certificateData.send(userDID),
			certificateData.send(this.protocolID),
		]);
		return certificateData;
	};

	//verify certificate using astrolith presentation exchange definition
	verifyCertificate = async (certificateRecordID, userDID) => {
		try {
			const certificate = await this.getCertificate(
				certificateRecordID,
				userDID
			);
			//validate certificate presentation
			const certificateDefinitionValidation =
				PresentationExchange.validateDefinition({
					presentationDefinition: this.certifcatePresentationDefinitions,
				});
			console.log("cert validation", certificateDefinitionValidation);
			PresentationExchange.satisfiesPresentationDefinition({
				vcJwts: [certificate.verifiableCertificate],
				presentationDefinition: this.certifcatePresentationDefinitions,
			});

			const presentationResult =
				PresentationExchange.createPresentationFromCredentials({
					vcJwts: [certificate.verifiableCertificate],
					presentationDefinition: this.certifcatePresentationDefinitions,
				});

			//verify credential
			const vcJwt = presentationResult.presentation.verifiableCredential?.[0];
			const certificateResult = await VerifiableCredential.verify({
				vcJwt,
			});
			const parsedVC = await VerifiableCredential.parseJwt({ vcJwt });

			return { verifiedCertificate: parsedVC, certificateResult };
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	//helper function to convert html certificate template to base64 encoded string
	convertTemplateToImage = async (template) => {
		const canvas = new fabric.Canvas();

		// const template = `
		// <div>
		//     <h2>Certificates</h2>
		//     <h2>Name : Surath</h2>
		//     <h2>this is to certify that surath is a qualified developer</h2>
		// </div>
		// `;

		// Convert HTML content to Fabric.js objects
		const fabricObjects = fabric.util.groupSVGElements(
			fabric.parseSVGDocument(template, {}),
			{
				width: 400,
				height: 200,
			}
		);

		// Add the Fabric.js objects to the canvas
		canvas.add(fabricObjects);

		// If you want to export the canvas to an image
		const dataUrl = canvas.toDataURL();
		console.log("Data URL:", dataUrl);
		return dataUrl;
	};
}
