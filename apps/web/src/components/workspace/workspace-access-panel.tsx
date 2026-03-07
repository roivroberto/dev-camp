"use client";

import { joinWithPodCodeReference } from "@Fylo/backend/convex/memberships_reference";
import {
	ensureOnboardingWorkspaceReference,
	getCurrentWorkspaceReference,
} from "@Fylo/backend/convex/workspaces_reference";
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import { authClient } from "../../lib/auth-client";
import { normalizeSessionUser } from "../../lib/current-user";
import {
	clearPendingWorkspaceAction,
	clearPersistedWorkspaceAccessState,
	persistWorkspaceAccessState,
	readPendingWorkspaceAction,
	readPersistedWorkspaceAccessState,
} from "../../lib/workspace-access-state";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Feedback = {
	type: "success" | "error";
	message: string;
} | null;

function FeedbackMessage({ feedback }: { feedback: Feedback }) {
	if (!feedback) {
		return null;
	}

	return (
		<p
			aria-live="polite"
			className={
				feedback.type === "error"
					? "text-xs text-destructive"
					: "text-xs text-foreground"
			}
		>
			{feedback.message}
		</p>
	);
}

function WorkspaceDetails({
	name,
	podCode,
	role,
}: {
	name: string;
	podCode: string;
	role: string;
}) {
	return (
		<div className="grid gap-4 border bg-card p-6 text-card-foreground">
			<div>
				<p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
					Workspace
				</p>
				<h1 className="mt-2 text-2xl font-semibold tracking-tight">{name}</h1>
			</div>
			<div className="grid gap-3 text-sm text-muted-foreground">
				<div className="flex items-center justify-between gap-4 border-t pt-3">
					<span>Role</span>
					<span className="text-foreground">{role}</span>
				</div>
				<div className="flex items-center justify-between gap-4 border-t pt-3">
					<span>Pod code</span>
					<code className="text-xs text-foreground">{podCode}</code>
				</div>
			</div>
		</div>
	);
}

