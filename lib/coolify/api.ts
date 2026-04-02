'use server';

import { revalidatePath } from 'next/cache';

const COOLIFY_API_URL = process.env.COOLIFY_API_URL;
const COOLIFY_API_TOKEN = process.env.COOLIFY_API_TOKEN;

// Mock data for when API is not configured
const MOCK_PROJECTS = [
  {
    uuid: 'proj-1',
    name: 'rackeye-frontend',
    description: 'Next.js dashboard application',
    status: 'running',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    uuid: 'proj-2',
    name: 'rackeye-api',
    description: 'Go backend service',
    status: 'stopped',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    uuid: 'proj-3',
    name: 'landing-page',
    description: 'Marketing website',
    status: 'running',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

const MOCK_DEPLOYMENTS = [
  {
    uuid: 'dep-1',
    status: 'success',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    uuid: 'dep-2',
    status: 'failed',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3500000).toISOString(),
  },
  {
    uuid: 'dep-3',
    status: 'building',
    createdAt: new Date(Date.now() - 120000).toISOString(),
    updatedAt: new Date(Date.now() - 60000).toISOString(),
  }
];

export async function getProjects() {
  if (!COOLIFY_API_URL || !COOLIFY_API_TOKEN) {
    return MOCK_PROJECTS;
  }

  try {
    const res = await fetch(`${COOLIFY_API_URL}/api/v1/projects`, {
      headers: {
        Authorization: `Bearer ${COOLIFY_API_TOKEN}`,
      },
      next: { revalidate: 10 },
    });
    
    if (!res.ok) throw new Error('Failed to fetch projects');
    return await res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return MOCK_PROJECTS; // Fallback to mock on error
  }
}

export async function getProject(uuid: string) {
  if (!COOLIFY_API_URL || !COOLIFY_API_TOKEN) {
    return MOCK_PROJECTS.find(p => p.uuid === uuid) || null;
  }

  try {
    const res = await fetch(`${COOLIFY_API_URL}/api/v1/projects/${uuid}`, {
      headers: {
        Authorization: `Bearer ${COOLIFY_API_TOKEN}`,
      },
      next: { revalidate: 10 },
    });
    
    if (!res.ok) throw new Error('Failed to fetch project');
    return await res.json();
  } catch (error) {
    console.error('Error fetching project:', error);
    return MOCK_PROJECTS.find(p => p.uuid === uuid) || null;
  }
}

export async function getDeployments(projectUuid: string) {
  if (!COOLIFY_API_URL || !COOLIFY_API_TOKEN) {
    return MOCK_DEPLOYMENTS;
  }

  try {
    // Note: Adjust endpoint based on actual Coolify API
    const res = await fetch(`${COOLIFY_API_URL}/api/v1/projects/${projectUuid}/deployments`, {
      headers: {
        Authorization: `Bearer ${COOLIFY_API_TOKEN}`,
      },
      next: { revalidate: 5 },
    });
    
    if (!res.ok) throw new Error('Failed to fetch deployments');
    return await res.json();
  } catch (error) {
    console.error('Error fetching deployments:', error);
    return MOCK_DEPLOYMENTS;
  }
}

export async function createProject(data: { name: string; description?: string }) {
  if (!COOLIFY_API_URL || !COOLIFY_API_TOKEN) {
    // Mock creation
    const newProject = {
      uuid: `proj-${Date.now()}`,
      name: data.name,
      description: data.description || '',
      status: 'stopped',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    MOCK_PROJECTS.unshift(newProject);
    revalidatePath('/');
    return newProject;
  }

  try {
    const res = await fetch(`${COOLIFY_API_URL}/api/v1/projects`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${COOLIFY_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) throw new Error('Failed to create project');
    revalidatePath('/');
    return await res.json();
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export async function triggerDeployment(projectUuid: string) {
  if (!COOLIFY_API_URL || !COOLIFY_API_TOKEN) {
    // Mock deployment
    const newDeployment = {
      uuid: `dep-${Date.now()}`,
      status: 'building',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    MOCK_DEPLOYMENTS.unshift(newDeployment);
    revalidatePath(`/projects/${projectUuid}`);
    return newDeployment;
  }

  try {
    const res = await fetch(`${COOLIFY_API_URL}/api/v1/projects/${projectUuid}/deploy`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${COOLIFY_API_TOKEN}`,
      },
    });
    
    if (!res.ok) throw new Error('Failed to trigger deployment');
    revalidatePath(`/projects/${projectUuid}`);
    return await res.json();
  } catch (error) {
    console.error('Error triggering deployment:', error);
    throw error;
  }
}
