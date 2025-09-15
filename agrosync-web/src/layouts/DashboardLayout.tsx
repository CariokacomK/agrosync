import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from '../components/Sidebar';

const DashboardLayout: React.FC = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flexGrow: 1, padding: '20px' }}>
                <Outlet /> 
            </main>
        </div>
    );
};

export default DashboardLayout;