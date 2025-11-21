import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import UserActions from "../src/components/UserPage/UserActions";

describe("UserActions", () => {

  test("calls onBack when Back button is clicked", () => {
    const onBack = vi.fn();

    render(
      <UserActions
        user={{ activeStatus: true }}
        onBack={onBack}
        onToggleActive={() => {}}
        loading={false}
      />
    );

    fireEvent.click(screen.getByText("Back"));
    expect(onBack).toHaveBeenCalled();
  });

  test("calls onToggleActive when toggle button is clicked", () => {
    const onToggleActive = vi.fn();

    render(
      <UserActions
        user={{ activeStatus: true }}
        onBack={() => {}}
        onToggleActive={onToggleActive}
        loading={false}
      />
    );

    fireEvent.click(screen.getByText("Deactivate User"));
    expect(onToggleActive).toHaveBeenCalled();
  });

  test("disables toggle button when loading", () => {
    const user = { activeStatus: true };

    render(
      <UserActions
        user={user}
        onBack={() => {}}
        onToggleActive={() => {}}
        loading={true}
      />
    );

    const btn = screen.getByRole("button", { name: "Processing..." });
    expect(btn).toBeDisabled();
  });

  test("shows correct label and class for active user", () => {
    const user = { activeStatus: true };

    render(
      <UserActions
        user={user}
        onBack={() => {}}
        onToggleActive={() => {}}
        loading={false}
      />
    );

    const btn = screen.getByText("Deactivate User");

    expect(btn).toBeInTheDocument();
    expect(btn.className).toBe("deactivate");
  });

  test("shows correct label and class for inactive user", () => {
    const user = { activeStatus: false };

    render(
      <UserActions
        user={user}
        onBack={() => {}}
        onToggleActive={() => {}}
        loading={false}
      />
    );

    const btn = screen.getByText("Reactivate User");

    expect(btn).toBeInTheDocument();
    expect(btn.className).toBe("reactivate");
  });

});
