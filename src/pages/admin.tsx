import { AdminSchema } from "@/utils/formValidations";
import { db } from "../lib/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";

type Config = {
  step2: string[];
  step3: string[];
};

const Admin = () => {
    const [pageConfig, setPageConfig] = useState<Config>({
        step2: [],
        step3: [],
        });
    useEffect(() => {
        const fetchConfig = async () => {
            const configRef = doc(db, "configs", "pageConfig");
            const configSnap = await getDoc(configRef);
            setPageConfig(configSnap.data() as Config);
            console.log("Config:", configSnap.data());
        };
        fetchConfig();
    }, []);

  const saveConfig = async () => {
    try {
      await setDoc(doc(collection(db, "configs"), "pageConfig"), pageConfig);
        alert("Configuration saved!");
    } catch (error) {
        console.error("Error saving configuration: ", error);
    }
  };

  const handleCheckboxChange = (page: keyof Config, component: string) => {
    setPageConfig((prev) => ({
      ...prev,
      [page]: prev[page].includes(component)
        ? prev[page].filter((c) => c !== component)
        : [...prev[page], component],
    }));
  };

  return (
    <div>
      <div className="flex justify-end bg-slate-500">
      NAV FOR TESTNG PURPOSES
        <Link href={"/"}>
          <div className="bg-green-300 rounded p-5 m-5">Home Page</div>
        </Link>
        <Link href={"/data"}>
          <div className="bg-green-300 rounded p-5 m-5">Data Table Page</div>
        </Link>
        <Link href={"/admin"}>
          <div className="bg-green-300 rounded p-5 m-5">Admin Page</div>
        </Link>
        <Link href={"/step2"}>
          <div className="bg-green-300 rounded p-5 m-5">Step 2 Page</div>
        </Link>
        <Link href={"/step3"}>
          <div className="bg-green-300 rounded p-5 m-5">Step 3 Page</div>
        </Link>
      </div>
    <div className="min-h-screen p-6 flex flex-col justify-center items-center bg-slate-300">
      <div className="bg-green-300 flex flex-col justify-center items-center p-10 roudned">
        <h1 className="text-2xl">Admin Section</h1>
        {/*{(["step2", "step3"] as Array<keyof Config>).map((step) => (
          <div key={step} className="mt-4">
            <h2 className="text-xl">{step}</h2>
            {["aboutMe", "address", "birthdate"].map((component) => (
              <div key={component}>
                <label>
                  <input
                    type="checkbox"
                      checked={pageConfig[step].includes(component)}
                    onChange={() => handleCheckboxChange(step, component)}
                  />
                  {component}
                </label>
              </div>
            ))}
          </div>
        ))}*/}

        <Formik
          initialValues={pageConfig}
          onSubmit={saveConfig}
          validationSchema={AdminSchema}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mt-4">
                <h2 className="text-xl">Step 2</h2>
                {["aboutMe", "address", "birthdate"].map((component) => (
                  <div key={component}>
                    <label>
                      <input
                        type="checkbox"
                        checked={pageConfig["step2"].includes(component)}
                        onChange={() => handleCheckboxChange("step2", component)}
                      />
                      {component}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h2 className="text-xl">Step 3</h2>
                {["aboutMe", "address", "birthdate"].map((component) => (
                  <div key={component}>
                    <label>
                      <input
                        type="checkbox"
                        checked={pageConfig["step3"].includes(component)}
                        onChange={() => handleCheckboxChange("step3", component)}
                      />
                      {component}
                    </label>
                  </div>
                ))}
              </div>

              <button type="submit" className="mt-4 bg-green-500 p-2 rounded">
                Save
              </button>

              {errors.step2 && touched.step2 && (
                <div className="text-red-500">{errors.step2}</div>
              )}
              {errors.step3 && touched.step3 && (
                <div className="text-red-500">{errors.step3}</div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </div>
  );
}

export default Admin;