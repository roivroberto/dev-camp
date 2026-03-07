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
	useSearchParams: () => new URLSearchParams(),
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

	it("shows sign up form on initial render", async () => {
		const { default: SignUpPage } = await import("./page");
		render(<SignUpPage />);

		const signUpHeading = screen.getByRole("heading", { name: /SIGN UP/i });
		expect(signUpHeading).toBeInTheDocument();
	});

	it("navigates to role selection after successful sign up", async () => {
		const { default: SignUpPage } = await import("./page");
		render(<SignUpPage />);

		const signUpHeading = screen.getByRole("heading", { name: /SIGN UP/i });
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
		});

		// After success, it should show the role choices
		expect(screen.getByText(/Choose your role/i)).toBeInTheDocument();
		expect(screen.getByText(/I am a Team Lead/i)).toBeInTheDocument();
		expect(screen.getByText(/I am a Team Member/i)).toBeInTheDocument();

		// Clicking a role should navigate to visibility
		fireEvent.click(screen.getByText(/I am a Team Lead/i));
		expect(push).toHaveBeenCalledWith("/visibility");
	});
});
