import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { Bell } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLogIn, getUserData, items } = useAuth();

  // Loading states
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      await getUserData(); // Fetch user data
      setIsLoading(false); // Stop loading when done
    };

    fetchData(); // Call the async function
  }, []);

  // Check if data is still loading
  if (isLoading) {
    return (
      <section className="dashboard-section">
        <div className="container dashboard">
          <Loading />
        </div>
      </section>
    );
  }

  // Check if user data is available
  if (!user) {
    return (
      <section className="dashboard-section">
        <div className="container dashboard">
          <p>Data Not Available, Something Went Wrong Please Login Again</p>
        </div>
      </section>
    ); // Handle data not available case
  }

  return (
    <section className="min-h-screen">
      <div className="w-full bg-white drop-shadow-xl py-4 flex justify-around items-center">
        <h1 className="text-xl font-semibold text-blue-950">{user.shopname}</h1>{" "}
        {/* Render shopname */}
      </div>
      <div className="flex flex-row justify-around ">
        <div className="flex flex-col gap-4 mt-10">
          <div
            className="text-white bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => {
              navigate("addStock");
            }}
          >
            Add Stock
          </div>
          <div
            className="text-white bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => {
              navigate("inventory");
            }}
          >
            Inventory
          </div>
          <div
            className="text-white bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => {
              navigate("update-stock");
            }}
          >
            Update & Delete
          </div>
          <div
            className="text-white bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => {
              navigate("sell");
            }}
          >
            Sell
          </div>
          <div
            className="text-white bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => {
              navigate("sell-history");
            }}
          >
            Previous Sells History
          </div>
        </div>

        <div className="mt-10 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col items-center  p-4">
          <h1 className="text-center py-4 flex justify-center items-center "><Bell className="text-blue-600 "size={26}/></h1>
          <h3 className="text-2xl font-semibold border-b-2 border-black">Low in Stock</h3>
          {items &&
            items.map((item) => {
              return item.quantity < 5 ? (
                <li key={item.itemName} className="text-lg mt-2 ">{item.itemName}</li>
              ) : null;
            })}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
