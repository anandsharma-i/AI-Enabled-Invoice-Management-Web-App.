import React from 'react';
import { Box,AppBar ,Toolbar, Grid } from "@mui/material";
import hrc_logo from '../../resources/images/hrc_logo.png';
import abc_logo from '../../resources/images/ABC_logo.png';

/**
 * This is header component
 * This contains..
 * HRC Logo and ABC Logo
 * 
 * NOTE: ALL UI SCREENSHOT ARE IN THE SRC/RESOURCES/UI-ScreenShots folder
*/

function Header()
{
    return (
      <div className='Header'>
        <Box >
          <AppBar position="static" sx={{bgcolor:"#304454"}}>
            <Toolbar>          
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <img
                  src={abc_logo}                
                  alt="img1"
                  />
                </Grid> 
                <Grid item xs={7}>
                  <img
                  src={hrc_logo}
                  alt="img2"
                  />
                </Grid>           
              </Grid>
              
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    );
}

export default Header;