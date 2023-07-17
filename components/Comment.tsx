import { IComment } from "../interfaces";

type Props = { comment: IComment; onDelete: () => void };

export function Comment({ comment, onDelete }: Props) {
  return (
    <div>
      <p>
        <span data-testid="comment"> "{comment.comment}"</span> by{" "}
        <span data-testid="author">
          {comment.createdBy?.email || "Unknown"}
        </span>{" "}
        at {comment.createdAt}
      </p>
      <button onClick={onDelete} data-testid="delete">
        Delete
      </button>
    </div>
  );
}
