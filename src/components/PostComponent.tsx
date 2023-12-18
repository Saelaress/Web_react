// PostComponent.tsx
import React from "react";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import EditIcon from "../icons/EditIcon";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { pink } from "@mui/material/colors";
import useSetPosts from "../hooks/useSetPosts";
import { Post } from "../types";

type Props = {
  post: Post;
  onCheckboxChange: (postId: number) => void;
};

export default function PostComponent({ post, onCheckboxChange }: Props) {
  const setPosts = useSetPosts();
  const labelId = `checkbox-list-label-${post.id}`;

  const handleCheckboxChange = () => {
    onCheckboxChange(post.id); // Вызываем функцию onCheckboxChange с postId
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="comments"
          onClick={(e) => {
            e.stopPropagation();
            console.log("edit");
          }}
        >
          <EditIcon />
        </IconButton>
      }
      disablePadding
      onClick={handleCheckboxChange} // Вызываем обработчик изменения чекбокса
    >
      <ListItemButton role={undefined} onClick={() => {}} dense>
        <div>
          <Typography variant="h6" gutterBottom>
            {post.title}
          </Typography>
          <ListItemText id={labelId} primary={post.body} />
        </div>
      </ListItemButton>
      <ListItemIcon sx={{ mr: 2 }}>
        <Checkbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          sx={{
            color: pink[800],
            "&.Mui-checked": {
              color: pink[600],
            },
          }}
          edge="start"
          checked={post.liked}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": labelId }}
        />
      </ListItemIcon>
    </ListItem>
  );
}
