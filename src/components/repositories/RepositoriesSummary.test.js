import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("RepositoriesSummary should show a primary language", () => {
  const repository = {
    stargazers_count: 1,
    open_issues: 23,
    forks: 343435,
    language: "Javascript",
  };
  render(<RepositoriesSummary repository={repository} />);
  for (let key in repository) {
    const value = repository[key];
    expect(screen.getByText(new RegExp(value))).toBeInTheDocument();
  }
  expect(screen.getByText("Javascript")).toBeInTheDocument();
});
