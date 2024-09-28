import React, { useEffect, useState } from 'react';
import './css/Dashboard.css';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';

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
        return <p>Loading...</p>; // Show loading text or spinner
    }

    // Check if user data is available
    if (!user) {
        return <p>Data not available</p>; // Handle data not available case
    }

    return (
        <section className="dashboard-section">
            <div className='container dashboard'>
                <div>
                    <h1>{user.shopname}</h1> {/* Render shopname */}
                </div>

                <div className='dashboard-btn'>
                    <div className="btn" onClick={() => { navigate('addStock') }}>Add Stock</div>
                    <div className="btn" onClick={() => { navigate('inventory') }}>Inventory</div>
                    <div className="btn" onClick={() => { navigate('sell') }}>Sell</div>
                    <div className="btn" onClick={() => { navigate('sell-history') }}>Previous Sells History</div>
                </div>

                <div className="dashboard-alert">
                    <h1>Notification</h1>
                    <p>Items that are low in Stock</p>
                    {items && items.map((item) => {
                        return item.quantity < 5 ? <p key={item.itemName}>{item.itemName}</p> : null;
                    })}
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
