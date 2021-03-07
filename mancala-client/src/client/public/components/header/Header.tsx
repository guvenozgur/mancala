import React from 'react'
import {Link} from 'react-router-dom' 

import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import Instagramlogo from '../../images/logo/instagram-logo.png' 
import Linkedinlogo from '../../images/logo/linkedin-logo.png' 
import StravaLogo from '../../images/logo/strava.png' 

import './header.css'


interface IHeaderStat{
    anchorEl: any;
}

interface IHeaderProps{

}

export default class Header extends React.Component<IHeaderProps, IHeaderStat>{

    constructor(props: any){
        super(props)
        this.state = {anchorEl: null}
    }


    handleClick (event: any){
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose(){
        this.setState({anchorEl: null});
    };

    render(){
        const {anchorEl} = this.state;
        return(
            <div id='header-container'>                
                <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        color='secondary'
                        onClick={this.handleClick.bind(this)}>
                        <MoreVertIcon />
                </IconButton>
                <Menu id="simple-menu" anchorEl={anchorEl}  open={Boolean(anchorEl)} onClose={this.handleClose.bind(this)}> 
                        <Link to="/welcome"> <MenuItem onClick={this.handleClose.bind(this)}>Profile</MenuItem> </Link>
                        <Link to="/resume"> <MenuItem onClick={this.handleClose.bind(this)}>My Account</MenuItem> </Link>
                </Menu>
                <div id="header-info">Güven Özgür, C.Eng İYTE</div>
                <div id="header-social-media">
                    <a href="https://linkedin.com/in/hüseyin-güven-özgür-807b4769"><img src={Linkedinlogo} id="social-media-logo"></img></a>
                    <a href="https://www.instagram.com/_gwenozgur/"><img src={Instagramlogo} id="social-media-logo"></img></a>                
                    <a href="https://www.strava.com/athletes/18225693"><img src={StravaLogo} id="social-media-logo"></img></a>
                </div>
            </div>
        )
    }
}