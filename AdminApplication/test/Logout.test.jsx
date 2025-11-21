import { render, fireEvent, screen } from "@testing-library/react";
import { vi, describe, beforeEach } from "vitest";
import LogoutBtn from "../src/components/LogoutBtn";
import { useNavigate } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("LogoutBtn", () => {
  let navigateMock;

  beforeEach(() => {
    navigateMock = vi.fn();
    useNavigate.mockReturnValue(navigateMock);

    // fresh fake storage for each test
    sessionStorage.clear();
    sessionStorage.setItem("joe","hiru"); // need something in there to see if it clears
  });

  test("clears storage and navigates to /login", () => {
    render(<LogoutBtn />);

    fireEvent.click(screen.getByRole("button"));

    expect(sessionStorage.getItem("joe")).toBeUndefined();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});
