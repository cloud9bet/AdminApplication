import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test } from "vitest";
import UserSearch from "../src/components/Userpage/UserSearch";

describe("UserSearch", () => {

  test("shows fallback when no users", () => {
    render(<UserSearch users={[]} onSelectUser={() => {}} />);

    expect(screen.getByText("No users found.")).toBeInTheDocument();
  });

  test("filters out deleted users", () => {
    const users = [
      { userAccountId: 1, userName: "DELETED" },
      { userAccountId: 2, userName: "Joe" }
    ];

    render(<UserSearch users={users} onSelectUser={() => {}} />);

    // Only Bob should show
    expect(screen.queryByText("No users found.")).not.toBeInTheDocument();
    expect(screen.getByText("2: Joe")).toBeInTheDocument();
    expect(screen.queryByText("1: DELETED")).toBeNull();
  });

  test("lists active users", () => {
    const users = [
      { userAccountId: 1, userName: "Hiru" },
      { userAccountId: 2, userName: "Joe" }
    ];

    render(<UserSearch users={users} onSelectUser={() => {}} />);

    expect(screen.getByText("1: Hiru")).toBeInTheDocument();
    expect(screen.getByText("2: Joe")).toBeInTheDocument();
  });

  test("calls onSelectUser when a user is clicked", () => {
    const users = [
      { userAccountId: 10, userName: "Hiru" }
    ];

    const onSelectUser = vi.fn();

    render(<UserSearch users={users} onSelectUser={onSelectUser} />);

    fireEvent.click(screen.getByText("10: Hiru"));

    expect(onSelectUser).toHaveBeenCalledWith(users[0]);
  });

});
