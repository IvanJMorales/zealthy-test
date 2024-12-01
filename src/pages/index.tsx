import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import { signUp, signIn, getUserData } from "../lib/auth";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { SignUpSchema } from "../utils/formValidations";
import Link from "next/link";

interface User {
    id: string;
    email: string;
    stepCompleted: number;
    aboutMe?: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    birthdate?: string;
  }

const Home = () => {
    const [isReturning, setIsReturning] = useState(false);
    const [userData, setUserData] = useState<User>();
    const router = useRouter();
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await getUserData(user.uid) as User;
                setUserData(userData);
            }
        });
    }, [auth, router]);

    const handleSubmit = async (values: { email: string; password: string }) => {
        try {
            if (isReturning) {
                await signIn(values.email, values.password);
            } else {
                await signUp(values.email, values.password);
                router.push("/step2");
            }
        } catch (error) {
            console.error("Authentication error: ", error);
        }
    };

    const handleSignOut = async () => {
        await auth.signOut();
        setUserData(undefined);
        router.push("/");
    }

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
            {userData ? (
                <div className="min-h-screen flex flex-col items-center justify-center bg-slate-300">
                    <p className="p-5">Hello, {userData.email}</p>

                    <button
                        onClick={() => {
                            const nextStep = Math.min(userData.stepCompleted + 1, 3);
                            router.push(`/step${nextStep}`);
                          }}
                        className="btn-primary bg-green-300 rounded p-2 m-2"
                    >
                        Continue the Application
                    </button>

                    <button
                        onClick={handleSignOut}
                        className="flex justify-center btn-secondary bg-red-400 rounded p-2 m-2"
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-gray-300">
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={SignUpSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form className="p-5 bg-green-300 rounded">
                                <div className="px-5">
                                    <label>Email</label>
                                    <div>
                                        <Field name="email" type="email" className="input-field rounded" />
                                        {errors.email && touched.email && <p className="text-red-500">{errors.email}</p>}
                                    </div>
                                </div>
                
                                <div className="px-5 mt-5 flex-col justify-center">
                                    <label>Password</label>
                                    <div>
                                        <Field name="password" type="password" className="input-field rounded" />
                                        {errors.password && touched.password && <p className="text-red-500">{errors.password}</p>}
                                    </div>
                                </div>
                
                                <div className="flex items-center space-x-4 justify-center mt-5">
                                    <button type="submit" className="btn-primary bg-blue-400 rounded p-2">
                                        {isReturning ? "Sign In" : "Sign Up"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-secondary bg-purple-400 rounded p-2"
                                        onClick={() => setIsReturning(!isReturning)}
                                    >
                                        {isReturning ? "Switch to Sign Up" : "Switch to Sign In"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}
        </div>
    );
}

export default Home;