import { PolicyForm } from "../../../../components/settings/policy-form";

export default function PolicySettingsPage() {
	return (
		<section className="grid gap-4">
			<div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
				<div className="border bg-card p-5 text-card-foreground">
					<p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
						Routing policy
					</p>
					<h2 className="mt-2 text-xl font-semibold tracking-tight">
						Tune assignment confidence without leaving the pilot shell
					</h2>
					<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
						Task 12 keeps the same settings surface, now backed by the current
						workspace policy query and save mutation.
					</p>
				</div>
				<div className="border bg-card p-5 text-sm text-muted-foreground">
					<p className="text-[11px] uppercase tracking-[0.2em]">
						Current baseline
					</p>
					<div className="mt-3 space-y-2">
						<p>
							<span className="font-medium text-foreground">Live policy</span>{" "}
							loads for the current workspace
						</p>
						<p>
							<span className="font-medium text-foreground">Lead access</span>{" "}
							controls whether edits can be saved
						</p>
						<p>
							<span className="font-medium text-foreground">
								Single workspace
							</span>
							keeps the policy view intentionally narrow in v1
						</p>
					</div>
				</div>
			</div>
			<PolicyForm />
		</section>
	);
}
