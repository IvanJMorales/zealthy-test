import { Field, Form, Formik, FormikErrors, FormikTouched } from "formik";
import { FC } from "react";

interface AddressProps {
    errors: FormikErrors<{ aboutMe: string; street: string; city: string; state: string; zip: number; birthdate: string; }>;
    touched: FormikTouched<{ aboutMe: string; street: string; city: string; state: string; zip: number; birthdate: string; }>;
}

const Address: FC<AddressProps> = ({ errors }) => {
  return (
    <div className="flex flex-col justify-center p-5">
        <div className="flex flex-col p-2">
            <label>Street Address</label>
            <Field name="street" className="rounded" />
            {errors?.street && <div className="text-red-500">{errors?.street}</div>}
        </div>

        <div className="flex flex-col p-2">
            <label>City</label>
            <Field name="city" className="rounded" />
            {errors?.city && <div className="text-red-500">{errors?.city}</div>}
        </div>

        <div className="flex flex-col p-2">
            <label>State</label>
            <Field name="state" className="rounded" />
            {errors?.state && <div className="text-red-500">{errors?.state}</div>}
        </div>

        <div className="flex flex-col p-2">
            <label>Zip</label>
            <Field name="zip" className="rounded" />
            {errors?.zip && <div className="text-red-500">{errors?.zip}</div>}
        </div>
    </div>
  );
}

export default Address;