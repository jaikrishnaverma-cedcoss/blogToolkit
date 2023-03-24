import {
  Box,
  Container,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getIndex } from "../features/universalFunctions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { addComment, deletePost, likePost } from "../features/BlogSlice";
import Posts from "./Posts";
import Editor from "./Editor";
import Comments from "./Comments";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AccountCircle } from "@mui/icons-material";
const Blog = () => {
  const posts = useSelector((state) => state.posts);
  const users = useSelector((state) => state.users);
  const [postUser, setPostUser] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const postIndex = getIndex(posts.posts, "id", id);
  const post = posts.posts ? posts.posts[postIndex] : {};
  const [modal, setModal] = React.useState({
    open: false,
    index: -1,
  });

  useEffect(() => {
    if (post) {
      const userIndex = getIndex(users.users, "id", post.userId);
      setPostUser(users.users[userIndex]);
    }
  }, [post]);
  const addComments = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const comment = data.get("comment");
    if (comment)
      dispatch(
        addComment({
          index: postIndex,
          comment: {
            comment,
            name: users.session.firstName + " " + users.session.lastName,
          },
        })
      );
  };
  const likeMe = (pid) => {
    if (postIndex !== -1) dispatch(likePost(postIndex));
  };
  if (!post) return <></>;

  return (
    <>
      <Container>
        <ImageListItem key={"item.img"}>
          <img
            src={`${"https://source.unsplash.com/random/600x200?sig=2"}`}
            alt={"item.title"}
            loading="lazy"
            style={{ height: "300px" }}
          />
          <ImageListItemBar
            title={post.title}
            subtitle={
              postUser ? postUser.firstName + " " + postUser.lastName : ""
            }
            actionIcon={
              users.session.id == post.userId ? (
                <>
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${"item.title"}`}
                  >
                    <EditIcon
                      sx={{ mx: 2, color: "white" }}
                      onClick={() => {
                        setModal({ ...modal, open: true, index: postIndex });
                      }}
                    />
                  </IconButton>
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${"item.title"}`}
                  >
                    {" "}
                    <DeleteIcon
                      sx={{ mx: 2, color: "white" }}
                      onClick={() => {
                        dispatch(deletePost(postIndex));
                        navigate("/");
                      }}
                    />
                  </IconButton>
                </>
              ) : (
                <Typography
                  sx={{ mx: 3, color: "white" }}
                  variant="small"
                  gutterBottom
                >
                  Other user's post {post.userId}
                </Typography>
              )
            }
          />
        </ImageListItem>
        <Box onClick={() => likeMe(post.id)}>
          <IconButton
            sx={{ color: "blue", m: 2, float: "right" }}
            aria-label={`info about ${"item.title"}`}
          >
            {post.reactions}
            <ThumbUpIcon />
          </IconButton>
        </Box>
        <Typography sx={{ my: 3 }} variant="h3" gutterBottom>
          {post.title}
        </Typography>
        <Typography sx={{ my: 3 }} variant="p" gutterBottom>
          {post.body}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="p" color="initial">
            Write Comment:
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "flex-end" }}
          component="form"
          onSubmit={addComments}
          noValidate
        >
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            fullWidth
            id="input-with-sx"
            name="comment"
            label={`${users.session.firstName} ${users.session.lastName}`}
            variant="standard"
          />
        </Box>
        <Comments comments={post.comments} />
      </Container>
      {(modal.index === 0 || modal.index) && (
        <Editor
          open={modal.open}
          setOpen={(sign) => setModal({ ...modal, open: sign })}
          index={modal.index}
          post={post}
        />
      )}{" "}
      <Posts />
    </>
  );
};

export default Blog;
