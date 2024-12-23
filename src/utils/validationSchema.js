import * as yup from 'yup';

export const tableFormSchema = yup.object().shape({
  name: yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  age: yup.number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .min(18, 'Must be at least 18 years old')
    .max(100, 'Age cannot exceed 100'),
  city: yup.string()
    .required('City is required')
    .min(2, 'City name must be at least 2 characters')
});