import { render, screen, within } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { TicketTable } from "../ticket-table";

describe("TicketTable", () => {
	it("renders routing reason text", () => {
		render(
			<TicketTable rows={[{ id: "t1", reason: "Primary skill match" }]} />,
		);

		expect(screen.getByText("Primary skill match")).toBeInTheDocument();
	});

	it("renders fallback values and keeps the table scrollable on narrow screens", () => {
		const { container } = render(
			<TicketTable rows={[{ id: "t1", reason: "Primary skill match" }]} />,
		);
		const rendered = within(container);

		expect(rendered.getByText("t1")).toBeInTheDocument();
		expect(rendered.getByText("medium")).toBeInTheDocument();
		expect(rendered.getByText("Ready for review")).toBeInTheDocument();
		expect(container.firstChild).toHaveClass("overflow-x-auto");
	});
});
