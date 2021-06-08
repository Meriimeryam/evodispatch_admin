import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Requests",
    path: "/",
    icon: <AiIcons.AiFillMessage />,
    cName: "nav-text",
  },
  {
    title: "Solutions",
    path: "/solutions",
    icon: <AiIcons.AiFillStar />,
    cName: "nav-text",
  },
  {
    title: "Links",
    path: "/links",
    icon: <FaIcons.FaLink />,
    cName: "nav-text",
  },
  {
    title: "Clients",
    path: "/clients",
    icon: <FaIcons.FaUserFriends />,
    cName: "nav-text",
  },
];
