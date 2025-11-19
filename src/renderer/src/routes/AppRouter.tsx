import { JSX } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import AppLayout from '../layouts/AppLayout/AppLayout';
import HomePage from '../pages/HomePage';
import TasksPage from '../pages/TasksPage';
import SettingsPage from '../pages/settings/SettingsPage';

export default function AppRouter(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path={'/auth'}>
          <Route
            path="login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="signup"
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            }
          />
        </Route>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="/tasks">
            <Route
              index
              element={
                <PrivateRoute>
                  <TasksPage />
                </PrivateRoute>
              }
            />
            <Route
              path="new"
              element={
                <PrivateRoute>
                  <div>New Task Page</div>
                </PrivateRoute>
              }
            />
            <Route
              path=":id"
              element={
                <PrivateRoute>
                  <div>Task Detail Page</div>
                </PrivateRoute>
              }
            />
          </Route>
        </Route>
        <Route path="settings">
          <Route
            index
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
        </Route>
        {/* Catch-all: redirect to dashboard if logged in, else login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
