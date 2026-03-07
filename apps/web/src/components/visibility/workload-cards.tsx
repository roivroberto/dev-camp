import { cn } from "../../lib/utils";

type WorkloadCard = {
	id: string;
	name: string;
	role: string;
	activeTickets: number;
	reviewQueue: number;
	status: "clear" | "watch" | "busy";
	note: string;
};

const statusTone: Record<WorkloadCard["status"], string> = {
	clear: "text-foreground",
	watch: "text-amber-700",
	busy: "text-destructive",
};

export function WorkloadCards({ cards }: { cards: WorkloadCard[] }) {
	return (
		<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
			{cards.map((card) => (
				<article key={card.id} className="border bg-card text-card-foreground">
					<div className="space-y-4 p-4">
						<div className="flex items-start justify-between gap-3">
							<div>
								<p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
									{card.role}
								</p>
								<h2 className="mt-2 text-sm font-medium">{card.name}</h2>
							</div>
							<p
								className={cn(
									"text-xs font-medium uppercase tracking-[0.18em]",
									statusTone[card.status],
								)}
							>
								{card.status}
							</p>
						</div>
						<div className="grid grid-cols-2 gap-3 border-y py-3 text-sm">
							<div>
								<p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
									Active
								</p>
								<p className="mt-1 text-lg font-semibold">
									{card.activeTickets}
								</p>
							</div>
							<div>
								<p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
									Needs review
								</p>
								<p className="mt-1 text-lg font-semibold">{card.reviewQueue}</p>
							</div>
						</div>
						<p className="text-sm text-muted-foreground">{card.note}</p>
					</div>
				</article>
			))}
		</div>
	);
}

export type { WorkloadCard };
