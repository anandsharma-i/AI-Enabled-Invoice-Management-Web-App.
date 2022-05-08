import React from 'react';
import { Typography, Box } from '@mui/material';
import '../../styling/style.css';

/**
 * This is footer component
 * This contains..
 * Link to privacy policy and copyright text
 * 
 * NOTE: ALL UI SCREENSHOT ARE IN THE SRC/RESOURCES/UI-ScreenShots folder
*/

function Footer()
{
    return (
        <div className="Footer" style={{paddingTop:"45px"}}>            
            <Box>                                               
                <Typography align='center'><a href='https://www.highradius.com/privacy-policy/' target={'_blank'}>Privacy Policy</a>|©Copyright 2022 Highradius.All Rights Reserved.</Typography>                        
            </Box>              
        </div>
    );
}

export default Footer;