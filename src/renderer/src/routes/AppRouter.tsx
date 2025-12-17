import { JSX } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import AppLayout from '@/layouts/AppLayout/AppLayout';
import LoginPage from '@/pages/Auth/Login/LoginPage';
import SignupPage from '@/pages/Auth/Signup/SignupPage';
import HomePage from '@/pages/HomePage';
import NewProjectsPage from '@/pages/Projects/New/NewProjectsPage';
import ProjectsPage from '@/pages/Projects/ProjectsPage';
import SettingsPage from '@/pages/Settings/SettingsPage';
import TaskDetailsPage from '@/pages/Tasks/Details/TaskDetailsPage';
import NewTasksPage from '@/pages/Tasks/New/NewTasksPage';
import TasksPage from '@/pages/Tasks/TasksPage';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export default function AppRouter(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route element={<PublicRoute />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
        </Route>

        {/* ---------- PRIVATE (APP) ROUTES ---------- */}
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            {/* Dashboard / home */}
            <Route index element={<HomePage />} />

            {/* Tasks */}
            <Route path="tasks">
              <Route index element={<TasksPage />} />
              <Route path="new" element={<NewTasksPage />} />
              <Route path=":id" element={<TaskDetailsPage />} />
            </Route>

            {/* Projects */}
            <Route path="projects">
              <Route index element={<ProjectsPage />} />
              <Route path="new" element={<NewProjectsPage />} />
              <Route path=":id" element={<div>Project Detail Page</div>} />
            </Route>

            {/* Settings */}
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
