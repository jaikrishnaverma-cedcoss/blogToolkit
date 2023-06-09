import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BallotIcon from '@mui/icons-material/Ballot';
import { Button, Container } from '@mui/material';
import Authenticate from '../customHook/Authenticate';
import { logOut } from '../features/UserSlice';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Sidebar() {
  const theme = useTheme();
  const dispatch=useDispatch()
  Authenticate()
  const [open, setOpen] = React.useState(false);
  const navigate=useNavigate()
  const [active,setActive]=React.useState(null)
 const users=useSelector(state=>state.users)
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
         <Box sx={{width:'100%',display:'flex',justifyContent:'space-between'}}>
         <Typography variant="h6" noWrap component="div">
            BLOG's WORLD {`#${users.session.firstName}_${users.session.lastName}`}
          </Typography>
          <Box>
          </Box>
          <Button sx={{float:'right',color:'white'}} onClick={()=>dispatch(logOut())}>
LOG OUT
          </Button>
         </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <ListItem className={`${active==null?'sidelink--active':''}`} key={'text'} disablePadding onClick={()=>{setActive(null);navigate(`/`)}}>
              <ListItemButton>
                <ListItemIcon>
                <BallotIcon /> 
                </ListItemIcon>
                <ListItemText primary={'All Posts'} />
              </ListItemButton>
            </ListItem>
        <Divider />
        <Typography variant="h6" sx={{mx:2,mt:2}}>
           All Users
          </Typography>
        <List>
          {users.users.map((text, index) => (
            <ListItem className={`${active===index?'sidelink--active':''}`} key={text} disablePadding onClick={()=>{setActive(index);navigate(`/user/${index}`)}}>
              <ListItemButton>
                <ListItemIcon>
                <AccountCircleIcon /> 
                </ListItemIcon>
                <ListItemText primary={text.firstName+" "+text.lastName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Container>

        <Typography variant="h5" >
        {active||active===0?users.users[active].firstName+" "+users.users[active].lastName+'\'s':'All Users'}
          </Typography>
        </Container>
        
      <Outlet/>
      </Main>
    </Box>
  );
}