import React from "react";
import "./aboutSection.css";
import { Typography, Avatar } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const About = () => {
 
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://avatars.githubusercontent.com/u/135614556?s=400&u=9210fd3b05d4deb424991b3005f21a856ced63a5&v=4"
              alt="Founder"
            />
            <Typography>Punit Shinde</Typography>
            
            <span>
              This is a sample ecommerce wesbite. Only with the
              purpose to learn and apply MERN Stack.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">My Handles</Typography>
            <a
              href="https://github.com/Punit-Shinde"
              target="blank"
            >
              <GitHubIcon className="githubSvgIcon" />
            </a>

            <a href="https://www.linkedin.com/in/punit-shinde/" target="blank">
              <LinkedInIcon className="linkedinSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
