


/**
 *@notice protocol game questions and answers manager
    *@dev : This class manages the game questions and test cases for astrolith
    **/
export class GameQuestionAndTestCases {
        gameQuestionAndTestCasesFilter={
        protocol:this.protocol,
        protocolPath:"gameQuestionAndTestCases",
        schema:this.gameQTCSchema,
    }
    constructor(
        web5,
        protocol,
        gameQTCSchema,
        protocolID){
        this.protocolID = protocolID;
        this.protocol = protocol;
        this.web5 = web5;
        this.gameQTCSchema = gameQTCSchema;

    }

    //get questions and test case object
    getQTC= async(qtcRecordID)=>{
        const { record:QTCData } = await this.web5.dwn.records.read({
            from:this.protocolID,
            message: {
                    filter: {
                        recordId: qtcRecordID,
                        ...this.gameQuestionAndTestCasesFilter,
                    }
                }
            })
        const qtc = await QTCData.data?.json();
        return qtc;
    }

    //get all quesitons and test cases
    getAllQTCs = async ()=>{
        const { record:qtcDatas } = await this.web5.dwn.records.read({
            from:this.protocolID,
            message: {
                    filter: {
                        ...this.gameQuestionAndTestCasesFilter,
                    }
                }
            })
        const qtcs =await Promise.all(qtcDatas.map(el=>el.data?.json()));
        return qtcs;
    }
    //get all games for a given stage/level
    getAllQTCLevel = async (gameLevel)=>{
        const { record:qtcDatas } = await this.web5.dwn.records.read({
            from:this.protocolID,
            message: {
                    filter: {
                        ...this.gameQuestionAndTestCasesFilter,
                    }
                }
            })
        const qtcs =await Promise.all(qtcDatas.map(el=>el.data?.json()));
        const stageGames = qtcs.filter(game => game.level === gameLevel);
        return stageGames;
    }

    //create a game question and test cases
    createGameQTCs= async (qtcObject) => {
        const { record :qtcData} = await this.web5.dwn.records.create({
        data: qtcObject,
        message: {
            ...this.gameQuestionAndTestCasesFilter,
            recipient: this.protocolID,
            published: true
        },
        });

        //attach qtc to protocol DID
        await qtcData.send(this.protocolID);
        return qtcData;
    };

    //update  game question and test cases data
    updateGameQTCs=async(qtcObject,qtcRecordID)=>{
        // Get the qtc corresponding to the qtc record ID
        const { record:qtcData } = await this.web5.dwn.records.read({
            from:this.protocolID,
            message: {
                    filter: {
                        recordId: qtcRecordID,
                        ...this.gameQuestionAndTestCasesFilter, 
                    }
                }
        });
        const qtc = await qtcData.data?.json();

        // Update qtc
        const {status} = await qtcData.update({ data: {...qtc,qtcObject} });
        return status;
    }

    //delete  game question and test cases data
    deleteGameQTCs=async(qtcRecordID)=>{
        const status = await this.web5.dwn.records.delete({
            from:this.protocolID,
            message: {
                recordId: qtcRecordID,
                ...this.gameQuestionAndTestCasesFilter,
            },
        });

        return status;
    }

}