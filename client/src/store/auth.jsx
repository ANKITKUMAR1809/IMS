import { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext to provide authentication-related state and functions
export const AuthContext = createContext();

// AuthProvider component to wrap the application
export const AuthProvider = ({ children }) => {
  // State variables
  const [sellRecord, setSellRecord] = useState([]); // For sell records
  const [items, setItems] = useState(""); // For stock items
  const [token, setToken] = useState(localStorage.getItem("token")); // Get token from localStorage on page load
  const [user, setUser] = useState(""); // For user data
  const [isLogIn, setIsLogIn] = useState(!!token); // If token exists, consider the user logged in

  // Function to store token and update login state
  const storeToken = (newToken) => {
    setToken(newToken); // Update state
    localStorage.setItem("token", newToken); // Store token in localStorage
    setIsLogIn(!!newToken); // Update login state
  };

  // Function to log out the user
  const Logout = () => {
    setToken(""); // Clear token state
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLogIn(false); // Update login state
  };

  // Effect to run on component mount to restore token and user data
  useEffect(() => {
    const initializeAuth = async () => {
      // If token exists, fetch the user data
      if (token) {
        await getUserData(); // Fetch user data based on token
      }
    };
    initializeAuth(); // Call the async function to initialize authentication state
  }, [token]); // Re-run if token changes

  // Function to fetch user data using the stored token
  const getUserData = async () => {
    try {
      const response = await fetch("/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Use token in Authorization header
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData); // Set user data
        await getStockData(); // Fetch stock data after user data is available
        await getSellRecord(); // Fetch sell records after user data is available
      } else {
        console.log("Failed to fetch user data"); // Handle error in fetching user data
        // Instead of logging out, handle the failure here
      }
    } catch (error) {
      console.log("Error fetching user data:", error); // Handle fetch error
    }
  };

  // Function to fetch sell records
  const getSellRecord = async () => {
    if (!user || !user._id) return; // Ensure user data is present
    const userId = user._id;
    try {
      const response = await fetch("/api/sell/display-sell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // Send userId in the request body
      });
      if (response.ok) {
        const data = await response.json();
        setSellRecord(data.record); // Set sell record data
      } else {
        console.log("No Sell Record found");
      }
    } catch (error) {
      console.log("Error fetching sell records:", error); // Handle error
      alert("Server Error");
    }
  };

  // Function to fetch stock data
  const getStockData = async () => {
    if (!user || !user._id) return; // Ensure user data is present
    const userId = user._id;
    try {
      const response = await fetch("/api/stock/display-stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // Send userId in the request body
      });
      if (response.ok) {
        const data = await response.json();
        setItems(data.items); // Set stock items data
      } else {
        console.log("No Items Found");
      }
    } catch (error) {
      console.log("Error fetching stock data:", error); // Handle error
      alert("Server Error");
    }
  };

  return (
    // Provide authentication-related values and functions to children components
    <AuthContext.Provider
      value={{
        storeToken,
        Logout,
        isLogIn,
        token,
        user,
        getUserData,
        items,
        setItems,
        getStockData,
        sellRecord,
        getSellRecord,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
