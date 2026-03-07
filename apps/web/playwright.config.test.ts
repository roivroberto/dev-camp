import { describe, expect, it } from "vitest";

import appConfig from "./playwright.config";
import rootConfig from "../../playwright.config";

describe("Playwright config", () => {
	it("reuses the app Playwright config at the repository root", () => {
		const webServer = Array.isArray(rootConfig.webServer)
			? rootConfig.webServer[0]
			: rootConfig.webServer;

		expect(rootConfig).toBe(appConfig);
		expect(webServer?.command).toBe("bun run dev");
		expect(webServer).toMatchObject({
			cwd: expect.stringContaining("apps/web"),
			port: 3001,
		});
	});
});
