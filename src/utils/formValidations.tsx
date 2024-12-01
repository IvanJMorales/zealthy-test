import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password is too short')
      .required('Password is required'),
});

export const AboutMeSchema = Yup.object().shape({
    aboutMe: Yup.string().required('About me is required').max(500, 'About me is too long'),
});

export const Step2Schema  = Yup.object().shape({
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string().required('Zip is required'),
    aboutMe: Yup.string().required('About me is required').max(500, 'About me is too long'),
    birthdate: Yup.string().required('Birthdate is required'),
});

export const AdminSchema = Yup.object().shape({
    step2: Yup.array()
        .min(1, "Page 2 must have at least one component selected.")
        .required("Required"),
    step3: Yup.array()
        .min(1, "Page 3 must have at least one component selected.")
        .required("Required"),
});