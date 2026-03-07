import { createHash } from "node:crypto";

export function createPayloadDigest(payload: string) {
	return createHash("sha256").update(payload).digest("hex").slice(0, 16);
}

export async function recordIngestFailure(
	reason: string,
	payloadDigest: string,
) {
	const failure = {
		status: "recorded" as const,
		reason,
		payloadDigest,
	};

	console.error("ingest_failure", failure);
	return failure;
}
