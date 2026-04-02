import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProjectCard } from '@/components/ProjectCard';
import { CreateProjectModal } from '@/components/CreateProjectModal';
import { getProjects } from '@/lib/coolify/api';
import { Search } from 'lucide-react';
import * as motion from 'motion/react-client';

export default async function Home() {
  const projects = await getProjects();

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Projects</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage and deploy your applications.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-zinc-700 w-full md:w-64 transition-all"
            />
          </div>
          <CreateProjectModal />
        </div>
      </div>

      {projects.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-zinc-800 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center"
        >
          <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-zinc-800">
            <Search className="w-6 h-6 text-zinc-500" />
          </div>
          <h3 className="text-lg font-medium text-white mb-1">No projects found</h3>
          <p className="text-zinc-400 text-sm mb-6 max-w-sm">
            Get started by creating a new project. You can connect a repository or start from a template.
          </p>
          <CreateProjectModal />
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project: any, index: number) => (
            <motion.div
              key={project.uuid}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
