import Intro from "../../components/Intro/Intro";
import SwipeList from "../../components/SwipeList/SwipeList";
import Reviews from "../../components/Reviews/Reviews";
import Services from "../../components/Services/Services";
import ChatBox from "../../components/ChatBox/ChatBox";
import "./HomePage.css"

import skincareIcon from "../../assets/product_icon.png";
import skincareIcon1 from "../../assets/product_icon_1.png";

import { useContext } from "react";
import { themeContext } from "../../Context";

export default function HomePage() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  return (
        <div className= { darkMode ? "homePageApp" : "homePageApp Dark"}
        style={{
            background: darkMode ? "white" : "#333",
            color: darkMode ? "" : "white",
        }}
        >
            <img src={skincareIcon} alt="" className="misc"/>
            <img src={skincareIcon1} alt="" className="misc1"/>

            <Intro />
            <SwipeList/>
            <Reviews />
            <Services />
            <ChatBox />
        
        </div>
  )
}