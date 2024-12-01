import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
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

const DataTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData: User[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

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
      <div className="mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Data Table</h1>
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Step Completed</th>
              <th className="border border-gray-300 p-2">About Me</th>
              <th className="border border-gray-300 p-2">Street</th>
              <th className="border border-gray-300 p-2">City</th>
              <th className="border border-gray-300 p-2">State</th>
              <th className="border border-gray-300 p-2">Zip</th>
              <th className="border border-gray-300 p-2">Birthdate</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.stepCompleted}</td>
                <td className="border border-gray-300 p-2">{user.aboutMe || "N/A"}</td>
                <td className="border border-gray-300 p-2">{user.street || "N/A"}</td>
                <td className="border border-gray-300 p-2">{user.city || "N/A"}</td>
                <td className="border border-gray-300 p-2">{user.state || "N/A"}</td>
                <td className="border border-gray-300 p-2">{user.zip || "N/A"}</td>
                <td className="border border-gray-300 p-2">{user.birthdate || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;