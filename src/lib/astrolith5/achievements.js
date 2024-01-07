

/**
 *@notice achievements manager
    *@dev : This class manages users achievements over the course of the game for astrolith
    **/
export class Achievements {

    constructor(
        web5,
        protocol,
        achievementSchema,
        protocolID){

        this.protocolID = protocolID;
        this.protocol = protocol;
        this.web5 = web5;
        this.achievementSchema = achievementSchema;

        this.achievementFilter = {
            protocol,
            protocolPath: "achievements",
            schema: achievementSchema,
        };


    }

    //get an achievement
    getAchievement= async(achievementRecordID)=>{
        const { record:achievementData } = await this.web5.dwn.records.read({
            message: {
                    filter: {
                        recordId: achievementRecordID,
                        ...this.achievementFilter,
                    }
                }
            })
        const achievement = await achievementData.data?.json();
        return achievement;
    }

    //get all achievements
    getAchievements = async (userDID)=>{
        const { record:achievementDatas } = await this.web5.dwn.records.read({
            from:userDID,
            message: {
                    filter: {
                        ...this.achievementFilter,
                    }
                }
        })
        const achievements =await Promise.all(achievementDatas.map(el=>el.data?.json()));
        return achievements;
    }

    //create achievement for a user
    createAchievement= async (achievementObject,userDID) => {
        //process file object to base64 string
        const image = await this.toBase64String(achievementObject.image);
        const obj = {...achievementObject,image};
        const { record :achievementData} = await this.web5.dwn.records.create({
            data: obj,
            message: {
                    ...this.achievementFilter,
                    recipient: this.userDID,
                    contextId : userDID,
                    parentId : userDID,
                    published: true
                },
        });

        //attach achievement to user DID and protocol
        await Promise.all([
                        achievementData.send(userDID),
                        achievementData.send(this.protocolID),
                    ]);
        return achievementData;
    };


    //helper function to convert file to base64 encoded string
    toBase64String = async(imageFile)=>{
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
    }

}