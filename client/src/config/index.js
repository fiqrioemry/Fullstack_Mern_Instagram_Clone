import {
  CircleUserRound,
  Compass,
  HomeIcon,
  Search,
  SquarePlus,
} from 'lucide-react';

// authentication state & control
export const signInState = {
  identifier: '',
  password: '',
};

export const signInControl = [
  {
    name: 'identifier',
    label: 'email / username',
    type: 'email',
    placeholder: 'Enter your email / username ',
    component: 'input',
  },
  {
    name: 'password',
    label: 'password',
    type: 'password',
    placeholder: 'Enter your password ',
    component: 'input',
  },
];

export const signUpState = {
  username: '',
  fullname: '',
  email: '',
  password: '',
};

export const profileState = {
  email: '',
  username: '',
  avatar: '',
  fullname: '',
  bio: '',
  birthday: '',
  gender: '',
  isPrivate: '',
};

export const profileControl = [
  {
    name: 'fullname',
    label: 'fullname',
    type: 'text',
    placeholder: 'Enter your name here',
    component: 'input',
  },
  {
    name: 'bio',
    label: 'bio',
    type: 'text',
    placeholder: 'Enter your bio here',
    component: 'textarea',
  },
  {
    name: 'birthday',
    label: 'birthday',
    type: 'date',
    placeholder: 'Add your birthday',
    component: 'input',
  },
  {
    name: 'gender',
    label: 'gender',
    type: 'select',
    placeholder: 'Select your gender',
    component: 'select',
    options: ['male', 'female'],
  },
];

export const postState = {
  content: '',
  images: [],
};

export const postControl = [
  {
    name: 'content',
    label: 'content',
    type: 'text',
    placeholder: 'Write a post',
    component: 'input',
  },
  {
    name: 'images',
    label: 'images',
    type: '',
    placeholder: 'Maks. 5 Image and less than 1mb each',
    component: 'upload',
  },
];

export const commentState = {
  content: '',
  parentId: '',
};

export const commentControl = [
  {
    name: 'content',
    label: 'content',
    type: 'text',
    placeholder: 'Write a comment',
    component: 'input',
  },
];

export const sidebarConfiguration = ({
  handleNavigate,
  handleOpenModal,
  handleSearch,
}) => [
  {
    icon: HomeIcon,
    action: () => handleNavigate(''),
    title: 'home',
  },
  {
    icon: CircleUserRound,
    action: () => handleNavigate(`/profile`),
    title: 'profile',
  },
  {
    icon: Compass,
    title: 'explore',
    action: () => handleNavigate('explore'),
  },
  {
    icon: Search,
    action: () => handleSearch('search'),
    title: 'search',
  },
  {
    icon: SquarePlus,
    action: () => handleOpenModal('create'),
    title: 'create',
  },
];

export const animateSearch = {
  close: {
    left: '-100%',
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
  open: {
    left: '75px',
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};
