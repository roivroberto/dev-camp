import React from "react";

import { ReviewList } from "@/components/review/review-list";

const reviewItems = [
	{
		id: "R-12",
		title: "Approve billing exception routing",
		decisionWindow: "Decision due in 45 min",
		owner: "Finance lead",
		note: "Agent suggested a finance queue handoff because the exception exceeds self-serve policy limits.",
	},
	{
		id: "R-14",
		title: "Confirm VIP onboarding escalation",
		decisionWindow: "Decision due today",
		owner: "Success manager",
		note: "Checklist variance is small, but the pilot flow keeps a human in the loop before reassignment.",
	},
];

export default function ReviewPage() {
	return (
		<section className="grid gap-4">
			<div className="border bg-card p-5 text-card-foreground">
				<p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
					Review
				</p>
				<h2 className="mt-2 text-xl font-semibold tracking-tight">
					Human decisions still in flight
				</h2>
				<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
					This page sets the review foundation for later action controls,
					keeping current scope focused on visibility.
				</p>
			</div>
			<ReviewList items={reviewItems} />
		</section>
	);
}
