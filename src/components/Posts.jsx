import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/system";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useNavigate, useParams } from "react-router-dom";
import { likePost } from "../features/BlogSlice";
import { getIndex } from "../features/universalFunctions";

function Media(props) {
  let { loading, posts } = useSelector((state) => state.posts);
  let users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const [myPost, setMyPost] = React.useState([]);
  const navigate = useNavigate();
  let { id } = useParams();
  if (props.id) id = props.id;
  React.useEffect(() => {
    if (users.length > 0 && (id || id === 0)) {
      const userId = users[id];
      if (userId) {
        let userPosts = posts.filter((x) => x?.userId === userId?.id);
        setMyPost((prev) => [...userPosts]);
      }
    } else {
      setMyPost((prev) => [...posts]);
    }
  }, [posts, id]);

  const likeMe = (pid) => {
    const ind = posts.findIndex((x) => x.id === pid);
    if (ind !== -1) dispatch(likePost(ind));
  };
  if (myPost.length == 0)
    return (
      <Box sx={{ my: 4 }}>
        <Typography gutterBottom variant="p">
          No Blog Found...!
        </Typography>
      </Box>
    );
  return (
    <Grid container sx={{ padding: "0 auto" }}>
      {(loading ? Array.from(new Array(20)) : myPost).map((item, index) => (
        <Box
          onClick={() => navigate(`/blog/${item.id}`)}
          key={item ? item.id + "blog" : index + "skelt"}
          className="blog"
          sx={{ width: 210, marginRight: 2, my: 4 }}
        >
          {item ? (
            <img
              style={{ width: 210, height: 118 }}
              alt={item.title}
              src={"https://source.unsplash.com/random/200x200?sig=" + index}
            />
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}

          {item ? (
            <Box sx={{ pr: 2 }}>
              <Typography gutterBottom variant="h6">
                {item.title}
              </Typography>
              <Typography
                display="block"
                variant="caption"
                color="text.secondary"
              >
                {/* {item.body} */}
              </Typography>
              <ThumbUpIcon
                onClick={(e) => {
                  e.stopPropagation();
                  likeMe(item.id);
                }}
              />{" "}
              <br></br>
              <Typography variant="caption" color="text.secondary">
                {`Likes ${item.reactions} `}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
}

export default function Posts() {
  return (
    <Container sx={{ overflow: "hidden" }}>
      <Media />
    </Container>
  );
}
