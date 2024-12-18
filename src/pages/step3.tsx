import { useRouter } from "next/router";
import { db } from "../lib/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { getPageConfig } from "@/lib/auth";
import AboutMe from "@/components/AboutMe";
import Address from "@/components/Address";
import Birthdate from "@/components/Birthdate";


const Step2 = () => {
    const router = useRouter();
    const auth = getAuth();
    const [userData, setUserData] = useState<any>(null);

    const [components, setComponents] = useState<string[]>();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);
                setUserData(userSnap.data());
            }
        });
    }, [auth, router]);

    useEffect(() => {
        async function fetchConfig() {
            try {
                const config = await getPageConfig();
                setComponents(config.step3 || []);
            } catch (error) {
                console.error("Error fetching page components:", error);
            }
        }

        fetchConfig();
    }, []);


    const handleSubmit = async (values: any) => {
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { ...values, stepCompleted: 3 });
        }

        router.push("/");
    };

  return (
    <div className="min-h-screen bg-slate-300">
        <h1 className="text-white flex justify-center">Step 3</h1>
        <Formik
            initialValues={{
                aboutMe: userData?.aboutMe ?? "",
                street: userData?.street ?? "",
                city: userData?.city ?? "",
                state: userData?.state ?? "",
                zip: userData?.zip ?? "",
                birthdate: userData?.birthdate ?? "",
            }}
            onSubmit={handleSubmit}
            enableReinitialize
            
        >
            {({ errors, touched }) => (
            <Form className="flex flex-col items-center mx-80 bg-green-300 rounded">
                {components?.map((component) => {
                    switch (component) {
                    case "aboutMe":
                        return <AboutMe key={component} 
                        errors={errors} 
                                        touched={touched}
                        />;
                    case "address":
                        return <Address key={component} 
                        errors={errors} 
                                        touched={touched}/>;
                    case "birthdate":
                        return <Birthdate key={component} 
                        errors={errors} 
                                        touched={touched}/>;
                    default:
                        return null;
                    }
                })}
                <div className="flex">
                <button
                    onClick={() => router.push("/step2")}
                    className="bg-red-700 p-2 rounded m-2"
                >
                    Back
                </button>

                <button type="submit" className="bg-green-700 p-2 rounded m-2">
                    Finish
                </button>
                </div>
            </Form>
            )}
        </Formik>
    </div>
  );
}

export default Step2;