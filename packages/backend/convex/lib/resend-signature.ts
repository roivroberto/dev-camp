import { createHash } from "node:crypto";
import { Webhook } from "svix";

export type ResendSignatureHeaders = {
	svixId: string;
	svixTimestamp: string;
	svixSignature: string;
};

export async function verifyResendSignature(
	headers: ResendSignatureHeaders,
	rawBody: string,
	secret: string,
) {
	if (
		!secret ||
		!headers.svixId ||
		!headers.svixTimestamp ||
		!headers.svixSignature
	) {
		return false;
	}

	try {
		new Webhook(secret).verify(rawBody, {
			"svix-id": headers.svixId,
			"svix-timestamp": headers.svixTimestamp,
			"svix-signature": headers.svixSignature,
		});
		return true;
	} catch {
		return false;
	}
}

export function createResendIdempotencyKey(
	deliveryId: string,
	eventId: string,
	rawBody: string,
) {
	if (deliveryId) {
		return `resend:delivery:${deliveryId}`;
	}

	if (eventId) {
		return `resend:event:${eventId}`;
	}

	const digest = createHash("sha256").update(rawBody).digest("hex");
	return `resend:body:${digest}`;
}
