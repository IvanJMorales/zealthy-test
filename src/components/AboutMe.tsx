import { Field, FormikErrors, FormikTouched } from "formik";
import { FC } from "react";

interface AboutMeProps {
    errors: FormikErrors<{ aboutMe: string; street: string; city: string; state: string; zip: number; birthdate: string; }>;
    touched: FormikTouched<{ aboutMe: string; street: string; city: string; state: string; zip: number; birthdate: string; }>;
}

const AboutMe: FC<AboutMeProps> = ({ errors }) => {
    return (
        <div className="flex flex-col p-5">
            <label>About Me</label>
            <Field as="textarea" name="aboutMe" className="rounded w-[800px]" />
            {errors?.aboutMe && <div className="text-red-500">{errors?.aboutMe}</div>}
        </div>
    );
}

export default AboutMe;