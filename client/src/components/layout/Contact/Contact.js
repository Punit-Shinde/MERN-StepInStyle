import React from "react";
import "./Contact.css";
import { Button } from "@mui/material/legacy";

const Contact = () => {
  return (
    <div className="contactContainer">
      <h1>Get in touch!</h1>
      <p>Welcome to my Contact page, where collaboration begins! Have you been impressed by my work and looking to bring that same level of dedication and expertise to your team? As a full-stack web developer, I've had the privilege of working on various projects, each showcasing my passion for crafting innovative solutions and delivering exceptional results. If my work resonates with you and you're seeking a skilled developer to join your ranks, I'm here to make it happen.</p>
        <p>Feel free to reach out by clicking the link bellow, I'll get back to you as soon as possible.</p>
      <a className="mailBtn" href="mailto:punitshinde1@gmail.com">
        <Button>Contact via Email</Button>
      </a>
    </div>
  );
};

export default Contact;