export function WorkspaceAccessPanel() {
	const { data: session, isPending: isSessionPending } = authClient.useSession();
	const user = normalizeSessionUser(session?.user);
	const workspaceState = useQuery(
		getCurrentWorkspaceReference,
		session ? {} : "skip",
	);
	const joinWithPodCode = useMutation(joinWithPodCodeReference);
	const ensureOnboardingWorkspace = useMutation(
		ensureOnboardingWorkspaceReference,
	);
	const [podCode, setPodCode] = useState("");
	const [localState, setLocalState] = useState<{
		ownerSessionKey: string | null;
		state: typeof workspaceState;
	} | null>(() => readPersistedWorkspaceAccessState());
	const [feedback, setFeedback] = useState<Feedback>(null);
	const [isJoining, setIsJoining] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const sessionKey = session?.user?.email ?? null;
 	const pendingWorkspaceAction = readPendingWorkspaceAction();

	const resolvedWorkspaceState =
		localState?.ownerSessionKey === sessionKey &&
		localState.state?.isMember &&
		!workspaceState?.isMember
			? localState.state
			: workspaceState ?? localState?.state;
	const title = useMemo(() => user.name ?? user.email ?? "Pilot user", [user]);

	useEffect(() => {
		if (isSessionPending) {
			return;
		}

		if (!sessionKey) {
			return;
		}

		if (localState?.ownerSessionKey && localState.ownerSessionKey !== sessionKey) {
			setLocalState(null);
			clearPersistedWorkspaceAccessState();
		}

		setFeedback(null);
		setPodCode("");
	}, [isSessionPending, localState, sessionKey]);

	useEffect(() => {
		if (
			isSessionPending ||
			!sessionKey ||
			!pendingWorkspaceAction ||
			pendingWorkspaceAction.ownerSessionKey !== sessionKey ||
			resolvedWorkspaceState?.isMember ||
			isJoining ||
			isCreating
		) {
			return;
		}

		const runPendingAction = async () => {
			try {
				if (pendingWorkspaceAction.type === "join" && pendingWorkspaceAction.podCode) {
					setIsJoining(true);
					const nextState = await joinWithPodCode({
						podCode: pendingWorkspaceAction.podCode,
					});
					const persistedState = { ownerSessionKey: sessionKey, state: nextState };
					setLocalState(persistedState);
					persistWorkspaceAccessState(persistedState);
					clearPendingWorkspaceAction();

					if (pendingWorkspaceAction.redirectTo !== "/") {
						window.location.assign(pendingWorkspaceAction.redirectTo);
					}
					return;
				}

				if (pendingWorkspaceAction.type === "create") {
					setIsCreating(true);
					const nextState = await ensureOnboardingWorkspace({});
					const persistedState = { ownerSessionKey: sessionKey, state: nextState };
					setLocalState(persistedState);
					persistWorkspaceAccessState(persistedState);
					clearPendingWorkspaceAction();
				}
			} catch (error) {
				clearPendingWorkspaceAction();
				setFeedback({
					type: "error",
					message:
						error instanceof Error
							? error.message
							: "Unable to complete workspace setup",
				});
			} finally {
				setIsJoining(false);
				setIsCreating(false);
			}
		};

		void runPendingAction();
	}, [
		ensureOnboardingWorkspace,
		isCreating,
		isJoining,
		isSessionPending,
		joinWithPodCode,
		pendingWorkspaceAction,
		resolvedWorkspaceState?.isMember,
		sessionKey,
	]);

	async function handleJoin(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (isJoining) {
			return;
		}

		const trimmedPodCode = podCode.trim();

		if (!trimmedPodCode) {
			setFeedback({ type: "error", message: "Enter a pod code." });
			return;
		}

		setFeedback(null);
		setIsJoining(true);

		try {
			const nextState = await joinWithPodCode({ podCode: trimmedPodCode });
			const persistedState = { ownerSessionKey: sessionKey, state: nextState };
			setLocalState(persistedState);
			persistWorkspaceAccessState(persistedState);
			setPodCode("");
			setFeedback({ type: "success", message: "Joined workspace." });
		} catch (error) {
			setFeedback({
				type: "error",
				message:
					error instanceof Error
						? error.message
						: "Unable to join workspace",
			});
		} finally {
			setIsJoining(false);
		}
	}

	async function handleCreateWorkspace() {
		if (isCreating) {
			return;
		}

		setFeedback(null);
		setIsCreating(true);

		try {
			const nextState = await ensureOnboardingWorkspace({});
			const persistedState = { ownerSessionKey: sessionKey, state: nextState };
			setLocalState(persistedState);
			persistWorkspaceAccessState(persistedState);
			setFeedback({ type: "success", message: "Workspace ready." });
		} catch (error) {
			setFeedback({
				type: "error",
				message:
					error instanceof Error
						? error.message
						: "Unable to create workspace",
			});
		} finally {
			setIsCreating(false);
		}
	}

	if (isSessionPending) {
		return (
			<section className="w-full border bg-card p-6 text-card-foreground">
				<p className="text-sm text-muted-foreground">Checking session...</p>
			</section>
		);
	}

	if (!session) {
		return (
			<section className="grid gap-5 border bg-card p-6 text-card-foreground">
				<div>
					<p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
						Workspace access
					</p>
					<h1 className="mt-2 text-2xl font-semibold tracking-tight">
						Join your pod
					</h1>
					<p className="mt-2 text-sm text-muted-foreground">
						Create an account with a pod code or sign in to continue.
					</p>
				</div>
				<div className="flex flex-wrap gap-3">
					<Link href="/sign-up" className={buttonVariants()}>
						Sign up
					</Link>
					<Link
						href="/sign-in"
						className={buttonVariants({ variant: "outline" })}
					>
						Sign in
					</Link>
				</div>
			</section>
		);
	}

	if (!resolvedWorkspaceState) {
		return (
			<section className="w-full border bg-card p-6 text-card-foreground">
				<p className="text-sm text-muted-foreground">Loading workspace...</p>
			</section>
		);
	}

	if (resolvedWorkspaceState.isMember && resolvedWorkspaceState.workspace) {
		return (
			<div className="grid gap-4">
				<WorkspaceDetails
					name={resolvedWorkspaceState.workspace.name}
					podCode={resolvedWorkspaceState.workspace.podCode}
					role={resolvedWorkspaceState.workspace.role}
				/>
				<FeedbackMessage feedback={feedback} />
			</div>
		);
	}

	if (resolvedWorkspaceState.canCreateWorkspace) {
		return (
			<section className="grid gap-5 border bg-card p-6 text-card-foreground">
				<div>
					<p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
						Workspace access
					</p>
					<h1 className="mt-2 text-2xl font-semibold tracking-tight">
						Start your workspace
					</h1>
					<p className="mt-2 text-sm text-muted-foreground">
						You are signed in as {title}. Create the first workspace, then share
						the pod code with your team.
					</p>
				</div>
				<div className="flex flex-wrap items-center gap-3">
					<Button disabled={isCreating} onClick={() => void handleCreateWorkspace()}>
						{isCreating ? "Creating..." : "Create workspace"}
					</Button>
				</div>
				<FeedbackMessage feedback={feedback} />
			</section>
		);
	}

	return (
		<section className="grid gap-5 border bg-card p-6 text-card-foreground">
			<div>
				<p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
					Workspace access
				</p>
				<h1 className="mt-2 text-2xl font-semibold tracking-tight">
					Join an existing workspace
				</h1>
				<p className="mt-2 text-sm text-muted-foreground">
					You are signed in as {title}. Enter a pod code to join your team's
					workspace.
				</p>
			</div>
			<form className="grid gap-4" onSubmit={handleJoin}>
				<div className="grid gap-2">
					<Label htmlFor="workspace-pod-code">Pod code</Label>
					<Input
						id="workspace-pod-code"
						autoComplete="off"
						disabled={isJoining}
						placeholder="pod-team01"
						value={podCode}
						onChange={(event) => {
							setPodCode(event.currentTarget.value);
						}}
					/>
				</div>
				<Button disabled={isJoining} type="submit">
					{isJoining ? "Joining..." : "Join workspace"}
				</Button>
				<FeedbackMessage feedback={feedback} />
			</form>
		</section>
	);
}
