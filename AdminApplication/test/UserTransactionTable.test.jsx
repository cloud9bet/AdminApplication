import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import UserTransactionsTable from "../src/components/UserPage/UserTransactionTable";

describe("UsertransactionsTable", () => {
    test("shows fallback when no transactions", () => {
        render(<UserTransactionsTable transactions={[]} />) //empty data

        expect(screen.getByText("No transactions found.")).toBeInTheDocument();
    });
    test("renders sorted transactions with correct classes", () => {
        const data = [
            {
                transactionId: "1",
                date: "2025-11-20",
                gameName: "Coinflip",
                amount: -50
            },
            {
                transactionId: "2",
                date: "2025-11-21",
                gameName: "Crash",
                amount: 20
            }
        ];

        render(<UserTransactionsTable transactions={data} />);

        const rows = screen.getAllByRole("row");

        // rows[0] is the header row
        // rows[1] should be newest transaction
        expect(rows[1]).toHaveTextContent("2025-11-21");
        expect(rows[2]).toHaveTextContent("2025-11-20");

        // positive/negative classes
        expect(screen.getByText("20$").className).toBe("currency-positive");
        expect(screen.getByText("-50$").className).toBe("currency-negative");
    });
});