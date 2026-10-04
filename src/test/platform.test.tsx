import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../App";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  window.history.replaceState({}, "", "/");
});

function navigate(name: string) {
  fireEvent.click(within(document.querySelector("nav")!).getByText(name));
}

// The original form labels are visual labels rather than associated HTML labels.
function fill(label: string, value: string) {
  const container = screen.getByText(label, { selector: "label" }).parentElement!;
  const input = container.querySelector("input, select, textarea")!;
  fireEvent.change(input, { target: { value } });
}

describe("existing Evolve platform", () => {
  it("opens the command centre and navigates every existing screen without changing the URL", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Command Centre" })).toBeInTheDocument();
    const screens = [
      ["Bookings", "Bookings 2026"],
      ["Pipeline", "FREE — Deluxe Edition"],
      ["Financials", "Financials"],
      ["Contacts", "Contacts"],
      ["Dashboard", "Command Centre"],
    ];
    for (const [navigation, heading] of screens) {
      navigate(navigation);
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
      expect(window.location.pathname).toBe("/");
    }
  });

  it("adds, searches, edits, and deletes a booking within the Bookings screen", () => {
    render(<App />);
    navigate("Bookings");
    fireEvent.click(screen.getByRole("button", { name: "+ New Booking" }));
    fill("Promoter", "Baseline booking");
    fill("Status", "Confirmed");
    fireEvent.click(screen.getByRole("button", { name: "Add Booking" }));
    fireEvent.change(screen.getByPlaceholderText("Search…"), { target: { value: "Baseline booking" } });
    fireEvent.click(screen.getByText("Baseline booking"));
    fireEvent.click(screen.getByRole("button", { name: "Edit Booking" }));
    fill("Promoter", "Baseline booking updated");
    fireEvent.click(screen.getByRole("button", { name: "Save Changes" }));
    expect(screen.getByText("Baseline booking updated")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "🗑" }));
    expect(screen.queryByText("Baseline booking updated")).not.toBeInTheDocument();
  });

  it("preserves the existing reset-on-navigation behavior", () => {
    render(<App />);
    navigate("Bookings");
    fireEvent.click(screen.getByRole("button", { name: "+ New Booking" }));
    fill("Promoter", "Temporary booking");
    fill("Status", "Confirmed");
    fireEvent.click(screen.getByRole("button", { name: "Add Booking" }));
    expect(screen.getByText("Temporary booking")).toBeInTheDocument();
    navigate("Dashboard");
    navigate("Bookings");
    expect(screen.queryByText("Temporary booking")).not.toBeInTheDocument();
  });

  it("updates the pipeline delivery checklist and ready count", () => {
    render(<App />);
    navigate("Pipeline");
    fireEvent.click(screen.getByText("Strings & Bling Freestyle"));
    fireEvent.click(screen.getByText("Cover Art"));
    expect(screen.getByText("Ready for Platoon delivery")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Cover Art"));
    expect(screen.queryByText("Ready for Platoon delivery")).not.toBeInTheDocument();
  });

  it("adds an invoice and opens all four financial tabs", () => {
    render(<App />);
    navigate("Financials");
    fireEvent.click(screen.getByRole("button", { name: "+ Add Invoice" }));
    fill("Supplier", "Baseline supplier");
    fill("Description", "Baseline invoice");
    fill("Amount", "123");
    fireEvent.click(screen.getByRole("button", { name: "Add Invoice" }));
    fireEvent.click(screen.getByRole("button", { name: "Invoices" }));
    expect(screen.getByText("Baseline supplier")).toBeInTheDocument();
    for (const name of ["Revenue", "UMG Royalties", "Platoon Deal"]) {
      fireEvent.click(screen.getByRole("button", { name }));
    }
    expect(screen.getByText("Platoon Distribution Agreement")).toBeInTheDocument();
  });

  it("adds a contact and negotiation, then changes its status", () => {
    render(<App />);
    navigate("Contacts");
    fireEvent.click(screen.getByRole("button", { name: "+ Add Contact" }));
    fill("Name", "Baseline producer");
    fireEvent.click(screen.getByRole("button", { name: "Add Contact" }));
    fireEvent.change(screen.getByPlaceholderText("Search contacts…"), { target: { value: "Baseline producer" } });
    fireEvent.click(screen.getByText("Baseline producer"));
    fireEvent.click(screen.getByRole("button", { name: "+ Add" }));
    fill("Track", "Baseline track");
    fireEvent.click(screen.getByRole("button", { name: "Add Negotiation" }));
    expect(screen.getByText("Baseline track")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Signed" } });
    expect(screen.getByRole("combobox")).toHaveValue("Signed");
  });

  it("keeps unknown paths on the existing 404 route", () => {
    window.history.replaceState({}, "", "/not-an-existing-route");
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(<App />);
    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Return to Home" })).toHaveAttribute("href", "/");
  });
});
