import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../features/BlogSlice';
import { Container } from '@mui/system';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useNavigate } from 'react-router-dom';

function Media(props) {
  const { loading , posts } = useSelector(state=>state.posts);
  const navigate=useNavigate()

  return (
    <Grid container sx={{padding:'0 auto'}}>
      {(loading ? Array.from(new Array(20)) : posts).map((item, index) => (
        <Box key={item?item.id+'blog':index+'skelt'} className="blog" onClick={()=>navigate(`/blog/${index}`)} sx={{ width: 210, marginRight: 2, my: 4 }}>
          {item ? (
            <img
              style={{ width: 210, height: 118 }}
              alt={item.title}
              src={"https://source.unsplash.com/random/200x200?sig="+index}
            />
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}

          {item ? (
            <Box sx={{ pr: 2 }}>
              <Typography gutterBottom variant="h6" >
                {item.title}
              </Typography>
              <Typography display="block" variant="caption" color="text.secondary">
                {/* {item.body} */}
              </Typography>
              <ThumbUpIcon/> <br></br>
              <Typography variant="caption"  color="text.secondary">
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
  const dispatch=useDispatch()
React.useEffect(()=>{
dispatch(fetchAllPosts())
},[])
  return (
    <Container sx={{ overflow: 'hidden' }} >
      <Media/>
    </Container>
  );
}