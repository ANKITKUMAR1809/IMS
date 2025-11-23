import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useAuth } from "../store/auth";

const Inventory = () => {
  const { user, items, getStockData, getUserData } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getUserData();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user && user._id) {
      getStockData();
    }
  }, [user]);

  useEffect(() => {
    if (items && items.length > 0) {
      const filtered = items.filter(
        (item) =>
          item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.itemCategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery, items]);

  if (isLoading) {
    return (
      <section className="flex justify-center items-center min-h-screen">
        <Loading />
      </section>
    );
  }

  if (!items || items.length === 0) {
    return (
      <section className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">
          No Stocks Available in your Inventory.
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-zinc-100 pb-16 px-4">
      <h1 className="text-2xl md:text-4xl font-semibold text-center pt-10">
        Stocks In Your Shop
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mt-8">
        <input
          type="text"
          placeholder="Search by Item Name or Category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block mt-10 overflow-x-auto rounded-xl shadow bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200 text-gray-700 sticky top-0">
            <tr>
              <th className="p-4">Item Category</th>
              <th className="p-4">Item Name</th>
              <th className="p-4">Quantity In</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4">{item.itemCategory}</td>
                <td className="p-4">{item.itemName}</td>
                <td className="p-4">{item.quantityIn}</td>
                <td className="p-4">{item.quantity}</td>
                <td className="p-4">₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden mt-8 space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl p-4 shadow border border-gray-200"
          >
            <p className="text-sm text-gray-500">{item.itemCategory}</p>
            <h2 className="text-lg font-semibold">{item.itemName}</h2>

            <div className="flex justify-between mt-3 text-sm">
              <span className="font-medium text-gray-600">
                In: {item.quantityIn}
              </span>
              <span className="font-medium text-gray-600">
                Qty: {item.quantity}
              </span>
              <span className="font-medium text-blue-600">
                ₹{item.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Inventory;
