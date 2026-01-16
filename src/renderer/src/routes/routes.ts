// src/routes/routes.ts
export const ROUTES = {
  ROOT: '/',
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup'
  },

  WORKSPACES: {
    ROOT: '/workspaces',
    NEW: (workspaceId: string | ':workspaceId' = ':workspaceId') =>
      `/workspaces/${workspaceId}/new`,
    WORKSPACE: (workspaceId: string | ':workspaceId' = ':workspaceId') =>
      `/workspaces/${workspaceId}`,
    DASHBOARD: (workspaceId: string | ':workspaceId' = ':workspaceId') =>
      `/workspaces/${workspaceId}/dashboard`,

    TASKS: {
      ROOT: (workspaceId: string | ':workspaceId' = ':workspaceId') =>
        `/workspaces/${workspaceId}/tasks`,
      NEW: (workspaceId: string | ':workspaceId' = ':workspaceId') =>
        `/workspaces/${workspaceId}/tasks/new`,
      DETAILS: (
        workspaceId: string | ':workspaceId' = ':workspaceId',
        taskId: string | ':taskId' = ':taskId'
      ) => `/workspaces/${workspaceId}/tasks/${taskId}`
    },

    PROJECTS: {
      ROOT: (workspaceId: string | ':workspaceId' = ':workspaceId') =>
        `/workspaces/${workspaceId}/projects`,
      NEW: (workspaceId: string | ':workspaceId' = ':workspaceId') =>
        `/workspaces/${workspaceId}/projects/new`,
      DETAILS: (
        workspaceId: string | ':workspaceId' = ':workspaceId',
        projectId: string | ':projectId' = ':projectId'
      ) => `/workspaces/${workspaceId}/projects/${projectId}`
    },

    TAGS: {
      ROOT: (workspaceId: string | ':workspaceId' = ':workspaceId') =>
        `/workspaces/${workspaceId}/tags`
    },

    SETTINGS: (workspaceId: string | ':workspaceId' = ':workspaceId') =>
      `/workspaces/${workspaceId}/settings`
  }
} as const;
