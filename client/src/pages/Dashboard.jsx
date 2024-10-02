import React, { useEffect, useState } from 'react';
import './css/Dashboard.css';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

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
        return <section className="dashboard-section">
            <div className='container dashboard'>
                <Loading />
            </div>
        </section>
    }

    // Check if user data is available
    if (!user) {
        return <section className="dashboard-section">
            <div className='container dashboard'>
                <p>Data Not Available, Something Went Wrong Please Login Again</p>
            </div>
        </section>; // Handle data not available case
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
                    <div className="btn" onClick={() => { navigate('update-stock') }}>Update in Stock</div>
                    <div className="btn" onClick={() => { navigate('sell') }}>Sell</div>
                    <div className="btn" onClick={() => { navigate('sell-history') }}>Previous Sells History</div>
                </div>

                <div className="dashboard-alert">
                    <h1>Notification</h1>
                    <h3>Items that are low in Stock</h3>
                    {items && items.map((item) => {
                        return item.quantity < 5 ? <p key={item.itemName}>{item.itemName}</p> : null;
                    })}
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
