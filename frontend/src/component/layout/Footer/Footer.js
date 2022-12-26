import React from "react";
import "./Footer.css";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2022 &copy; Vinayak Agarwal</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.linkedin.com/in/vinayak-agarwal-a73512194/">
          LinkedIn
        </a>
        <a href="https://www.youtube.com/@shubhiagarwal5739">Youtube</a>
        <a href="https://codeforces.com/profile/shubhi_ag11">CodeForces</a>
      </div>
    </footer>
  );
};

export default Footer;
