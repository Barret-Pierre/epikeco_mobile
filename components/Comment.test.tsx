import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Comment } from "./Comment";

test("render and display comment from unknown person", async () => {
  // ARRANGE
  render(
    <Comment
      comment={{
        id: 1,
        comment: "Comment Test",
        createdBy: undefined,
        createdAt: new Date().toDateString(),
      }}
      onDelete={() => {}}
    />
  );

  expect(screen.getByTestId("comment")).toHaveTextContent(/Comment Test/);
  expect(screen.getByTestId("author")).toHaveTextContent(/Unknown/);
});

test("render and display comment from known person", async () => {
  // ARRANGE
  render(
    <Comment
      comment={{
        id: 1,
        comment: "Comment Test",
        createdBy: { email: "test@gmail.com" },
        createdAt: new Date().toDateString(),
      }}
      onDelete={() => {}}
    />
  );

  expect(screen.getByTestId("comment")).toHaveTextContent(/Comment Test/);
  expect(screen.getByTestId("author")).toHaveTextContent(/test@gmail.com/);
});

test("delete button", async () => {
  // ARRANGE
  const onDelete = jest.fn();
  render(
    <Comment
      comment={{
        id: 1,
        comment: "Comment Test",
        createdBy: { email: "test@gmail.com" },
        createdAt: new Date().toDateString(),
      }}
      onDelete={onDelete}
    />
  );
  expect(onDelete.mock.calls).toHaveLength(0);
  screen.getByTestId("delete").click();
  expect(onDelete.mock.calls).toHaveLength(1);
});
