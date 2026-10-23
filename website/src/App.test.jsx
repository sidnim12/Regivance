import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { beforeEach, expect, test, vi } from "vitest";

vi.mock("./components/charts/MetricChart", () => ({ MetricChart: () => <div>Comparison chart</div> }));

beforeEach(() => { cleanup(); localStorage.clear(); window.scrollTo = vi.fn(); });

test("renders the research question and verified test count", async () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  expect(await screen.findByText(/Markets change shape/i)).toBeInTheDocument();
  expect(screen.getByText("121")).toBeInTheDocument();
});

test("theme defaults to light, switches and persists across remounts", async () => {
  const view = render(<MemoryRouter><App /></MemoryRouter>);
  expect(document.documentElement.dataset.theme).toBe("light");
  fireEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));
  expect(document.documentElement.dataset.theme).toBe("dark");
  expect(localStorage.getItem("regivance-theme")).toBe("dark");
  view.unmount();
  render(<MemoryRouter><App /></MemoryRouter>);
  expect(screen.getByRole("button", { name: "Switch to light theme" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Switch to light theme" }));
  expect(document.documentElement.dataset.theme).toBe("light");
});

test("results combine filters, recover from no matches and inspect a model", async () => {
  render(<MemoryRouter initialEntries={["/results"]}><App /></MemoryRouter>);
  fireEvent.change(await screen.findByLabelText("Model family"), { target: { value: "Neural" } });
  expect(screen.getByRole("status")).toHaveTextContent("5 of 11");
  fireEvent.change(screen.getByLabelText("Find a model"), { target: { value: "no-such-model" } });
  expect(screen.getByText("No matching models")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));
  expect(screen.getByRole("status")).toHaveTextContent("11 of 11");
  fireEvent.click(screen.getByRole("button", { name: "MAE", exact: true }));
  expect(screen.getByRole("status")).toHaveTextContent("ranked by MAE");
  fireEvent.click(screen.getByRole("button", { name: "EWMA", exact: true }));
  expect(within(screen.getByRole("region", { name: "Selected model details" })).getByRole("heading")).toHaveTextContent("EWMA");
});

test("model selection follows visible results and disappears for empty filters", async () => {
  render(<MemoryRouter initialEntries={["/results"]}><App /></MemoryRouter>);
  fireEvent.change(await screen.findByLabelText("Model family"), { target: { value: "Neural" } });
  const details = screen.getByRole("region", { name: "Selected model details" });
  expect(within(details).getByRole("heading")).toHaveTextContent("QLIKE risk + regime LSTM");
  fireEvent.click(screen.getByRole("button", { name: "Risk-feature LSTM", exact: true }));
  fireEvent.change(screen.getByLabelText("Find a model"), { target: { value: "Regime-aware" } });
  expect(within(details).getByRole("heading")).toHaveTextContent("Regime-aware LSTM");
  fireEvent.change(screen.getByLabelText("Find a model"), { target: { value: "unknown" } });
  expect(screen.queryByRole("region", { name: "Selected model details" })).not.toBeInTheDocument();
});

test("comparison changes independently of result filters", async () => {
  render(<MemoryRouter initialEntries={["/results"]}><App /></MemoryRouter>);
  fireEvent.change(await screen.findByLabelText("Compare the overall leader with"), { target: { value: "Rolling" } });
  fireEvent.change(screen.getByLabelText("Model family"), { target: { value: "Neural" } });
  const comparison = screen.getByRole("region", { name: "Why did GJR-GARCH Student-t lead?" });
  expect(within(comparison).getByText("0.514782")).toBeInTheDocument();
  expect(within(comparison).getByText("0.419191")).toBeInTheDocument();
});

test("walkthrough reveals the root sum of squares target and can hide it", async () => {
  render(<MemoryRouter initialEntries={["/methodology"]}><App /></MemoryRouter>);
  const reveal = await screen.findByRole("button", { name: "Reveal future observations" });
  expect(document.getElementById("illustrative-outcome")).not.toBeVisible();
  fireEvent.click(reveal);
  expect(document.getElementById("illustrative-outcome")).toBeVisible();
  expect(screen.getByText("target = √Σ r² = 0.029155")).toBeInTheDocument();
  expect(screen.getByText("0.004155")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Hide future observations" }));
  expect(document.getElementById("illustrative-outcome")).not.toBeVisible();
});

test.each([
  ["/data", "From thirty industries to one risk signal."],
  ["/methodology", "A chronological experiment, not a random split."],
  ["/about", "Research engineering with an honest conclusion."],
])("research route %s renders", async (route, heading) => {
  render(<MemoryRouter initialEntries={[route]}><App /></MemoryRouter>);
  expect(await screen.findByRole("heading", { name: heading })).toBeInTheDocument();
});

test("mobile navigation opens, navigates and closes", async () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  const toggle = screen.getByRole("button", { name: "Toggle navigation" });
  fireEvent.click(toggle);
  fireEvent.click(within(screen.getByRole("navigation", { name: "Mobile navigation" })).getByRole("link", { name: "About" }));
  expect(await screen.findByRole("heading", { name: "Research engineering with an honest conclusion." })).toBeInTheDocument();
  expect(toggle).toHaveAttribute("aria-expanded", "false");
});
