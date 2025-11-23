import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

const SellHistory = () => {
  const { user, getUserData, sellRecord, getSellRecord } = useAuth();
  const [loading, setLoading] = useState(true);

  // Load User + Sell Records
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await getUserData();
      await getSellRecord();
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <section className="py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Previous Sales History
        </h1>

        {/* Loading State */}
        {loading && (
          <p className="text-center text-lg font-semibold text-gray-600 py-4">
            Loading data...
          </p>
        )}

        {/* Empty State */}
        {!loading && sellRecord?.length === 0 && (
          <p className="text-center text-lg font-semibold text-gray-600 py-4">
            No sales history available.
          </p>
        )}

        {/* Table */}
        {!loading && sellRecord?.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border text-left">Date</th>
                  <th className="p-3 border text-left">Item Name</th>
                  <th className="p-3 border text-left">Category</th>
                  <th className="p-3 border text-left">Quantity In</th>
                  <th className="p-3 border text-left">Quantity</th>
                </tr>
              </thead>

              <tbody>
                {sellRecord.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="p-3 border">{item.date}</td>
                    <td className="p-3 border">{item.itemName}</td>
                    <td className="p-3 border">{item.itemCategory}</td>
                    <td className="p-3 border">{item.quantityIn}</td>
                    <td className="p-3 border font-semibold">
                      {item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default SellHistory;
