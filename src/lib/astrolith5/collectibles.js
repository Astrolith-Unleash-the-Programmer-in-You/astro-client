
import { Temporal } from "@js-temporal/polyfill";
import { GameAccount } from "./gameAccounts";

/**
 *@notice collectibles manager
 *@dev : This class manages users/protocol collectibles over the course of the game for astrolith
 **/
export class Collectibles {


	constructor(
		web5,
		protocol,
		collectibleSchema,
		collectibleImageSchema,
		gameAccountSchema,
		protocolID
	) {
		this.protocolID = protocolID;
		this.protocol = protocol;
		this.web5 = web5;
		this.collectibleSchema = collectibleSchema;
		this.collectibleSchema = collectibleImageSchema;
		this.gameAccountSchema = gameAccountSchema;

		this.collectibleFilter = {
			protocol,
			protocolPath: "collectibles",
			schema: collectibleSchema,
		};
	}

	//get a collectible from a user account
	getCollectible = async (userDID) => {
		const userAccount = await this.getUserAccount(userDID);
		const collectible = userAccount?.collectibles;
		return collectible;
	};

	//get all collectibles in the protocol
	getAllCollectibles = async () => {
		const { record: collectibleDatas } = await this.web5.dwn.records.read({
			from: this.protocolID,
			message: {
				filter: {
					...this.collectibleFilter,
				},
			},
		});
		const collectibles = await Promise.all(
			collectibleDatas.map((el) => el.data?.json())
		);
		return collectibles;
	};

	//create collectible for a user
	createCollectible = async (collectibleObject, userDID) => {
		//get all
		const collectibles = await this.getAllCollectibles(this.protocolID);
		const { gameAccount: userAccount, accountData } = await this.getUserAccount(
			userDID
		);
		//filter collectibles to match collected objects
		const item = collectibles.filter(
			(el) => el.type === collectibleObject.type
		);
		const col = {
			...collectibleObject,
			image: item.id,
			date: Temporal.Now.instant(),
		};
		if (!item) return { invalidCollectible: false };
		const obj = {
			...userAccount,
			collectibles: [...userAccount.collectibles, col],
		};

		//update user account
		const { status } = await accountData.update({ data: obj });
		return status;
	};

	//transfer collectible data
	transferCollectible = async (fromDID, toDID, collectibleID) => {
		const { gameAccount: fromUser, accountData: fromUserData } =
			await this.getUserAccount(fromDID);
		const { gameAccount: toUser, accountData: toUserData } =
			await this.getUserAccount(toDID);

		//check if fromUserData has the collectible ID
		const existCollectible = fromUser.collectibles?.filter(
			(collectible) => collectible.id === collectibleID
		);
		if (!existCollectible)
			return { status: 404, message: "You do not own this collectible." };

		//update new owner
		const updateOwner = {
			...existCollectible,
			owners: [...existCollectible.owners, toUser.did],
			currentOwner: toDID,
			date: Temporal.Now.instant(),
		};
		//update to and from accounts
		const fromUserUpdatingField = {
			...fromUser,
			collectibles: fromUser.collectibles?.filter(
				(collectible) => collectible.id !== collectibleID
			),
		};
		const toUserUpdatingField = {
			...toUser,
			collectibles: [...toUser.collectibles, updateOwner],
		};

		const { status: fromUserStatus } = await fromUserData.update({
			data: fromUserUpdatingField,
		});
		const { status: toUserStatus } = await toUserData.update({
			data: toUserUpdatingField,
		});
		return { fromUserStatus, toUserStatus };
	};

	collectibleUploads = async (collectiblePropertiesObject) => {
		//process file object to base64 string
		const image = await this.toBase64String(collectiblePropertiesObject.image);
		const obj = { ...collectiblePropertiesObject, image };
		const { record: collectibleData } = await this.web5.dwn.records.create({
			data: obj,
			message: {
				...this.collectibleFilter,
				protocolPath: "collectiblesImage",
				schema: this.collectibleImageSchema,
				recipient: this.protocolID,
				published: true,
			},
		});
		return collectibleData;
	};

	getUserAccount = async (userDID) => {
		const gameAccount = new GameAccount(
			this.web5,
			this.protocol,
			this.gameAccountSchema
		);
		const userAccount = await gameAccount.getGameAccount(userDID);
		return userAccount;
	};
	//helper function to convert file to base64 encoded string
	toBase64String = async (imageFile) => {
		let base64Image = null;

		if (imageFile) {
			const binaryImage = await imageFile.arrayBuffer();
			base64Image = btoa(
				new Uint8Array(binaryImage).reduce(
					(data, byte) => data + String.fromCharCode(byte),
					""
				)
			);
		}
		return base64Image;
	};
}
