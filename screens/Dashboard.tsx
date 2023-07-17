import { useQuery } from "@apollo/client";
import { Button, Text, View } from "react-native";
import { READ_POSTS } from "../graphql/readPosts";
import { useUser } from "../hooks/userContext";
import { IPost } from "../interfaces";

export function Dashboard() {
  const { user, logout } = useUser();
  const { data } = useQuery<{ readPosts: IPost[] }>(READ_POSTS, {
    fetchPolicy: "network-only",
  });

  return (
    <View>
      <Text>Dashboard</Text>
      <Text>
        Hello {user?.email} vous avez l'id {user?.id}
      </Text>
      <Button onPress={logout} title="Singout"></Button>
      <Text>Last posts</Text>
      {data?.readPosts.map((post) => (
        <View key={post.id}>
          <Text>By {post.createdBy?.email} </Text>
          <Text>{post.content}</Text>
          <Text>Comments</Text>
          {post.comments?.map((comment) => (
            <View key={comment.id}>
              <Text>
                {comment.comment}{" "}
                <Text style={{ fontStyle: "italic" }}>
                  by {comment.createdBy?.email}
                </Text>
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
