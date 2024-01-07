
/**
 *@notice user game account information 
    *@dev : This class manages the game account information
    **/
export class GameAccount {
        gameAccountFilter={
        protocol:this.protocol,
        protocolPath:"gameAccount",
        schema:this.gameAccountSchema,
    }
    constructor(
        web5,
        protocol,
        gameAccountSchema,
        protocolID){
        this.protocol = protocol;
        this.web5 = web5;
        this.gameAccountSchema = gameAccountSchema;
        this.protocolID = protocolID; 
        this.gameAccountFilter = {
            protocol,
            protocolPath: "gameAccount",
            schema: gameAccountSchema,
        };

    }

    //get user game account 
    getGameAccount = async(userDID)=>{
        const { record:accountData } = await this.web5.dwn.records.read({
            from:userDID,
            message: {
                    filter: {
                        ...this.gameAccountFilter,
                    }
                }
            })
        const  gameAccount = await accountData.data?.[0].json();


        return {gameAccount,accountData};
    }

    //get all accounts
    getGameAccounts = async ()=>{
        const { record:accountDatas } = await this.web5.dwn.records.read({
            from:this.protocolID,
            message: {
                    filter: {
                        ...this.gameAccountFilter,
                    }
                }
            })
        const gameAccounts =await Promise.all(accountDatas.map(el=>el.data?.json()));
        return gameAccounts;
    }

    //create a game account
    createGameAccount= async (accountObject,userDID) => {
        const { record: account } = await this.web5.dwn.records.create({
                        data: accountObject,
                        message: {
                            ...this.gameAccountFilter,
                            recipient: userDID,
                            contextId: userDID,
                            parentId: this.protocolID,
                            published: true
                        },
                    });

        //attach account to the current user
        await Promise.all([
                        account.send(userDID),
                        account.send(this.protocolID),
                    ]);
        return account;
    };

    //update game account
    updateGameAccount=async(accountObject,accountID)=>{
        // Get the game account corresponding to the account ID
        const { record:accountData } = await this.web5.dwn.records.read({
        message: {
                filter: {
                    recordId: accountID,
                    ...this.gameAccountFilter, 
                }
            }
        });
        const account = await accountData.data?.json();

        // Update account
        const { status } = await accountData.update({
                        data: { ...account, ...accountObject },
                    });
        return status;
    }

    //delete account
    deleteGameAccount=async(accountID)=>{
        const status = await this.web5.dwn.records.delete({
            message: {
                recordId: accountID,
                ...this.gameAccountFilter,
            },
        });

        return status;
    }

}