import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import RepositoriesListItem from "./RepositoriesListItem";

// jest.mock("../tree/FileIcon.js", () => {
//   contents of FileIcon
//   return () => {
//     return "File Icon Component";
//   };
// });
const pause = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 100);
  });
describe("<RepositoriesListItem/> test cases", () => {
  const repository = {
    full_name: "facebook/react",
    language: "Javascript",
    description: "A javascript view library",
    owner: {
      login: "facebook",
    },
    name: "facebook/react",
    html_url: "https://github.com/facebook/react",
  };
  it("should show a link to orginal github", async () => {
    render(
      <MemoryRouter>
        <RepositoriesListItem repository={repository} />
      </MemoryRouter>
    );
    await act(async () => {
      await pause();
    });
    const icon = await screen.findByRole("img", {
      name: /Javascript/i,
    });
    const element = screen.getByRole("link", {
      name: /github repository/i,
    });
    const linkTo = await screen.findByRole("link", {
      name: new RegExp(repository.name),
    });
    expect(icon).toHaveClass("js-icon");
    expect(element).toHaveAttribute("href", repository.html_url);
    expect(linkTo).toHaveAttribute("href", `/repositories/${repository.name}`);
  });
});
