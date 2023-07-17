import { useMutation, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { CREATE_COMMENT } from "../graphql/createComment";
import { READ_COMMENTS } from "../graphql/readComments";
import { IComment } from "../interfaces";
import { Comment } from "../components/Comment";
import { UserContext } from "../hooks/userContext";

export function Commments() {
  const userContext = useContext(UserContext);
  const [comment, setComment] = useState("");
  const { data, refetch } = useQuery<{ readComments: IComment[] }>(
    READ_COMMENTS
  );

  const [doCreateCommmentMutation, { error }] = useMutation(CREATE_COMMENT);

  async function doCreateComment() {
    try {
      const { data } = await doCreateCommmentMutation({
        variables: {
          data: {
            comment: comment,
          },
        },
      });
      if (data) {
        setComment("");
        refetch();
      }
    } catch {}
  }
  return (
    <div>
      <h1>Comments</h1>
      {error && (
        <pre style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</pre>
      )}
      {data ? (
        data.readComments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onDelete={() => console.log("Delete")}
          />
        ))
      ) : (
        <p>Loading</p>
      )}
      <p>Hello {userContext.user?.email}, you can write a comment !</p>
      <input
        type="text"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <button
        onClick={() => {
          doCreateComment();
        }}
      >
        Add Commment
      </button>
    </div>
  );
}
