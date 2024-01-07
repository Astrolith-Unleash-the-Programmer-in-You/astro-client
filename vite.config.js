/** @type {import('tailwindcss').Config} */
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default {
	content: ["./index.html", "./src/**/*.glb.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [nodePolyfills()],
	assetsInclude: ["**/*.glb"],
};