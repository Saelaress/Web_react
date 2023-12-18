// PostList.tsx
import { Container, List, Typography } from "@mui/material";
import React from "react";
import PostComponent from "./PostComponent";
import { Post } from "../types";

type Props = {
  posts: Post[];
  onCheckboxChange: (postId: number) => void;
};

export default function PostList({ posts, onCheckboxChange }: Props) {
  return (
    <Container maxWidth={"sm"}>
      <Typography variant="h5" component={"h3"} sx={{ mb: 2 }}>
        PostList
      </Typography>
      <List>
        {posts.map((post) => (
          <PostComponent
            key={post.id}
            post={post}
            onCheckboxChange={onCheckboxChange}
          />
        ))}
      </List>
    </Container>
  );
}
