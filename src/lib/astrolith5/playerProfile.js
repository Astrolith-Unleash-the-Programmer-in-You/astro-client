


/**
 *@notice player profile related functionality
    *@dev : This class manages the player profile
    **/
export class PlayerProfile {
    constructor(
        web5,
        protocol,
        profileSchema,
        protocolID){
        this.protocol = protocol;
        this.web5 = web5;
        this.profileSchema = profileSchema;
        this.protocolID = protocolID;
        this.profileFilter = {
            protocol,
            protocolPath: "profile",
            schema:profileSchema,
        };

    }

    //get profile 
    getProfile = async(userDID)=>{
        const { record:profileData } = await this.web5.dwn.records.read({
            from: userDID,
            message: {
                    filter: {
                        ...this.profileFilter,
                    }
                }
            })
        const profile = await profileData.data?.[0].json();


        return profile;
    }

    //get profiles
    getProfiles = async ()=>{
        const { record:profileDatas } = await this.web5.dwn.records.read({
            from:this.protocolID,
            message: {
                    filter: {
                        ...this.profileFilter,
                    }
                }
            })
            
        const profiles = await Promise.all(profileDatas.map(el=>el.data?.json()));
        return profiles;
    }

    //create profile
    createProfile = async (profileObject,userDID) => {
        const { record :profile} = await this.web5.dwn.records.create({
        data: profileObject,
        message: {
            ...this.profileFilter,
            recipient: userDID,
            contextId : userDID,
            parentId : this.protocolID,
            published: true
        },
        });

        //attach profile to the current user
        await Promise.all([profile.send(userDID),profile.send(this.protocolID)]);
        return profile;
    };

    //update profile
    updateProfile=async(profileObject,profileID)=>{
        // Get the profile
        const { record:profileData } = await this.web5.dwn.records.read({
        message: {
                filter: {
                    recordId: profileID,
                    ...this.profileFilter, 
                }
            }
        });
        const profiles = await profileData.data?.json();

        // Update the profile
        const { status } = await profileData.update({
                        data: { ...profiles, profileObject },
                    });
        return status;
    }

    //delete profile
    deleteProfile=async(profileID)=>{
        const status = await this.web5.dwn.records.delete({
            message: {
                recordId: profileID,
                ...this.profileFilter,
            },
        });

        return status;
    }
}
