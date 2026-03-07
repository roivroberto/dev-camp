import React from "react";

import { TicketTable } from "@/components/queue/ticket-table";

const queueRows = [
	{
		id: "T-104",
		title: "Billing exception needs manual routing",
		requester: "ops@northstar.example",
		reason: "Primary skill match",
		priority: "high" as const,
		status: "Awaiting owner",
	},
	{
		id: "T-118",
		title: "VIP onboarding checklist gap",
		requester: "success@northstar.example",
		reason: "Escalated by policy rule",
		priority: "medium" as const,
		status: "Needs review slot",
	},
	{
		id: "T-121",
		title: "Data retention question from support",
		requester: "support@northstar.example",
		reason: "Fallback queue coverage",
		priority: "low" as const,
		status: "Ready for review",
	},
];

export default function QueuePage() {
	return (
		<section className="grid gap-4">
			<div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
				<div className="border bg-card p-5 text-card-foreground">
					<p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
						Shared queue
					</p>
					<h2 className="mt-2 text-xl font-semibold tracking-tight">
						Shared Queue
					</h2>
					<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
						Static pilot data keeps the surface usable while live workflow
						wiring lands in a later task.
					</p>
				</div>
				<div className="border bg-card p-5 text-sm text-muted-foreground">
					<p className="text-[11px] uppercase tracking-[0.2em]">Queue health</p>
					<div className="mt-3 space-y-2">
						<p>
							<span className="font-medium text-foreground">3 tickets</span>{" "}
							visible in pilot view
						</p>
						<p>
							<span className="font-medium text-foreground">1 urgent</span> item
							needs immediate routing
						</p>
						<p>
							<span className="font-medium text-foreground">Static data</span>{" "}
							until backend query wiring is ready
						</p>
					</div>
				</div>
			</div>
			<TicketTable rows={queueRows} />
		</section>
	);
}
