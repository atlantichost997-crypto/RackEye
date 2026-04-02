import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { getProjects, getDeployments } from '@/lib/coolify/api';
import { DeploymentCard } from '@/components/DeploymentCard';
import * as motion from 'motion/react-client';

export default async function DeploymentsPage() {
  const projects = await getProjects();
  
  // Fetch deployments for all projects (mocking this by fetching for the first few)
  // In a real app, you might have a global deployments endpoint
  const allDeployments = [];
  for (const project of projects.slice(0, 3)) {
    const deps = await getDeployments(project.uuid);
    allDeployments.push(...deps.map((d: any) => ({ ...d, projectName: project.name })));
  }

  // Sort by date descending
  allDeployments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">Deployments</h1>
        <p className="text-zinc-400 text-sm mt-1">View all recent deployments across your projects.</p>
      </div>

      <div className="bg-black border border-zinc-800 rounded-lg overflow-hidden">
        <div className="divide-y divide-zinc-800">
          {allDeployments.length === 0 ? (
            <div className="p-8 text-center text-zinc-500">
              No deployments found.
            </div>
          ) : (
            allDeployments.map((dep: any, index: number) => (
              <motion.div 
                key={dep.uuid} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 hover:bg-zinc-900/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{dep.projectName}</span>
                </div>
                <DeploymentCard deployment={dep} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
