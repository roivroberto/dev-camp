import React from "react";

type TicketRow = {
	id: string;
	reason: string;
	title?: string;
	requester?: string;
	priority?: "low" | "medium" | "high";
	status?: string;
};

const priorityTone: Record<NonNullable<TicketRow["priority"]>, string> = {
	low: "text-muted-foreground",
	medium: "text-foreground",
	high: "text-destructive",
};

export function TicketTable({ rows }: { rows: TicketRow[] }) {
	return (
		<div className="overflow-x-auto border bg-card text-card-foreground">
			<table className="min-w-[640px] w-full border-collapse text-left text-sm">
				<thead className="bg-muted/40 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
					<tr>
						<th className="px-4 py-3 font-medium">Ticket</th>
						<th className="px-4 py-3 font-medium">Routing reason</th>
						<th className="px-4 py-3 font-medium">Priority</th>
						<th className="px-4 py-3 font-medium">Status</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<tr key={row.id} className="border-t align-top">
							<td className="px-4 py-3">
								<div className="font-medium text-foreground">
									{row.title ?? row.id}
								</div>
								{row.requester ? (
									<div className="text-xs text-muted-foreground">
										{row.requester}
									</div>
								) : null}
							</td>
							<td className="px-4 py-3 text-sm text-foreground">
								{row.reason}
							</td>
							<td className="px-4 py-3">
								<span className={priorityTone[row.priority ?? "medium"]}>
									{row.priority ?? "medium"}
								</span>
							</td>
							<td className="px-4 py-3 text-muted-foreground">
								{row.status ?? "Ready for review"}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export type { TicketRow };
