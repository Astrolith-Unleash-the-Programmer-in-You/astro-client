// function add(a, b) {
// 	return a + b;
// }
// const testCase = [
// 	{ input: [2, 3], expected: 5, title: "Should Add Two Positive Numbers" },
// 	{
// 		input: [-1, 1],
// 		expected: 0,
// 		title: "Should add a positve and negative number",
// 	},
// 	{ input: [0, 0], expected: 0, title: "Should add zeros" },
// 	{ input: [-5, 5], expected: 0, title: "Should pass edge cases" },
// ];
// function div(a, b) {
// 	if (b == 0) return null;
// 	return a / b;
// }
// const testCase1 = [
// 	{ input: [2, 3], expected: 2 / 3, title: "Should div Two Positive Numbers" },
// 	{
// 		input: [-1, 1],
// 		expected: -1 / 1,
// 		title: "Should div a positve and negative number",
// 	},
// 	{ input: [0, 0], expected: null, title: "Should div zeros" },
// 	{ input: [-5, 5], expected: -5 / 5, title: "Should pass edge cases" },
// ];

// const challenge = {
// 	id: "123",
// 	title: "Sum Function",
// 	description: "Write a function that adds two numbers.",
// 	testCases: [
// 		{ input: [2, 3], output: 5, title: "Should div zeros" },
// 		{ input: [-1, 1], output: 0, title: "Should pass edge cases" },
// 		// Additional test cases...
// 	],
// };


// // Example usage
// const userCode = `
// var ysm  = 20;
// console.log(fish);
// console.log(fish);


// `;

//NOTE: to execute accurately, you must add console.log() with the test cases along side the user code 
// example on line 42.


/**
 * @dev Function to test players codes inputs
 * @param {*} func - function containing the code to be executed
 * @param {*} testCases - to validate that all tests pass the conditions provided
 * @returns - an object with success status and an array of test results objects showing the results of the tests
 */

export const astrolithTestValidator = async (userCode, challenge) => {
	// Run tests and render results on canvas
	// const canvas = document.getElementById("resultCanvas");
	// const context = canvas.getContext("2d");
    // Mock data for a challenge
    try {
        // Create an isolated environment (sandbox)
        const sandbox = {
            results: [],
        };

        // Override console.log to capture output
        const originalConsoleLog = console.log;
        console.log = (value) => {
            sandbox.results.push(value);
        };

        // Execute the user code in the sandbox using Function constructor
        const codeToRun = `${userCode}`;

        // Run the code in the sandbox
        eval.call(null, codeToRun);

        // Restore original console.log
        console.log = originalConsoleLog;

        // Evaluate test cases
        const testResults = challenge.testCases.map((testCase, index) => {
            const expectedOutput = testCase.output;
            const actualOutput = sandbox.results[index];
            const passed = deepEqual(expectedOutput, actualOutput);

            return {
                input: testCase.input,
                expectedOutput,
                actualOutput,
                passed,
            };
        });

        return { success: true, testResults };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Utility function to deep compare arrays/objects
function deepEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

