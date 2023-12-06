import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { SWRConfig } from "swr/core";
import AuthButtons from "./AuthButtons";
import { createServer } from "../../tests/server";

const renderComponent = async () => {
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  );
  await screen.findAllByRole("link");
};
describe("when user is signed out", () => {
  createServer([
    {
      path: "api/user",
      res: () => {
        return {
          user: null,
        };
      },
    },
  ]);
  it("should show signin and signup button", async () => {
    // debugger;
    await renderComponent();
    const singInButton = screen.getByRole("link", {
      name: /sign in/i,
    });
    const singUpButton = screen.getByRole("link", {
      name: /sign up/i,
    });
    expect(singInButton).toBeInTheDocument();
    expect(singInButton).toHaveAttribute("href", "/signin");
    expect(singUpButton).toBeInTheDocument();
    expect(singUpButton).toHaveAttribute("href", "/signup");
  });
  it("should not show signout button button", async () => {
    await renderComponent();
    const singOutButton = screen.queryByRole("link", {
      name: /sign out/i,
    });
    expect(singOutButton).not.toBeInTheDocument();
  });
});

describe("when user is signed in", () => {
  createServer([
    {
      path: "api/user",
      res: () => {
        return {
          user: {
            id: 1,
            email: "vicky@gamil.com",
          },
        };
      },
    },
  ]);
  it("should not show signin and signup buttons", async () => {
    await renderComponent();
    const singInButton = screen.queryByRole("link", {
      name: /sign in/i,
    });
    const singUpButton = screen.queryByRole("link", {
      name: /sign up/i,
    });
    expect(singInButton).not.toBeInTheDocument();
    expect(singUpButton).not.toBeInTheDocument();
  });
  it("should  show  signout buttons", async () => {
    await renderComponent();
    const singOutButton = screen.getByRole("link", {
      name: /sign out/i,
    });

    expect(singOutButton).toBeInTheDocument();
    expect(singOutButton).toHaveAttribute("href", "/signout");
  });
});
