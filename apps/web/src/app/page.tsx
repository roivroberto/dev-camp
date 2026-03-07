import { WorkspaceAccessPanel } from "../components/workspace/workspace-access-panel";

export default function Home() {
	return (
		<main className="mx-auto flex h-full w-full max-w-md items-center px-4 py-10 sm:px-6">
			<WorkspaceAccessPanel />
		</main>
	);
}
