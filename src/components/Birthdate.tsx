import { Field, FormikErrors, FormikTouched } from "formik";
import { FC } from "react";

interface AboutMeProps {
  errors: FormikErrors<{ aboutMe: string; street: string; city: string; state: string; zip: number; birthdate: string; }>;
  touched: FormikTouched<{ aboutMe: string; street: string; city: string; state: string; zip: number; birthdate: string; }>;
}

const Birthday: FC<AboutMeProps> = ({ errors }) => {
  return (
    <div className="flex flex-col p-5">
        Birthdate 
        <Field name="birthdate"  className="input-field rounded"/>
        {errors?.birthdate && <div className="text-red-500">{errors?.birthdate}</div>}
    </div>
  );
}

export default Birthday;