import { render, screen } from "@testing-library/react";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";
import HomeRoute from "./HomeRoute";
import { createServer } from "../tests/server";

createServer([
  {
    path: "/api/repositories",
    method: "get",
    res: (req) => {
      const language = req.url.searchParams.get("q").split("language:")[1];
      return {
        item: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` },
        ],
      };
    },
  },
]);
// const handlers = [
//   rest.get("/api/repositories", (req, res, ctx) => {
//     const language = req.url.searchParams.get("q").split("language:")[1];
//     return res(
//       ctx.json({
//         item: [
//           { id: 1, full_name: `${language}_one` },
//           { id: 2, full_name: `${language}_two` },
//         ],
//       })
//     );
//   }),
// ];
// const server = setupServer(...handlers);
// beforeAll(() => {
//   server.listen();
// });
// afterEach(() => {
//   server.resetHandlers();
// });
// afterAll(() => {
//   server.close();
// });
test("should render two links for each language", () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );
  const languages = ["javacript", "typescript", "rust", "go", "python", "java"];
  languages.forEach(async (item) => {
    const links = await screen.findAllByRole("link", {
      name: new RegExp(`${item}_`),
    });

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveContent(`${item}_one`);
    expect(links[1]).toHaveContent(`${item}_two`);
    expect(links[0]).toHaveAttribute("href", item);
    expect(links[1]).toHaveAttribute("href", item);
  });
});
