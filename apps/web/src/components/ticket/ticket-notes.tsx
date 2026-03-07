import React from "react";

type TicketNote = {
	id: string;
	body: string;
	authorLabel: string;
	createdAtLabel: string;
};

export function TicketNotes({ notes }: { notes: TicketNote[] }) {
	return (
		<div className="border bg-card p-5 text-card-foreground">
			<p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
				Notes
			</p>
			<div className="mt-4 grid gap-3">
				{notes.length === 0 ? (
					<p className="text-sm text-muted-foreground">
						No notes yet. Capture reviewer context and handoff details here.
					</p>
				) : (
					notes.map((note) => (
						<article key={note.id} className="border p-4">
							<div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
								<span>{note.authorLabel}</span>
								<span>{note.createdAtLabel}</span>
							</div>
							<p className="mt-3 text-sm text-foreground">{note.body}</p>
						</article>
					))
				)}
			</div>
		</div>
	);
}

export type { TicketNote };
