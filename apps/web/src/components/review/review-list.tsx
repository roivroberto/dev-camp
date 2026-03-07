import React from "react";

type ReviewItem = {
	id: string;
	title: string;
	decisionWindow: string;
	owner: string;
	note: string;
};

export function ReviewList({ items }: { items: ReviewItem[] }) {
	return (
		<div className="grid gap-3">
			{items.map((item) => (
				<article key={item.id} className="border bg-card text-card-foreground">
					<div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
						<div className="space-y-1">
							<p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
								{item.id}
							</p>
							<h2 className="text-sm font-medium">{item.title}</h2>
							<p className="text-sm text-muted-foreground">{item.note}</p>
						</div>
						<div className="space-y-1 text-sm sm:text-right">
							<p>{item.owner}</p>
							<p className="text-muted-foreground">{item.decisionWindow}</p>
						</div>
					</div>
				</article>
			))}
		</div>
	);
}

export type { ReviewItem };
