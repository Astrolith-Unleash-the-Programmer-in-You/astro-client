

/**
 *@notice protocol for astrolith
*@dev : This class configures the protocol and date structures for the astrolith system.
* **/
export class AstrolithProtocol {
    astrolithProtocol = {
        "protocol": "http://astrolith.com",
        "published": true,
        "types": {
            "profile": {
                "schema": "http://astrolith.com/schemas/profile",
                "dataFormats": ["application/json"]
            },
            "gameAccount": {
                "schema": "http://astrolith.com/schemas/game-account",
                "dataFormats": ["application/json"]
            },
            "gameQuestionAndTestCases": {
                "schema": "http://astrolith.com/schemas/game-question-and-test-cases",
                "dataFormats": ["application/json"]
            },
            "achievements": {
                "schema": "http://astrolith.com/schemas/achievements",
                "dataFormats": ["application/json"]
            },
            "collectibles": {
                "schema": "http://astrolith.com/schemas/collectibles",
                "dataFormats": ["application/json"]
            },
            "collectiblesImage": {
                "schema": "http://astrolith.com/schemas/collectibles/image",
                "dataFormats": [
                    "image/png",
                    "image/jpeg",
                    "image/gif",
                    "image/webp",
                    "image/jpg"
                ]
            },
            "certificates": {
                "schema": "http://astrolith.com/schemas/certificates",
                "dataFormats": ["application/json"]
            },
            "fighterCharacters": {
                "schema": "http://astrolith.com/schemas/fighter-characters",
                "dataFormats": ["application/json"]
            },
            "didResolver": {
                "schema": "http://astrolith.com/schemas/resolvers",
                "dataFormats": ["application/json"]
            }
        },
        "structure": {
            "profile": {
                "$actions": [
                    {
                        "who": "author",
                        "of":"profile",
                        "can": "write"
                    },
                    {
                        "who": "recipient",
                        "of":"profile",
                        "can": "write"
                    },
                    {
                        "who": "author",
                        "of":"profile",
                        "can": "update"
                    },
                    {
                        "who": "recipient",
                        "of":"profile",
                        "can": "update"
                    },
                    {
                        "who": "recipient",
                        "of":"profile",
                        "can": "delete"
                    },
                    {
                        "who": "recipient",
                        "of":"profile",
                        "can": "read"
                    }
                ]
            },
            "gameAccount": {
                "$actions": [
                    {
                        "who": "author",
                        "of":"gameAccount",
                        "can": "write"
                    },
                    {
                        "who": "recipient",
                        "of":"gameAccount",
                        "can": "write"
                    },
                    {
                        "who": "recipient",
                        "of":"gameAccount",
                        "can": "update"
                    },
                    {
                        "who": "author",
                        "of":"gameAccount",
                        "can": "update"
                    },
                    {
                        "who": "recipient",
                        "of":"gameAccount",
                        "can": "delete"
                    },
                    {
                        "who": "anyone",
                        "can": "read"
                    }
                ]
            },
            "gameQuestionAndTestCases": {
                "$actions": [
                    {
                        "who": "author",
                        "of": "gameAccount",
                        "can": "write"
                    },
                    {
                        "who": "anyone",
                        "can": "read"
                    }
                ]
            },
            "achievements": {
                "$actions": [
                    {
                        "who": "author",
                        "of": "gameAccount",
                        "can": "write"
                    },
                    {
                        "who": "recipient",
                        "of": "gameAccount",
                        "can": "read"
                    }
                ]
            },
            "collectibles": {
                "$actions": [
                    {
                        "who": "author",
                        "of": "gameAccount",
                        "can": "write"
                    },
                    {
                        "who": "recipient",
                        "of": "gameAccount",
                        "can": "read"
                    }
                ]
            },
            "collectiblesImage": {
                "$actions": [
                    {
                        "who": "author",
                        "of": "gameAccount",
                        "can": "write"
                    },
                    {
                        "who": "anyone",
                        "can": "read"
                    }
                ]
            },
            "certificates": {
                "$actions": [
                    {
                        "who": "author",
                        "of": "gameAccount",
                        "can": "write"
                    },
                    {
                        "who": "recipient",
                        "of": "gameAccount",
                        "can": "read"
                    }
                ]
            },
            "fighterCharacters": {
                "$actions": [
                    {
                        "who": "author",
                        "of": "gameAccount",
                        "can": "write"
                    },
                    {
                        "who": "anyone",
                        "can": "read"
                    }
                ]
            },
            "didResolver": {
                "$actions": [
                    {
                        "who": "anyone",
                        "can": "write"
                    },
                    {
                        "who": "recipient",
                        "of":"didResolver",
                        "can": "write"
                    },
                    {
                        "who": "anyone",
                        "can": "read"
                    }
                ]
            }
        }
    };



    configureProtocol = async (web5) => {
        // query the list of existing protocols on the DWN
        const { protocols, status } = await web5.dwn.protocols.query({
            message: {
                filter: {
                    protocol: this.astrolithProtocol.protocol,
                },
            },
        });

        if (status.code !== 200) {
            console.error("Error querying protocols", status);
            return;
        }

        // if the protocol already exists, we return
        if (protocols.length > 0) {
            console.log("Protocol already exists");
            return;
        }

        // configure protocol on local DWN
        const { status: configureStatus, protocol } =
            await web5.dwn.protocols.configure({
                message: {
                    definition: this.astrolithProtocol,
                },
            });

        console.log("Protocol configured error source", configureStatus, protocol);
        return protocol;
    };
}
