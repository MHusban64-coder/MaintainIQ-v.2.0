import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoadingSpinner } from '../components/common';
import { AppLayout } from '../layouts/AppLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { AdminRoute, ProtectedRoute, PublicRoute } from './RouteGuards';

const LandingPage = lazy(() => import('../pages/LandingPage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const AssetsPage = lazy(() => import('../pages/assets/AssetsPage'));
const AssetFormPage = lazy(() => import('../pages/assets/AssetFormPage'));
const AssetDetailsPage = lazy(() => import('../pages/assets/AssetDetailsPage'));
const ScannerPage = lazy(() => import('../pages/assets/ScannerPage'));
const MaintenancePage = lazy(() => import('../pages/MaintenancePage'));
const IssuesPage = lazy(() => import('../pages/IssuesPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const AdminPage = lazy(() => import('../pages/AdminPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const LoadPage = ({ children }) => <Suspense fallback={<div className="grid min-h-[55vh] place-items-center text-brand-600"><LoadingSpinner /></div>}>{children}</Suspense>;

export function AppRoutes() { return <Routes><Route path="/" element={<LoadPage><LandingPage /></LoadPage>} /><Route element={<PublicRoute />}><Route element={<AuthLayout />}><Route path="/login" element={<LoadPage><LoginPage /></LoadPage>} /><Route path="/register" element={<LoadPage><RegisterPage /></LoadPage>} /><Route path="/forgot-password" element={<LoadPage><ForgotPasswordPage /></LoadPage>} /></Route></Route><Route element={<ProtectedRoute />}><Route element={<AppLayout />}><Route path="/dashboard" element={<LoadPage><DashboardPage /></LoadPage>} /><Route path="/assets" element={<LoadPage><AssetsPage /></LoadPage>} /><Route path="/assets/new" element={<LoadPage><AssetFormPage /></LoadPage>} /><Route path="/assets/:assetId" element={<LoadPage><AssetDetailsPage /></LoadPage>} /><Route path="/assets/:assetId/edit" element={<LoadPage><AssetFormPage /></LoadPage>} /><Route path="/scanner" element={<LoadPage><ScannerPage /></LoadPage>} /><Route path="/maintenance" element={<LoadPage><MaintenancePage /></LoadPage>} /><Route path="/issues" element={<LoadPage><IssuesPage /></LoadPage>} /><Route path="/profile" element={<LoadPage><ProfilePage /></LoadPage>} /><Route path="/settings" element={<LoadPage><SettingsPage /></LoadPage>} /><Route element={<AdminRoute />}><Route path="/admin" element={<LoadPage><AdminPage /></LoadPage>} /></Route></Route></Route><Route path="*" element={<LoadPage><NotFoundPage /></LoadPage>} /></Routes>; }
