import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SoilTesting from './pages/SoilTesting';
import PestDetection from './pages/PestDetection';
import CropAdvisory from './pages/CropAdvisory';
import MarketPrices from './pages/MarketPrices';
import GovernmentSchemes from './pages/GovernmentSchemes';
import AdminDashboard from './pages/AdminDashboard';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin-dashboard"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/soil-testing"
                        element={
                            <ProtectedRoute>
                                <SoilTesting />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/pest-detection"
                        element={
                            <ProtectedRoute>
                                <PestDetection />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/crop-advisory"
                        element={
                            <ProtectedRoute>
                                <CropAdvisory />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/market-prices"
                        element={
                            <ProtectedRoute>
                                <MarketPrices />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/schemes"
                        element={
                            <ProtectedRoute>
                                <GovernmentSchemes />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
