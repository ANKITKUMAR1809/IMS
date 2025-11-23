import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import Loading from "../components/Loading";
import DeleteIcon from "@mui/icons-material/Delete";

const UpdateStock = () => {
  const { user, items, getStockData, getUserData } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  const [updateData, setUpdateData] = useState({
    stockId: "",
    itemName: "",
    itemCategory: "",
    quantity: "",
    quantityIn: "",
    price: "",
  });

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

  const onClickTr = (id, ic, inm, qi, q, p) => {
    setUpdateData({
      stockId: id,
      itemName: inm,
      itemCategory: ic,
      quantity: q,
      quantityIn: qi,
      price: p,
    });
  };

  const handleOnChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://ims-yxa0.onrender.com/api/stock/update-stock",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        alert("Stock Updated!");
        setUpdateData({
          stockId: "",
          itemName: "",
          itemCategory: "",
          quantity: "",
          quantityIn: "",
          price: "",
        });
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      alert("Server Error!");
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(
        "https://ims-yxa0.onrender.com/api/stock/delete-stock",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );

      if (response.ok) {
        alert("Item deleted! Refresh page.");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      alert("Server Error!");
    }
  };

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
        <p className="text-xl font-semibold text-gray-600">No data available</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-zinc-100 px-4 pb-16">
      <h1 className="text-2xl md:text-4xl font-semibold text-center pt-10">
        Update & Delete Your Items
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

      {/* Update Form */}
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="font-medium text-gray-700">Item Name</label>
            <input
              type="text"
              name="itemName"
              value={updateData.itemName}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Item Category</label>
            <input
              type="text"
              name="itemCategory"
              value={updateData.itemCategory}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={updateData.quantity}
                onChange={handleOnChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="font-medium text-gray-700">Quantity In</label>
              <input
                type="text"
                name="quantityIn"
                value={updateData.quantityIn}
                onChange={handleOnChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={updateData.price}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
          >
            Update
          </button>
        </form>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block mt-12 overflow-x-auto rounded-xl shadow bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200 text-gray-700 sticky top-0">
            <tr>
              <th className="p-4">Item Category</th>
              <th className="p-4">Item Name</th>
              <th className="p-4">Quantity In</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr
                key={item._id}
                onClick={() =>
                  onClickTr(
                    item._id,
                    item.itemCategory,
                    item.itemName,
                    item.quantityIn,
                    item.quantity,
                    item.price
                  )
                }
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-4">{item.itemCategory}</td>
                <td className="p-4">{item.itemName}</td>
                <td className="p-4">{item.quantityIn}</td>
                <td className="p-4">{item.quantity}</td>
                <td
                  className="p-4 text-red-600 hover:text-red-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item._id);
                  }}
                >
                  <DeleteIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden mt-10 space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            onClick={() =>
              onClickTr(
                item._id,
                item.itemCategory,
                item.itemName,
                item.quantityIn,
                item.quantity,
                item.price
              )
            }
            className="bg-white rounded-xl p-4 shadow border border-gray-200"
          >
            <h2 className="text-lg font-semibold">{item.itemName}</h2>
            <p className="text-sm text-gray-500">{item.itemCategory}</p>

            <div className="flex justify-between mt-3 text-sm">
              <span>In: {item.quantityIn}</span>
              <span>Qty: {item.quantity}</span>

              <button
                className="text-red-600 hover:text-red-800"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item._id);
                }}
              >
                <DeleteIcon fontSize="small" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpdateStock;
