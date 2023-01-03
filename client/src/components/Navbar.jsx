import { Avatar, Badge, Box, Modal, Button, Container, IconButton, Divider, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, TextField, Tooltip, Typography, Drawer, ListSubheader, Select, InputLabel, FormControl } from '@mui/material'
import Logo from '../assets/logo.png'
import SearchIcon from '@mui/icons-material/Search';
import Ebenta from '../assets/ebenta.png'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { logOut, resetState } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { itemTables } from '../dataTables';
import avatarImage from '../assets/avatar.png'
import { toast } from 'react-toastify';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';




const Navbar = () => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("persist:root"))?.auth;
    const currentUser = user && JSON.parse(user).currentUser;
    const TOKEN = currentUser?.acessToken;

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleMenuHamburger = (e) => {
        setMenuHamburger((prev) => !prev)
    }
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

    
    const [searchInput, setSearchInput] = useState()
    const handleSearch = (e) =>{
      e.preventDefault()
      navigate(`/search/${searchInput}`)
      navigate(0)
    }


    const quantity = useSelector((state) => state.cart.quantity)

    const [selectedIndex, setSelectedIndex] = useState(1);
    const navigate = useNavigate()
    const open = Boolean(anchorEl);

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

      const onLogout = async (e) => {
        e.preventDefault();
        dispatch(logOut())
        toast.info("Logout Successfully")
        navigate('/')
      }




            //Modal Menu

            const style = {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              height: 300,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            };
            
            const [openModal, setOpenModal] = useState(false)
      
            const handleModalChange = (e) => {
              setOpenModal((prev) =>!prev)
             
            }


      //Sidebar for mobile

      const [menuHamburger, setMenuHamburger] = useState({
        left: false
        })

      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setMenuHamburger({ ...menuHamburger, [anchor]: open });
      };
    
      const list = (anchor) => (
        <Box
          sx={{ width: 250 }}
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
          
        >
          <Box sx={{display: 'flex', flexDirection: 'column', alingItems:'center', justifyContent: 'center', padding: 2}}>
              <Box component="img" src={Ebenta} sx={{height: 95, objectFit: 'contain'}} />
                <List  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Browse / Shop Items
                    </ListSubheader>
                    }>
                    <ListItem component={Link} to="/" sx={{textDecoration: 'none', color: 'inherit'}} disablePadding>
                      <ListItemButton>
                          <ListItemIcon>
                              <HomeIcon />
                          </ListItemIcon>
                          <ListItemText primary="Home" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={handleModalChange}>
                          <ListItemIcon>
                              <SearchIcon />
                          </ListItemIcon>
                          <ListItemText primary="Search" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem component={Link} sx={{color:'inherit'}} to={currentUser? "/cart" : "/login"} disablePadding>
                      <ListItemButton>
                          <ListItemIcon>
                          <Badge badgeContent={quantity} color="success">
                              <ShoppingCartIcon />
                          </Badge>
                          </ListItemIcon>
                          <ListItemText primary="Cart" />
                      </ListItemButton>
                    </ListItem>
                </List>
                <Divider />

                {currentUser? (
                <List  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Sell / View Products
                    </ListSubheader>
                    }>
                        <ListItem component={Link} sx={{color:'inherit'}}  to={`/myproducts/${currentUser._id}`} disablePadding>
                          <ListItemButton>
                              <ListItemIcon>
                                  <AddShoppingCartIcon />
                              </ListItemIcon>
                              <ListItemText primary="My Products" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem component={Link} sx={{color:'inherit'}}  to={ `/statistics/${currentUser._id}`} disablePadding>
                          <ListItemButton>
                              <ListItemIcon>
                                  <DashboardIcon />
                              </ListItemIcon>
                              <ListItemText primary="Dashboard" />
                          </ListItemButton>
                        </ListItem>
                   </List>
                      ): (
                        ""
                      )}
                <Divider />
                {currentUser ? (

                <List  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Settings
                    </ListSubheader>
                    }>
                          <ListItem component={Link} sx={{color:'inherit'}}  to={ `/edituser/${currentUser._id}`}   disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                          </ListItem>
                           <ListItem component={Link} sx={{color:'inherit'}}  onClick={onLogout}   disablePadding>
                           <ListItemButton>
                               <ListItemIcon>
                                   <LogoutIcon />
                               </ListItemIcon>
                               <ListItemText primary="Logout" />
                           </ListItemButton>
                         </ListItem>
                        </List>
                      ):
                      (
                        <Link style={{textDecoration: 'none', marginTop: 10, display: 'flex', alingItems:'center', justifyContent:'center'}} to="/login">
                            <Button size="small" variant="contained" fullWidth>
                                Login
                            </Button>
                        </Link>
                      )}
          </Box>

        
        </Box>
      );

    
      



  return (
    <Box sx={{height: '100px' ,width: '100%',}}>

        <Box 
            sx={{display: {xs: 'none', md: 'flex'},
            alingItems:'center', 
            justifyContent: 'center', 
            height: '65px', paddingY: '10px', 
            marginBottom: '20px',
            borderBottom: 1
            }}>
                <Box component="img" 
                    sx={{objectFit: 'contain', 
                    width: '100%', 
                    height: '100%'}} src={Logo} />
        </Box>

        <Container 
            bgcolor="red"
            maxWidth="xl" 
            component="nav" 
            sx={{display: {xs: 'none', md: 'flex', boxShadow: 3},
            alignItems:'center', 
            height:'10px', 
            justifyContent:'space-between'}}>

            <Box flex={2}  sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
                    <Link to="/" style={{textDecoration: 'none'}}>
                        <Typography variant="subtitle2" 
                        fontWeight={700}
                        sx={{textTransform: "capitalize", 
                            ':hover': {
                            color: '#00e676'
                            },
                            color: '#424242',
                            marginRight: '20px'
                        }}
                            
                        >
                            Home  
                        </Typography>
                    </Link>

                    <Typography variant="subtitle2" 
                        fontWeight={700}
                        sx={{textTransform: "capitalize", 
                            ':hover': {
                            color: '#00e676'
                            },
                            color: '#424242',
                            cursor: 'pointer',
                            marginRight: '5px'
                        }}
                        onClick={handleClickListItem}
                        >
                        Department  
                        </Typography>
                        {open ? <ExpandLess /> : <ExpandMore />}

                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                    }}
                >
                    {itemTables.map((option, index) => (
                    <MenuItem
                        key={option.id}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={option.to}>
                            {option.name}
                        </Link>
                    </MenuItem>
                    ))}
                </Menu>

            </Box>

            <Box flex={4} sx={{display:'flex', alignItems:'center', justifyContent:'center', gap: '10px'}}>
            <TextField
             
                placeholder="Search Product"
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <ManageSearchIcon />
                    </InputAdornment>
                ),
                }}
                sx={{textTransform: "capitalize", 
                    width:'500px',
                    ':hover': {
                    color: '#00e676'
                    }
                }}
                onChange={(e) => setSearchInput(e.target.value)}
                variant="standard"
            />
            <Button onClick={handleSearch} variant="contained">
              Search
            </Button>

            </Box>

            <Box flex={2} sx={{display: 'flex', alignItems:'center', justifyContent: 'space-evenly'}}>

                <Link to={currentUser? "/cart" : "/login"}>
                    <Badge badgeContent={quantity} color="success">
                        <ShoppingCartIcon />
                    </Badge>
                </Link>

                
                {currentUser ? (
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="subtitle2" marginRight={2} sx={{color: {xs: 'white', md: 'gray'}}}> Hello, <Typography variant="subtitle1" sx={{color: {xs: 'white', md: 'black'}}} component="span" >{currentUser.firstname} {currentUser.lastname}</Typography> </Typography>
                <Tooltip title="Open settings">
                        <IconButton 
                            onClick={handleOpenUserMenu}
                            sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src={currentUser.img || avatarImage } />
                        </IconButton>
                        </Tooltip>
                        <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >

                    <Link 
                        to={ `/statistics/${currentUser._id}`}  
                        style={{textDecoration: 'none', color: 'inherit'}}>
                        <MenuItem>
                        Dashboard
                        </MenuItem>
                    </Link>

                    <Link 
                        to={ `/edituser/${currentUser._id}`}  
                        style={{textDecoration: 'none', color: 'inherit'}}>
                        <MenuItem>
                        Profile
                        </MenuItem>
                    </Link>

                    <Link 
                    to={`/myproducts/${currentUser._id}`}  
                    style={{textDecoration: 'none', color: 'inherit'}}>
                        <MenuItem>
                        My Products
                        </MenuItem>
                    </Link>

                    <MenuItem  onClick={onLogout}>
                        Logout
                    </MenuItem>
                </Menu>
                        </Box>
                        
                        
                    ):
                        (
                            <Link style={{textDecoration: 'none'}} to="/login">
                                <Button size="small" variant="contained">
                                    Login
                                </Button>
                            </Link>

                        )
                    }
                
            </Box>

        </Container>

        <Box sx={{display: {xs: 'flex', md: 'none'}}}> 
          <Box sx={{height: "50px", width: '100%', display: 'flex', alingItems:'center', position: 'relative', boxShadow: 2}}>  
                  <Box src={Logo} component="img" sx={{height: "45px", width: '100%', objectFit: 'contain'}} />
              <Box sx={{position: 'absolute', right: 0, top: 0, padding: 1}}>
                <IconButton onClick={toggleDrawer('left', true)}>
                  <MenuIcon />
                </IconButton>
                <Drawer
                  open={menuHamburger['left']}
                  onClose={toggleDrawer('left', false)}
                >
                  {list('left')}
                </Drawer>
              </Box>
         
          </Box>
        </Box>
        <Modal
              open={openModal}
              onClose={handleModalChange}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="subtitle2" mb={2}>
                  Looking For...
                </Typography>
               <TextField variant='outlined' fullWidth onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                    navigate(`/search/${e.target.value}`)
                    }
                }}
                placeholder="Search Product"
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <ManageSearchIcon />
                    </InputAdornment>
                ),
                }}
                />


                <Box sx={{paddingY: 2, display: 'flex', flexDirection: 'column', gap: 2}}>
                  <Typography variant="subtitle2">Filter by Courses</Typography>
                  <FormControl fullWidth>  
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="categories"
                    defaultValue=""
                    label="categories"
                    required
                  >
                      {itemTables.map((item) =>(
                          <MenuItem key={item.id} value={item.cat}>
                              <Link style={{textDecoration: 'none', color: 'inherit'}} to={item.to}>
                                 {item.name}
                              </Link>
                          </MenuItem>       
                              
                    ))}
                      
                  </Select>
                  </FormControl>

                </Box>           
              </Box>
          </Modal>

    </Box>
  )
}

export default Navbar