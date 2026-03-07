import { describe, expect, it } from "vitest";

import { AUTH_SESSION_HEADER } from "./lib/auth-session";
import { config, proxy } from "./proxy";

describe("proxy", () => {
	it("marks requests with an auth-session header when a session cookie is present", () => {
		const response = proxy({
			headers: new Headers({
				cookie: "better-auth.session_token=abc123",
			}),
		} as never);

		expect(response.headers.get("x-middleware-override-headers")).toContain(
			AUTH_SESSION_HEADER,
		);
		expect(
			response.headers.get(`x-middleware-request-${AUTH_SESSION_HEADER}`),
		).toBe("1");
	});

	it("marks requests unauthenticated when no session cookie is present", () => {
		const response = proxy({ headers: new Headers() } as never);

		expect(
			response.headers.get(`x-middleware-request-${AUTH_SESSION_HEADER}`),
		).toBe("0");
	});

	it("keeps the existing app matcher", () => {
		expect(config.matcher).toEqual([
			"/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
		]);
	});
});
