// AddPost.tsx
import React, { useRef, useContext } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import SetPostsContext from "../context/setPostsContext";
import useSetPosts from "../hooks/useSetPosts";

export default function AddPost() {
  const setPosts = useSetPosts();
  const inputRefTitle = useRef<HTMLInputElement>(null);
  const inputRefBody = useRef<HTMLInputElement>(null);

  const handleAddPost = () => {
    const title = inputRefTitle.current?.value;
    const body = inputRefBody.current?.value;

    if (title && body) {
      setPosts?.((prevPosts) => {
        const newPost = {
          userId: 1,
          id: Date.now(), // Генерируем уникальный идентификатор на основе текущего времени
          title,
          body,
          liked: false,
        };

        const updatedPosts = [newPost, ...prevPosts];
        localStorage.setItem("posts", JSON.stringify(updatedPosts));

        return updatedPosts;
      });

      // Очистка полей формы
      if (inputRefTitle.current) inputRefTitle.current.value = "";
      if (inputRefBody.current) inputRefBody.current.value = "";
    }
  };

  return (
    <Container maxWidth={"sm"}>
      <Typography
        variant="h5"
        component={"h3"}
        sx={{
          my: 3,
          mb: 2,
        }}
      >
        Add post
      </Typography>
      <Box
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          handleAddPost();
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          variant="outlined"
          name="title"
          placeholder="Post title"
          inputRef={inputRefTitle}
        />
        <TextField
          variant="outlined"
          name="body"
          placeholder="Post body"
          inputRef={inputRefBody}
        />
        <Container sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: "purple" }}
            size="medium"
          >
            Add post
          </Button>
        </Container>
      </Box>
    </Container>
  );
}
