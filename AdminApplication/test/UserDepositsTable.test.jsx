import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import UserDepositsTable from "../src/components/UserPage/UserDepositsTable";

describe("UserDepositsTable", () => {

  test("shows fallback when no deposits", () => {
    render(<UserDepositsTable deposits={[]} />);

    expect(screen.getByText("No deposits found.")).toBeInTheDocument();
  });

  test("renders sorted deposits newest → oldest", () => {
    const deposits = [
      {
        depositId: 1,
        date: "2025-11-20",
        amount: 50
      },
      {
        depositId: 2,
        date: "2025-11-21",
        amount: -20
      }
    ];

    render(<UserDepositsTable deposits={deposits} />);
    const rows = screen.getAllByRole("row");

    expect(rows[1]).toHaveTextContent("2");
    expect(rows[1]).toHaveTextContent("2025-11-21");

    // Burde være ældst
    expect(rows[2]).toHaveTextContent("1");
    expect(rows[2]).toHaveTextContent("2025-11-20");
  });

  test("applies positive/negative classes correctly", () => {
    const deposits = [
      {
        depositId: 1,
        date: "2025-11-21",
        amount: 10
      },
      {
        depositId: 2,
        date: "2025-11-20",
        amount: -5
      }
    ];

    render(<UserDepositsTable deposits={deposits} />);

    const positive = screen.getByText("10$");
    const negative = screen.getByText("-5$");

    expect(positive.className).toBe("currency-positive");
    expect(negative.className).toBe("currency-negative");
  });

});
