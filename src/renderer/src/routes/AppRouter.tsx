import { JSX } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import LoginPage from '@renderer/pages/auth/LoginPage';
import { PrivateRoute } from './PrivateRoute';
import HomePage from '@renderer/pages/HomePage';
import TasksPage from '@renderer/pages/TasksPage';
import AppLayout from '@renderer/layouts/AppLayout/AppLayout';
import SettingsPage from '@renderer/pages/settings/SettingsPage';

export default function AppRouter(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
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
