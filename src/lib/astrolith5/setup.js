import {Fighters } from "./fighters";
import { Certificates } from "./certificates";
import { GameAccount } from "./gameAccounts";
import { Achievements } from "./achievements";
import { Collectibles } from "./collectibles";
import { AstrolithProtocol } from "./protocol";
import { PlayerProfile } from "./playerProfile";
import { AstrolithDIDResolver } from "./didResolver";
import { GameQuestionAndTestCases } from "./gameQuestionAndTestCases";

/**
 * @notice Setup for astrolith protocol
 */

export class AstrolithSetup {
	constructor(web5, userDID, protocolDID) {
		this.web5 = web5;
		this.userDID = userDID;
		this.protocolID = protocolDID;
		this.astrolith = this.initiateSetup();
		return this.astrolith;
	}

	//initialize Astrolith setup
	initiateSetup = async () => {
		const profileSchema = "http://astrolith.com/schemas/profile";
		const accountSchema = "http://astrolith.com/schemas/game-account";
		const gameQuestionAndTestCasesSchema =
			"http://astrolith.com/schemas/game-question-and-test-cases";
		const achievementSchema = "http://astrolith.com/schemas/achievements";
		const collectibleSchema = "http://astrolith.com/schemas/collectibles";
		const collectiblesImageSchema =
			"http://astrolith.com/schemas/collectibles/image";
		const certificateSchema = "http://astrolith.com/schemas/certificates";
		const fighterSchema = "http://astrolith.com/schemas/fighter-characters";
		console.log("this got here not");
		this.astrolithProtocol = await new AstrolithProtocol().configureProtocol(
			this.web5
		);
		console.log("this got here");
		this.resolver = new AstrolithDIDResolver(this.web5, this.astrolithProtocol);
		this.playerProfile = new PlayerProfile(
			this.web5,
			this.astrolithProtocol,
			profileSchema,
			this.protocolID
		);
		this.playerAccount = new GameAccount(
			this.web5,
			this.astrolithProtocol,
			accountSchema,
			this.protocolID
		);

		this.gameQTC = new GameQuestionAndTestCases(
			this.web5,
			this.astrolithProtocol,
			gameQuestionAndTestCasesSchema,
			this.protocolID
		);

		this.playerAchievement = new Achievements(
			this.web5,
			this.astrolithProtocol,
			achievementSchema,
			this.protocolID
		);

		this.playerCollectibles = new Collectibles(
			this.web5,
			this.astrolithProtocol,
			collectibleSchema,
			collectiblesImageSchema,
			accountSchema,
			this.protocolID
		);

		this.fighterCharacters = new Fighters(
			this.web5,
			this.astrolithProtocol,
			fighterSchema,
			this.protocolID
		);

		this.playerCertificate = new Certificates(
			this.web5,
			this.astrolithProtocol,
			certificateSchema,
			this.protocolID
		);
		return {
			protocolID: this.protocolID,
			gameQTC: this.gameQTC,
			resolver: this.resolver,
			playerProfile: this.playerProfile,
			playerAccount: this.playerAccount,
			astrolithProtocol: this.astrolithProtocol,
			playerAchievement: this.playerAchievement,
			playerCollectibles: this.playerCollectibles,
			fighterCharacters: this.fighterCharacters,
			playerCertificate: this.playerCertificate,
		};
	};

	//load game state
	loadGameState = async () => {
		//load fighters
		// const fighters = await this.fighterCharacters.getAllFighters();
		//playerprofile
		// const currentPlayerProfile = await this.playerProfile.getProfile(this.userDID);
		// //playeraccount
		// const { gameAccount, accountData } = await this.playerAccount.getGameAccount(this.userDID);
		// //top 10 leader board players
		// const playersProfile = await this.playerProfile.getProfiles();
		// const playersAccount = await this.playerAccount.getGameAccounts();
		// ///@dev array of players profile should equal the account and each contains a userDID key in their object
		// ///@dev On^2 O of n square function //:TODO: optimize this
		// const mappedProfileToAccounts = playersProfile.map(profile=>{
		//     const account = playersAccount.find(account=> account.userDID === profile.userDID);
		//     if(!account) return null;
		//     return {account,profile};
		// })
		// //get top 10 players from accounts
		// const top10Players =  mappedProfileToAccounts.sort((a,b) => b.account.gamePoints - a.account.gamePoints).slice(0,10);
		// //load current player game level games
		// const currentGamePlay = await this.gameQTC.getAllQTCLevel(gameAccount.level);
		// //load current player achievements
		// const playerAchievements = await this.playerAchievement.getAchievements(this.userDID);
		// //load current player collectibles
		// const playerCollectibles =
		// 					await this.playerCollectibles.getCollectible(this.userDID);
		// //load current player certificates
		// const playerCertificates = await this.playerCertificate.getAllCertificates(this.userDID);
		// return {
		//     fighters,
		//     currentPlayerProfile,
		//     gameAccount,
		//     accountData,
		//     top10Players,
		//     currentGamePlay,
		//     playerAchievements,
		//     playerCollectibles,
		//     playerCertificates
		// }
	};
}
