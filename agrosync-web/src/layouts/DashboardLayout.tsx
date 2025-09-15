import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from '../components/Sidebar';

const DashboardLayout: React.FC = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Sidebar />
            <main style={{ flexGrow: 1, padding: '20px', display: 'flex',flexDirection: 'column' }}>
                <Outlet /> 
            </main>
        </div>
    );
};

export default DashboardLayout;