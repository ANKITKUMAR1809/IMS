import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { Bell } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, getUserData, items } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await getUserData();
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Loading UI
  if (isLoading) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <Loading />
      </section>
    );
  }

  if (!user) {
    return (
      <section className="min-h-screen flex justify-center items-center text-xl">
        <p className="text-red-600 font-semibold">
          Something went wrong. Please login again.
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <div className="w-full bg-white shadow-md py-4 px-5">
        <h1 className="text-2xl font-bold text-blue-900 text-center">
          {user.shopname}
        </h1>
      </div>

      <div className="flex flex-wrap justify-center lg:justify-around gap-10 p-6">

        {/* LEFT Buttons Section */}
        <div className="flex flex-col gap-4 mt-6 w-full max-w-xs">

          {[
            { label: "Add Stock", link: "addStock" },
            { label: "Inventory", link: "inventory" },
            { label: "Update & Delete", link: "update-stock" },
            { label: "Sell Items", link: "sell" },
            { label: "Previous Sell History", link: "sell-history" },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={() => navigate(btn.link)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-3 w-full shadow-md transition-all hover:scale-[1.02]"
            >
              {btn.label}
            </button>
          ))}

        </div>

        {/* RIGHT - Low Stock Card */}
        <div className="mt-6 w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-md p-6">
          <div className="flex justify-center items-center">
            <Bell size={30} className="text-blue-600" />
          </div>

          <h3 className="text-2xl font-bold text-center mt-3 pb-2 border-b-2 border-gray-300">
            Low in Stock
          </h3>

          <ul className="mt-4 space-y-2 text-lg text-gray-700 font-medium">
            {items &&
              items.filter((it) => it.quantity < 5).length > 0 ? (
              items
                .filter((it) => it.quantity < 5)
                .map((item) => (
                  <li key={item._id} className="bg-red-50 border border-red-200 rounded-md p-2 text-center text-red-700">
                    {item.itemName} — <span className="font-bold">{item.quantity}</span>
                  </li>
                ))
            ) : (
              <p className="text-center text-gray-500">No low-stock items 🎉</p>
            )}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default Dashboard;
