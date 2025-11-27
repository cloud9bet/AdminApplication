import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import {
  processTransactionsByGame,
  processTotalEarnings,
  calculateSiteSummary,
} from "../../src/utils/transactionUtils";

// Fastlåser tiden til et kendt tidspunkt for konsistente testresultater
const fixedNow = new Date("2025-11-20T12:00:00Z");

describe("transactionUtils", () => {
  beforeEach(() => {
    vi.useFakeTimers();        // fryser tiden
    vi.setSystemTime(fixedNow); // samme referencepunkt i alle asserts
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("processTransactionsByGame", () => {
    it("filters by game, normalizes dates, aggregates per day and sorts", () => {
      const transactions = [
        { date: "2025-11-19", amount: -50, gameName: "Slot" },
        { date: "18/11/2025", amount: -25, gameName: "slot" }, // DD/MM/YYYY
        { date: "2025-11-18", amount: -30, gameName: "Slot" },
        { date: "2025-11-10", amount: -100, gameName: "Slot" }, // udenfor 7 dage
        { date: "2025-11-19", amount: 10, gameName: "Slot" }, // payout (negative earnings)
        { date: "2025-11-19", amount: -20, gameName: "Crash" }, // forkert game
      ];

      const result = processTransactionsByGame(transactions, "slot");

      expect(result).toStrictEqual([
        { date: "2025-11-18", earnings: 55 }, // -(-25) + -(-30)
        { date: "2025-11-19", earnings: 40 }, // -(-50) + -(10)
      ]);
    });

    it("returns empty array when no matching or in-window transactions", () => { // ingen relevante transaktioner
      const transactions = [
        { date: "2025-10-01", amount: -10, gameName: "Slot" },
        { date: "2025-11-19", amount: -5, gameName: "Crash" },
      ];

      expect(processTransactionsByGame(transactions, "slot")).toStrictEqual([]);
    });
  });

  describe("processTotalEarnings", () => { // total earnings uanset spil
    it("groups earnings by date within 7-day window and sorts ascending", () => {
      const transactions = [
        { date: "2025-11-19", amount: -40 },
        { date: "2025-11-14", amount: -20 },
        { date: "15/11/2025", amount: 50 }, // DD/MM/YYYY, payout (negative earnings)
        { date: "2025-11-01", amount: -999 }, // too old
      ];

    const result = processTotalEarnings(transactions);

    expect(result).toStrictEqual([ // sorteret efter dato
      { date: "2025-11-14", earnings: 20 },
      { date: "2025-11-19", earnings: 40 },
      { date: "15/11/2025", earnings: -50 },
    ]);
  });

    it("handles empty input", () => { // ingen transaktioner giver tom array
      expect(processTotalEarnings([])).toStrictEqual([]); 
    });
  });

  describe("calculateSiteSummary", () => { // summerer total users, transaktioner og earnings i sidste 7 dage
    it("returns totals for users, transactions, and earnings in last 7 days", () => {
      const transactions = [
        { date: "2025-11-19", amount: -40 },
        { date: "2025-11-14", amount: -10 },
        { date: "2025-11-01", amount: -100 }, // ignored
      ];
      const users = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

      const summary = calculateSiteSummary(transactions, users); // kalder funktionen

      expect(summary).toStrictEqual({ // asserterer de korrekte summer
        totalUsers: 4,
        totalTransactionsLast7Days: 2,
        totalEarningsLast7Days: 50,
      });
    });

    it("returns zeroed summary for empty inputs", () => { // ingen data giver 0 i alle felter
      const summary = calculateSiteSummary([], []);

      expect(summary).toStrictEqual({ // asserterer 0 i alle felter
        totalUsers: 0,
        totalTransactionsLast7Days: 0,
        totalEarningsLast7Days: 0,
      });
    });
  });
});
