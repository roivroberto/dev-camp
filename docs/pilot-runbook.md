# Pilot Runbook

## Purpose

Use this runbook to verify the operational core pilot is up, the lead queue view still renders, and inbound webhook failures leave a small breadcrumb for follow-up.

## Before a pilot session

1. Install dependencies with `bun install`.
2. Confirm placeholder public env vars exist locally or rely on the Playwright smoke defaults.
3. Start the web app with `bun run dev:web` if you want to inspect the pilot manually.

## Smoke verification

Run the focused smoke test:

```bash
bunx playwright test apps/web/tests/e2e/pilot-smoke.spec.ts
```

Expected result: the `/queue` route loads and shows the `Shared Queue` heading for the pilot workspace.

## Inbound webhook reliability checks

The Resend inbound webhook now records a lightweight failure payload when trusted requests cannot be parsed or persisted.

- `invalid_json`: webhook body could not be parsed.
- `invalid_payload`: payload shape was missing required inbound fields.
- `ingest_mutation_failed`: Convex ingest mutations threw before the ticket/message write completed.

Each failure includes a short `payloadDigest` so the team can correlate repeated failures without storing the full raw payload in the failure record.

## If the smoke test fails

1. Re-run `bunx playwright test apps/web/tests/e2e/pilot-smoke.spec.ts`.
2. Open the generated Playwright trace or `test-results/` error context.
3. Manually load `/queue` and confirm the pilot shell renders.
4. If the failure started after inbound email changes, inspect webhook logs for `ingest_failure` records and compare the `reason` plus `payloadDigest`.

## CI expectation

GitHub Actions runs `bun test` plus the focused pilot smoke test in `.github/workflows/ci.yml`.
