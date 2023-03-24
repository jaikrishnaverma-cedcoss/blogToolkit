import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { editPost } from '../features/BlogSlice';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Editor({open,setOpen,index,post}) {
  const handleClose = () => setOpen(false);
  const dispatch=useDispatch()
  const [form,setForm]=React.useState({
    title:post.title,
    body:post.body
  })

  const submitHandler=()=>{
    if(form.title&&form.body)
    dispatch(editPost({index:index,post:form}))
    setOpen(false)
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Update Blog
            </Typography>
            <TextField
          required
          fullWidth
          id="outlined-required"
          label="Title"
          name="Title"
          defaultValue={form.title}
          onChange={(e)=>setForm({...form,title:e.target.value})}
          sx={{mb:2,mt:2}}
        />
            <TextField
          required
          fullWidth
          id="outlined-required"
          label="Blog Content"
          name="Blog_Content"
          defaultValue={form.body}
          onChange={(e)=>setForm({...form,body:e.target.value})}
          multiline
          rows={5}
        />
        <Button variant="contained" onClick={submitHandler} sx={{mt:2,float:'right'}} endIcon={<SendIcon />}>
  Update
</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}