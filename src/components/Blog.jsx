import {
  Container,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getIndex } from "../features/universalFunctions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePost } from "../features/BlogSlice";
const Blog = () => {
  const posts = useSelector((state) => state.posts);
  const users = useSelector((state) => state.users);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const { id } = useParams();
  const post = posts.posts ? posts.posts[id] : {};
  const user = post
    ? users.users[getIndex(users.users, "id", post.userId ? post.userId : -1)]
    : {};
  console.log(posts, users);
  return (
    <Container>
      {post && user && (
        <ImageListItem key={"item.img"}>
          <img
            src={`${"https://source.unsplash.com/random/600x200?sig=2"}`}
            alt={"item.title"}
            loading="lazy"
            style={{ height: "300px" }}
          />
          <ImageListItemBar
            title={post.title}
            subtitle={user.firstName + " " + user.lastName}
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${"item.title"}`}
              >
                <EditIcon sx={{ mx: 2, color: "white" }} />
                <DeleteIcon sx={{ mx: 2, color: "white" }} onClick={()=>{
                  dispatch(deletePost(id));
                  navigate('/')
                }}/>
              </IconButton>
            }
          />
        </ImageListItem>
      )}
      {post && (
        <>
          <Typography sx={{ my: 3 }} variant="h3" gutterBottom>
            {post.title}
          </Typography>
          <Typography sx={{ my: 3 }} variant="p" gutterBottom>
            {post.body}
          </Typography>
        </>
      )}
    </Container>
  );
};

export default Blog;
