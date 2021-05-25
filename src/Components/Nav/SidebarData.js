import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Requests",
    path: "/request",
    icon: <AiIcons.AiFillMessage />,
    cName: "nav-text",
  },
  {
    title: "Solutions",
    path: "/solutions",
    icon: <AiIcons.AiFillStar />,
    cName: "nav-text",
  },
];
