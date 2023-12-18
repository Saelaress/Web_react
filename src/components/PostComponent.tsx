// PostComponent.tsx
import React, { useState, useRef } from "react";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
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
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedBody] = useState(post.body);
  const inputRefTitle = useRef<HTMLInputElement>(null);
  const inputRefBody = useRef<HTMLInputElement>(null);

  const handleCheckboxChange = () => {
    onCheckboxChange(post.id);
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleSaveEdit = () => {
    setPosts?.((prevPosts) => {
      const updatedPosts = prevPosts.map((p) => {
        if (p.id === post.id) {
          return {
            ...p,
            title: editedTitle,
            body: editedBody,
          };
        }
        return p;
      });

      // Обновляем в localStorage
      localStorage.setItem("posts", JSON.stringify(updatedPosts));

      return updatedPosts;
    });

    setEditDialogOpen(false);
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="comments"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick();
            }}
          >
            <EditIcon />
          </IconButton>
        }
        disablePadding
        onClick={handleCheckboxChange}
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

      {/* Диалог редактирования */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="editedTitle"
            label="Title"
            fullWidth
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            inputRef={inputRefTitle}
          />
          <TextField
            margin="dense"
            id="editedBody"
            label="Body"
            fullWidth
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            inputRef={inputRefBody}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
