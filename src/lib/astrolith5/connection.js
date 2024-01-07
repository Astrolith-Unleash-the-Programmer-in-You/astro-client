import { Web5 } from "@web5/api";

/**
 *
 * @notice Function to handle connection to web5 Astrolith
 */
export const connectToAstrolith = async () => {
	// Initiate web5 connect
	const { web5, did: connectedUserDID } = await Web5.connect({
		sync: "5s",
	});
	return { web5, connectedUserDID };
};