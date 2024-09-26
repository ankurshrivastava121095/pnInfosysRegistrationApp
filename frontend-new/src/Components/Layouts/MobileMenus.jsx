import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import AdminSideDrawer from './AdminSideDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function MobileMenus() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  const [openDrawer, setOpenDrawer] = React.useState(false)

  return (
    <>
      <div className='bottom-menus'>
        <Box sx={{ pb: 7 }} ref={ref}>
          <CssBaseline />
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label="Menu" onClick={()=>setOpenDrawer(true)} icon={<MenuIcon />} />
              <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} />
              <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
            </BottomNavigation>
          </Paper>
        </Box>
      </div>

      <AdminSideDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
}