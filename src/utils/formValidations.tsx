import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password is too short')
      .required('Password is required'),
});

export const AdminSchema = Yup.object().shape({
    step2: Yup.array()
        .min(1, "Page 2 must have at least one component selected.")
        .required("Required"),
    step3: Yup.array()
        .min(1, "Page 3 must have at least one component selected.")
        .required("Required"),
});