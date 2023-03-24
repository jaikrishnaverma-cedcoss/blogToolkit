import { Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react'

const Comments = ({comments}) => {
  return (
   <>
   <Typography variant="h6" sx={{mt:5}} color="initial">
    Comments:
   </Typography>
    <List  sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {comments.map(x=><>
        <ListItem alignItems="flex-start">
        <ListItemText
          primary={x.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>
              {x.comment}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider   />
      </>)
        }
      </List>
   </>
  )
}

export default Comments;