
/**
 *@notice fighters manager
*@dev : This class manages users and protocol fighters for astrolith
**/
export class Fighters {

    constructor(web5, protocol, fighterCharacterSchema, protocolID) {
        this.web5 = web5;
        this.protocolID = protocolID;
        this.protocol = protocol;
        this.fighterCharacterSchema = fighterCharacterSchema;
        fighterFilter = {
            protocol,
            protocolPath: "fighterCharacters",
            schema:fighterCharacterSchema,
        };
    }

    //get a fighter from the protocol
    getFighter = async (fighterRecordID) => {
        const { record: fighterData } = await this.web5.dwn.records.read({
            from: this.protocolID,
            message: {
                filter: {
                    recordId: fighterRecordID,
                    ...this.fighterFilter,
                },
            },
        });
        const fighter = await fighterData.data?.json();
        return fighter;
    };

    //get all fighters
    getAllFighters = async () => {
        const { record: fightersData } = await this.web5.dwn.records.read({
            from: this.protocolID,
            message: {
                filter: {
                    ...this.fighterFilter,
                },
            },
        });
        const fighters = await Promise.all(
            fightersData.map((el) => el.data?.json())
        );
        return fighters;
    };

    //create a fighter
    createFighter = async (fighterObject) => {
        //process file object to base64 string
        const image = await this.toBase64String(fighterObject.image);
        const obj = { ...fighterObject, image };
        const { record: fighterData } = await this.web5.dwn.records.create({
            data: obj,
            message: {
                ...this.fighterFilter,
                published: true,
            },
        });

        //attach fighter to protocol DID
        await fighterData.send(this.protocolID);
        return fighterData;
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
