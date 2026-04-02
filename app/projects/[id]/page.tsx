import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { getProject, getDeployments } from '@/lib/coolify/api';
import { notFound } from 'next/navigation';
import { DeploymentCard } from '@/components/DeploymentCard';
import { DeployButton } from '@/components/DeployButton';
import { ArrowLeft, Globe, Github } from 'lucide-react';
import Link from 'next/link';
import * as motion from 'motion/react-client';

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);
  
  if (!project) {
    notFound();
  }

  const deployments = await getDeployments(id);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10"
      >
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
            <Globe className="w-8 h-8 text-zinc-400" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-white tracking-tight">{project.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-zinc-400">
              <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                {project.name}.rackeye.app
              </a>
              <div className="flex items-center gap-1.5">
                <Github className="w-4 h-4" />
                main
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-md font-medium text-sm hover:bg-zinc-800 transition-colors">
            Visit
          </button>
          <DeployButton projectUuid={project.uuid} />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-8"
        >
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Recent Deployments</h2>
            <div className="space-y-3">
              {deployments.length === 0 ? (
                <div className="p-8 border border-zinc-800 border-dashed rounded-lg text-center text-zinc-500">
                  No deployments yet.
                </div>
              ) : (
                deployments.map((dep: any) => (
                  <DeploymentCard key={dep.uuid} deployment={dep} />
                ))
              )}
            </div>
          </section>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <section className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-5">
            <h3 className="font-medium text-white mb-4">Environment Variables</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400 font-mono">NEXT_PUBLIC_API_URL</span>
                <span className="text-zinc-500">Encrypted</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400 font-mono">DATABASE_URL</span>
                <span className="text-zinc-500">Encrypted</span>
              </div>
            </div>
            <button className="w-full mt-6 px-4 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">
              Manage Variables
            </button>
          </section>

          <section className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-5">
            <h3 className="font-medium text-white mb-4">Project Details</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-zinc-500">Status</dt>
                <dd className="text-zinc-300 capitalize">{project.status}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">Created</dt>
                <dd className="text-zinc-300">{new Date(project.createdAt).toLocaleDateString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">ID</dt>
                <dd className="text-zinc-300 font-mono text-xs">{project.uuid}</dd>
              </div>
            </dl>
          </section>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

