import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
	within,
} from "@testing-library/react";
import type React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const push = vi.fn();
const signUpWithEmail = vi.fn();

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push,
	}),
}));

vi.mock("next/link", () => ({
	default: ({ children, href }: { children: React.ReactNode; href: string }) => (
		<a href={href}>{children}</a>
	),
}));

vi.mock("../../lib/auth-client", () => ({
	authClient: {
		signUp: {
			email: signUpWithEmail,
		},
	},
}));

describe("SignUpPage", () => {
	beforeEach(() => {
		cleanup();
		vi.clearAllMocks();
		signUpWithEmail.mockResolvedValue({ data: {} });
	});

	it("shows Welcome to Fylo with role choices", async () => {
		const { default: SignUpPage } = await import("./page");
		render(<SignUpPage />);

		expect(screen.getByText(/Welcome to Fylo/i)).toBeInTheDocument();
		expect(screen.getByText(/I am a Team Lead/i)).toBeInTheDocument();
		expect(screen.getByText(/I am a Team Member/i)).toBeInTheDocument();
	});

	it("navigates to sign-up form when clicking Need an account", async () => {
		const { default: SignUpPage } = await import("./page");
		render(<SignUpPage />);

		const needAccountTexts = screen.getAllByText(/Need an account\?/i);
		const gatekeeperNeedAccount = needAccountTexts.find(
			(el) => el.closest(".step-container.active"),
		);
		const clickHereButton = gatekeeperNeedAccount?.parentElement?.querySelector(
			"button",
		);
		if (!clickHereButton) throw new Error("Need an account button not found");
		fireEvent.click(clickHereButton);

		const signUpHeading = screen.getByRole("heading", { name: /SIGN UP/i });
		expect(signUpHeading).toBeInTheDocument();

		const signUpStep = signUpHeading.closest(".step-container");
		if (!signUpStep) throw new Error("Sign-up step container not found");
		const signUp = within(signUpStep as HTMLElement);

		fireEvent.change(signUp.getByPlaceholderText("John Doe"), {
			target: { value: "Pilot User" },
		});
		fireEvent.change(signUp.getByPlaceholderText("john@acme.com"), {
			target: { value: "pilot@fylo.local" },
		});
		fireEvent.change(signUp.getByPlaceholderText("••••••••"), {
			target: { value: "Fylo-E2E-password-123!" },
		});
		fireEvent.click(signUp.getByRole("button", { name: /create account/i }));

		await waitFor(() => {
			expect(signUpWithEmail).toHaveBeenCalledWith({
				name: "Pilot User",
				email: "pilot@fylo.local",
				password: "Fylo-E2E-password-123!",
			});
			expect(push).toHaveBeenCalledWith("/visibility");
		});
	});
});
