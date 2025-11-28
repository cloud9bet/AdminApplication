import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import SiteInformationPage from "../../src/pages/SiteInformationPage";

// Mock admin API kald så vi kontrollerer dataflowet
vi.mock("../../src/services/adminApi", () => ({
  GetAllUserInfoTagsAsync: vi.fn(),
  GetAllUserTransactionAsync: vi.fn(),
}));

// Mock charts så vi kan asserte på deres props uden at skulle håndtere SVG/ResizeObserver
vi.mock("../../src/components/Charts/EarningsChart", () => ({
  __esModule: true,
  default: ({ title }) => <div>{title}</div>,
}));

// Mock pie chart hook så vi kan asserte på det forberedte output med det samme
vi.mock("../../src/hooks/usePieChartData", () => ({
  usePieChartData: vi.fn(() => (
    <div>
      PieChart
      <span>Slot Machine:200</span>
      <span>Crash:-50</span>
      <span>Coinflip:100</span>
    </div>
  )),
}));

import { // importerer de mockede API kald
  GetAllUserInfoTagsAsync,
  GetAllUserTransactionAsync,
} from "../../src/services/adminApi";

const isoDaysAgo = (days) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split("T")[0];
};

const usersMock = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]; // simpel userliste til summary

const transactionsMock = [
  { date: isoDaysAgo(1), amount: -200, gameName: "Slot" },      // indenfor 7 dage
  { date: isoDaysAgo(2), amount: 50, gameName: "Crash" },       // payout
  { date: isoDaysAgo(3), amount: -100, gameName: "Coin Flip" }, // indenfor 7 dage
  { date: isoDaysAgo(30), amount: -999, gameName: "Slot" },     // udenfor 7 dage
];

describe("SiteInformationPage", () => { // hovedbeskrivelse af test suite
  beforeEach(() => {
    GetAllUserInfoTagsAsync.mockResolvedValue(usersMock);
    GetAllUserTransactionAsync.mockResolvedValue(transactionsMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows summary boxes with API data and 2-decimal earnings", async () => { // test for summary bokse
    render(<SiteInformationPage />);

    await waitFor(() => expect(GetAllUserInfoTagsAsync).toHaveBeenCalled());

    expect(screen.getByText("4")).toBeInTheDocument(); // total users
    expect(screen.getByText("3")).toBeInTheDocument(); // 3 transaktioner
    expect(screen.getByText("250.00 USD")).toBeInTheDocument(); // 200 - 50 + 100
  });

  it("renders chart buttons and toggles visible chart title", async () => { // test for chart knapper
    render(<SiteInformationPage />);

    // Buttons render
    const totalBtn = screen.getByText("Total Site");
    const slotBtn = screen.getByText("Slot Machine");
    const crashBtn = screen.getByText("Crash");
    const coinflipBtn = screen.getByText("Coinflip");

    // Default chart
    expect(screen.getByText("Total Site Earnings")).toBeInTheDocument();

    fireEvent.click(slotBtn);
    expect(screen.getByText("Slot Machine Earnings")).toBeInTheDocument();

    fireEvent.click(crashBtn);
    expect(screen.getByText("Crash Earnings")).toBeInTheDocument();

    fireEvent.click(coinflipBtn);
    expect(screen.getByText("Coinflip Earnings")).toBeInTheDocument();

    fireEvent.click(totalBtn);
    expect(screen.getByText("Total Site Earnings")).toBeInTheDocument();
  });

  it("renders pie chart with aggregated values per game", async () => { // test for pie chart
    render(<SiteInformationPage />);

    await waitFor(() => expect(GetAllUserTransactionAsync).toHaveBeenCalled()); // venter på API kald

    expect(screen.getByText("Slot Machine:200")).toBeInTheDocument();
    expect(screen.getByText("Crash:-50")).toBeInTheDocument();
    expect(screen.getByText("Coinflip:100")).toBeInTheDocument();
  });
});
