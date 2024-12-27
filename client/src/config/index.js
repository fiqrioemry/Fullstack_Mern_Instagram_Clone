import {
  CircleUserRound,
  Compass,
  HomeIcon,
  Search,
  SquarePlus,
} from "lucide-react";

export const initialSignInForm = {
  email: "",
  password: "",
};

export const initialSignUpForm = {
  username: "",
  fullname: "",
  email: "",
  password: "",
};

export const controlSignInForm = [
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email ",
    style: "flex items-center capitalize",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password ",
    style: "flex items-center capitalize",
  },
];

export const controlSignUpForm = [
  {
    name: "username",
    type: "text",
    placeholder: "Enter your username",
    style: "flex items-center",
  },
  {
    name: "fullname",
    type: "text",
    placeholder: "Enter your full name",
    style: "flex items-center",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    style: "flex items-center",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    style: "flex items-center",
  },
];

export const sidebarConfiguration = ({
  handleNavigate,
  handlePost,
  handleSearch,
}) => [
  {
    icon: HomeIcon,
    action: () => handleNavigate(""),
    path: "",
    title: "home",
  },
  {
    icon: CircleUserRound,
    action: () => handleNavigate("profile"),
    path: "profile",
    title: "profile",
  },
  {
    icon: Compass,
    title: "explore",
    action: () => handleNavigate("explore"),
    path: "explore",
  },
  {
    icon: Search,
    action: () => handleSearch(),
    path: null,
    title: "search",
  },
  {
    icon: SquarePlus,
    action: () => handlePost(),
    path: null,
    title: "create",
  },
];

export const animateSearch = {
  close: {
    left: "-100%",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  open: {
    left: "75px",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};
