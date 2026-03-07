import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { AUTH_SESSION_HEADER, hasAuthSessionCookie } from "./lib/auth-session";

export function proxy(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set(
		AUTH_SESSION_HEADER,
		hasAuthSessionCookie(request.headers.get("cookie")) ? "1" : "0",
	);

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}

export const config = {
	matcher: [
		"/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
