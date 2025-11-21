
import { render, fireEvent, screen } from '@testing-library/react';
import { beforeEach, vi, describe, test } from "vitest";
import LoginForm from "../src/components/LoginForm";
import { login } from "../src/services/authApi";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

vi.mock("../src/services/authApi");
vi.mock("jwt-decode");
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual, //only overwrite useNavigate
    useNavigate: vi.fn(),
  };
});

describe("LoginForm", () => {
    let navigateMock;
    let alertMock;

    beforeEach(() => {
        navigateMock = vi.fn();
        useNavigate.mockReturnValue(navigateMock);
        alertMock = vi.fn();
        global.alert = alertMock;

        sessionStorage.clear();
    });

    test("calls login with username and password", async () => {
        login.mockResolvedValue(true);
        jwtDecode.mockReturnValue({
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "Admin"
        })
        sessionStorage.setItem("JWT", "token");
        render(<LoginForm />);
        fireEvent.change(screen.getByTestId("name"), { target: { value: "bob" } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: "pass" } });
        fireEvent.click(screen.getByTestId("submit-btn"));

        expect(login).toHaveBeenCalledWith("bob", "pass");
    });
    test("navigates on admin login", async () => {
        login.mockResolvedValue(true);
        jwtDecode.mockReturnValue({
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "Admin"
        })
        sessionStorage.setItem("JWT", "token");
        render(<LoginForm />);
        fireEvent.change(screen.getByTestId("name"), { target: { value: "bob" } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: "pass" } });
        fireEvent.click(screen.getByTestId("submit-btn"));

        await Promise.resolve();

        expect(navigateMock).toHaveBeenCalledWith("/");
    });
    test("alerts on non-admin login", async () => {
        login.mockResolvedValue(true);
        jwtDecode.mockReturnValue({
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "User"
        });

        sessionStorage.setItem("JWT", "token");

        render(<LoginForm />);
        fireEvent.change(screen.getByTestId("name"), { target: { value: "bob" } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: "pass" } });
        fireEvent.click(screen.getByTestId("submit-btn"));

        await Promise.resolve();

        expect(alertMock).toHaveBeenCalledWith(
            "Login failed Due To Access Rights"
        );
    });

    test("alerts on failed login", async () => {
        login.mockResolvedValue(false);

        render(<LoginForm />);
        fireEvent.change(screen.getByTestId("name"), { target: { value: "bob" } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: "pass" } });
        fireEvent.click(screen.getByTestId("submit-btn"));

        await Promise.resolve();

        expect(alertMock).toHaveBeenCalledWith(
            "Login failed Due To Wrong Credentials"
        );
    });
    test("does NOT navigate for non-admin login", async () => {
        login.mockResolvedValue(true);
        jwtDecode.mockReturnValue({
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "User"
        });
        sessionStorage.setItem("JWT", "token");

        render(<LoginForm />);
        fireEvent.change(screen.getByTestId("name"), { target: { value: "bob" } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: "pass" } });
        fireEvent.click(screen.getByTestId("submit-btn"));

        await Promise.resolve();

        expect(navigateMock).not.toHaveBeenCalled();
    });

    test("does NOT navigate on failed login", async () => {
        login.mockResolvedValue(false);

        render(<LoginForm />);
        fireEvent.change(screen.getByTestId("name"), { target: { value: "bob" } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: "pass" } });
        fireEvent.click(screen.getByTestId("submit-btn"));

        await Promise.resolve();

        expect(navigateMock).not.toHaveBeenCalled();
    });
});