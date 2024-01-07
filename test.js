import { Web5 } from "@web5/api";
/**
 *
 * @notice Function to handle connection to web5 Astrolith
 */
export const connectToAstrolith = async () => {
	// Initiate web5 connect
	console.log("Connecting to", Web5);
	const { web5, did: connectedUserDID } = await Web5.connect({
		sync: "5s",
	});
	console.log(web5, "Connected to");
	return { web5, connectedUserDID };
};

connectToAstrolith().then((web5, connectedUserDID) => {
	console.log("Connected to", connectedUserDID);
});
