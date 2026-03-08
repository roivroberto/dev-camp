"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import type React from "react";

import { getCurrentWorkspaceReference } from "@Fylo/backend/convex/workspaces_reference";

const sections: Array<{ href: Route; label: string; description: string }> = [
	{
		href: "/queue" as Route,
		label: "Shared queue",
		description: "Triage new work and routing signals.",
	},
	{
		href: "/review" as Route,
		label: "Review",
		description: "Track items waiting on human confirmation.",
	},
	{
		href: "/settings/profile" as Route,
		label: "Profile",
		description: "Upload your resume and tune assignment fit.",
	},
	{
		href: "/settings/team-profiles" as Route,
		label: "Team profiles",
		description: "Review resume coverage and routing readiness across the team.",
	},
	{
		href: "/settings/policy" as Route,
		label: "Policy",
		description: "Tune routing thresholds and workload guardrails.",
	},
	{
		href: "/visibility" as Route,
		label: "Visibility",
		description: "Spot team workload pressure before handoffs drift.",
	},
];

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	const workspace = useQuery(getCurrentWorkspaceReference, {});
	const visibleSections = sections.filter(
		(section) =>
			String(section.href) !== "/settings/team-profiles" ||
			workspace?.workspace?.role === "lead",
	);

	return (
		<main className="mx-auto flex h-full w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
			<section className="border bg-card text-card-foreground">
				<div className="grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
					<div className="space-y-2">
						<p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
							Operational core pilot
						</p>
						<h1 className="text-2xl font-semibold tracking-tight">
							Shared operations workspace
						</h1>
						<p className="max-w-2xl text-sm text-muted-foreground">
							A lightweight queue and review surface for routing, handoff, and
							decision visibility.
						</p>
					</div>
					<nav aria-label="Primary sections" className="flex flex-wrap gap-2">
						{visibleSections.map((section) => (
							<Link
								key={section.href}
								href={section.href}
								aria-current={pathname === section.href ? "page" : undefined}
								className="border px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-card"
							>
								{section.label}
							</Link>
						))}
					</nav>
				</div>
				<div className="grid gap-px border-t bg-border sm:grid-cols-2 xl:grid-cols-4">
					{visibleSections.map((section) => (
						<div
							key={section.href}
							className="bg-card px-5 py-3 text-sm text-muted-foreground"
						>
							<span className="font-medium text-foreground">
								{section.label}:
							</span>{" "}
							{section.description}
						</div>
					))}
				</div>
			</section>
			{children}
		</main>
	);
}
