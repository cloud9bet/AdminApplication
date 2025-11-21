import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import UserOverview from "../src/components/UserPage/UserOverview";

describe("UserOverview", () => {

  test("renders all user fields", () => {
    const user = {
      userName: "Hirusigan",
      id: 420,
      balance: 1337,
      depositLimit: 1000,
      activeStatus: true
    };

    render(<UserOverview user={user} />);

    expect(screen.getByText("Hirusigan")).toBeInTheDocument();
    expect(screen.getByText("ID: 420")).toBeInTheDocument();
    expect(screen.getByText("1337$")).toBeInTheDocument();
    expect(screen.getByText("Deposit Limit: 1000")).toBeInTheDocument();
  });

  test("displays active status correctly", () => {
    const user = {
      userName: "Joe",
      id: 1,
      balance: 10,
      depositLimit: 500,
      activeStatus: true
    };

    render(<UserOverview user={user} />);

    const status = screen.getByText("Active");
    expect(status).toBeInTheDocument();
    expect(status.className).toBe("active");
  });

  test("displays deactivated status correctly", () => {
    const user = {
      userName: "Joe",
      id: 1,
      balance: 10,
      depositLimit: 500,
      activeStatus: false
    };

    render(<UserOverview user={user} />);

    const status = screen.getByText("Deactivated");
    expect(status).toBeInTheDocument();
    expect(status.className).toBe("deactivated");
  });

});
