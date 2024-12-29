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

export const initialProfileForm = {
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmYb6Pn2mA3WBta7vCKwtjxoGyRWQxOgtc6Q&s",
  fullname: "ahmad fiqri oemry",
  bio: "im so goood",
  gender: "male",
};

export const initialPostForm = {
  content: "",
  images: [],
  preview: [],
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

export const initialCommentForm = {
  comment: "",
};

export const initialCommentConfig = [
  {
    name: "comment",
    type: "text",
    placeholder: "Add a comment ...",
  },
];

export const sidebarConfiguration = ({
  handleNavigate,
  handleOpenModal,
  handleSearch,
}) => [
  {
    icon: HomeIcon,
    action: () => handleNavigate(""),
    title: "home",
  },
  {
    icon: CircleUserRound,
    action: () => handleNavigate("profile"),
    title: "profile",
  },
  {
    icon: Compass,
    title: "explore",
    action: () => handleNavigate("explore"),
  },
  {
    icon: Search,
    action: () => handleSearch("search"),
    title: "search",
  },
  {
    icon: SquarePlus,
    action: () => handleOpenModal("create"),
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
