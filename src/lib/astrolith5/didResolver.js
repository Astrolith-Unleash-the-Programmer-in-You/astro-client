/**
 *@notice astrolith DID resolver
 *@dev : This class manages resolvers and getters for players user names
 **/

export class AstrolithDIDResolver {
	constructor(web5,protocol, protocolID,didSchema) {
		this.protocol = protocol,
		this.protocolID = protocolID;
		this.web5 = web5;
		this.didResolverSchema = didSchema;
		this.didResolverFilter = {
			protocol: protocol,
			protocolPath: "didResolver",
			schema: didSchema,
		};

	}
	readOrCreate = async()=>{

		const { record } = await this.web5.dwn.records.read({
			from: this.protocolID,
			message: {
				filter: {
					...this.didResolverFilter,
				},
			},
		});

		console.log(record, "add record",this.didResolverFilter);

		if (!record || record?.length == 0) {
			const { record: resolverRecords } = await this.web5.dwn.records.create({
				data: { userName:"astrolithDIDName",userDID: this.protocolID },
				message: {
					...this.didResolverFilter,
					published: true,
				},
			});
			resolverRecords?.send(this.protocolID);
			console.log(resolverRecords,this.protocolID , "resolver records created");

			return [resolverRecords.data?.json()];
		}
	}
	//add DID user names
	hookupUserDID = async (userName, userDID) => {
		//check if userName is valid
		const isValid = isValidUserName(userName);
		if(isValid) return {status:422,message:`Invalid user name ${userName}`};
		const { record: userNameDatas } = await this.web5.dwn.records.read({
			from: this.protocolID,
			message: {
				filter: {
					...this.didResolverFilter,
				},
			},
		});
		const userNames = await Promise.all(
			userNameDatas.map((el) => el.data?.json())
		);

		//check if did already exists on the username
		const existUserNameResolved = userNames.find(
			(user) => user[`${userDID}`] === userDID
		);
		//check if userName exists
		const existUserName = userNames.filter((user) =>
			user.userName === userName
			// Object.prototype.hasOwnProperty.call(user, userName)
		);

		if (existUserNameResolved)
			return {
				status: 400,
				message: `User ${userName} is already mapped to your DID.`,
			};
		if (existUserName)
			return {
				status: 400,
				message: `User ${userName} is already existing; try another`,
			};
		//add name
		const { status } = await userNameDatas.update({
			data: { ...userNames, [`${userName}`]:userName,[`${userDID}`]: userDID },
		});
		return { status, message: `User ${userName} resolved successfully` };
	};

	//resolve DID
	resolve = async (userDID) => {
		const { record } = await this.web5.dwn.records.read({
			message: {
				filter: {
					...this.didResolverFilter,
				},
			},
		});
console.log(didUserNames, "user name from did resolver111");
		const didUserNames = await Promise.all(record.map((el) => el.data?.json()));
		console.log(didUserNames,"user name from did resolver")

		const userName = Object.entries(didUserNames).filter(
			([, value]) => value === userDID
		);
		console.log(userName, "resolver");
		return userName; //array [userName,DID]
	};
}

//utility function
const isValidUserName= (user)=> {
	// Regular expression to match only letters, numbers, and underscores
	const validPattern = /^[a-zA-Z0-9_]+$/;

	// Test if the string matches the pattern
	return validPattern.test(user);
}