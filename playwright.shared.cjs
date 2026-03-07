const { defineConfig } = require("@playwright/test");

const smokeEnv = {
	NEXT_PUBLIC_SITE_URL: "http://127.0.0.1:3001",
	NEXT_PUBLIC_CONVEX_URL: "https://example.convex.cloud",
	NEXT_PUBLIC_CONVEX_SITE_URL: "https://example.convex.site",
};

module.exports = defineConfig({
	testDir: "./apps/web/tests/e2e",
	webServer: {
		command: "bun run dev",
		cwd: "./apps/web",
		env: {
			...process.env,
			...smokeEnv,
		},
		port: 3001,
		reuseExistingServer: true,
	},
	use: {
		baseURL: "http://127.0.0.1:3001",
		trace: "on-first-retry",
	},
});
