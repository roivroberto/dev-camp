"use client";

import Image from "next/image";
import Link from "next/link";
import "./landing.css";

export default function LandingPage() {
	return (
		<div
			className="landing-page min-h-0 h-full flex flex-col pt-6 px-6 pb-6 overflow-auto"
			suppressHydrationWarning
		>
			<div className="grain" suppressHydrationWarning />

			{/* Header */}
			<header className="w-full max-w-5xl mx-auto flex justify-between items-center relative z-10">
				<div className="flex items-center gap-2">
					<Image 
						src="/white_fylo.svg" 
						alt="Fylo Logo" 
						width={80} 
						height={32} 
						className="hidden dark:block"
					/>
					<Image 
						src="/black_fylo.svg" 
						alt="Fylo Logo" 
						width={80} 
						height={32} 
						className="block dark:hidden"
					/>
				</div>
				<Link href="/sign-in" className="btn-primary py-2 px-6">
					Login
				</Link>
			</header>

			{/* Main Content */}
			<main className="w-full max-w-5xl mx-auto flex flex-col flex-1 items-center justify-center text-center relative z-10 mt-12 mb-24">
				<div className="inline-block border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-8 font-sans text-xs tracking-widest uppercase opacity-80">
					Explainable routing layer for small support teams
				</div>
				<h1 className="font-sans text-6xl md:text-8xl font-extrabold mb-6 tracking-tighter embossed-text italic">
					Workspace & Pod
					<br /> Management
				</h1>
				<p className="font-secondary text-accent/60 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
					Triage faster and more legibly. Fylo turns emails into structured tickets, routes them using clear logic, and flags ambiguous cases for human review—giving your 5–20 person pod total Work Distribution Visibility.
				</p>
				<div className="flex flex-wrap justify-center gap-4">
					<Link href="/sign-up" className="btn-primary px-8 py-4 text-lg">
						Get Started
					</Link>
					<a
						href="#features"
						className="vellum-card px-8 py-4 text-lg font-bold hover:bg-white/5 transition-colors"
					>
						Learn More
					</a>
				</div>
			</main>

			{/* Feature Section */}
			<section id="features" className="w-full max-w-5xl mx-auto relative z-10 py-24 border-t border-white/10">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="vellum-card p-8">
						<h3 className="font-sans text-xl font-bold mb-4">Explainable Routing</h3>
						<p className="font-secondary text-accent/60 text-sm leading-relaxed">
							Every assignment has a visible reason. Understand exactly why a ticket was routed to a specific team member based on skill match, product expertise, and workload.
						</p>
					</div>
					<div className="vellum-card p-8">
						<h3 className="font-sans text-xl font-bold mb-4">Human Review States</h3>
						<p className="font-secondary text-accent/60 text-sm leading-relaxed">
							Not everything should be automated. Medium-confidence cases are sent for manager verification, and low-confidence cases go to manual triage.
						</p>
					</div>
					<div className="vellum-card p-8">
						<h3 className="font-sans text-xl font-bold mb-4">Work Distribution Visibility</h3>
						<p className="font-secondary text-accent/60 text-sm leading-relaxed">
							End the guesswork. See exactly how work is distributed across your team in real time, making coordination simple and judgment-preserving.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
