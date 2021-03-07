import React from 'react' 
import './footer.css' 

import Instagramlogo from '../../public/images/logo/instagram-logo.png' 
import Linkedinlogo from '../../public/images/logo/linkedin-logo.png' 
import StravaLogo from '../../public/images/logo/strava.png' 

class Footer extends React.PureComponent{

    render(){
        return (
        <div id="footer-container">
                <a href="https://www.instagram.com/_gwenozgur/"><img src={Instagramlogo} id="social-media-logo"></img></a>
                <a href="https://linkedin.com/in/hüseyin-güven-özgür-807b4769"><img src={Linkedinlogo} id="social-media-logo"></img></a>
                <a href="https://www.strava.com/athletes/18225693"><img src={StravaLogo} id="social-media-logo"></img></a>

        </div>
        )
    } 
}

export default Footer 