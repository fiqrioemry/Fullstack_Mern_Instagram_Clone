import { clsx } from 'clsx';
import * as Yup from 'yup';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDateToISO(date) {
  if (date && !isNaN(new Date(date))) {
    return new Date(date).toISOString().split('T')[0];
  }
  return '';
}

export function formatFormDataDates(data, dateFields = []) {
  const formattedDates = {};

  dateFields.forEach((field) => {
    if (data[field]) {
      formattedDates[field] = formatDateToISO(data[field]);
    }
  });

  return formattedDates;
}
const baseValidations = {
  fullname: Yup.string()
    .min(6, 'Min. 6 characters')
    .required('Fullname is required'),
  username: Yup.string()
    .min(8, 'Min 8 characters')
    .matches(
      /^(?!.*[_.]{2})[a-zA-Z0-9][a-zA-Z0-9._]{6,}[a-zA-Z0-9]$/,
      "Cannot contain '.' or '_' at the beginning or end",
    )
    .required('Username is required'),
  password: Yup.string()
    .min(5, 'Min. 5 characters')
    .required('Password is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  otp: Yup.string().min(6, 'Min. 6 digits').required('OTP is required'),
  identifier: Yup.string()
    .test(
      'is-email-or-username',
      'Must be a valid email or username',
      (value) => {
        if (!value) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex =
          /^(?!.*[_.]{2})[a-zA-Z0-9][a-zA-Z0-9._]{6,}[a-zA-Z0-9]$/;
        return emailRegex.test(value) || usernameRegex.test(value);
      },
    )
    .required('Email or username is required'),
  city: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  province: Yup.string().required('Required'),
  location: Yup.string().required('Required'),

  zipcode: Yup.string().min(5, 'Min. 5 digits').required('Required'),
  name: Yup.string().min(6, 'Min. 6 characters').required('Required'),
  bio: Yup.string().min(20, 'Min. 20 characters').required('Required'),
  title: Yup.string().min(3, 'Min. 3 characters').required('Required'),
  start_date: Yup.date().required('Required').typeError('Invalid date'),
  company: Yup.string().min(3, 'Min. 3 characters').required('Required'),
  address: Yup.string().min(12, 'Min. 12 characters').required('Required'),
  description: Yup.string().min(20, 'Min. 20 characters').required('Required'),
  categoryId: Yup.mixed().required('Required'),
  files: Yup.array()
    .min(1, 'Please upload at least one file')
    .required('Files are required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be greater than zero')
    .required('Required'),
  stock: Yup.number()
    .typeError('Stock must be a number')
    .integer('Stock must be a whole number')
    .min(0, 'Stock cannot be negative')
    .required('Required'),

  birthday: Yup.date()
    .max(new Date(), 'Cannot be in the future')
    .required('Required')
    .typeError('Invalid date'),
  end_date: Yup.date()
    .nullable()
    .typeError('Invalid date')
    .min(Yup.ref('start_date'), 'Must be after start date'),
};

export const newValidationSchema = (fields = []) => {
  const schemaFields = {};
  fields.forEach((field) => {
    if (baseValidations[field.name]) {
      schemaFields[field.name] = baseValidations[field.name];
    }
  });

  return Yup.object().shape(schemaFields);
};

export const formatToRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};
