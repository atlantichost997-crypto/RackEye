import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Github, Globe, MoreHorizontal } from 'lucide-react';

interface Project {
  uuid: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export function ProjectCard({ project }: { project: Project }) {
  const isRunning = project.status === 'running';

  return (
    <Link 
      href={`/projects/${project.uuid}`}
      className="block group bg-black border border-zinc-800 rounded-lg p-5 hover:border-zinc-600 transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <Globe className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
          </div>
          <div>
            <h3 className="font-medium text-zinc-100 group-hover:text-white transition-colors">
              {project.name}
            </h3>
            <p className="text-sm text-zinc-500 line-clamp-1">{project.description || 'No description'}</p>
          </div>
        </div>
        <button className="text-zinc-500 hover:text-white p-1 rounded hover:bg-zinc-800 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-4 text-sm mt-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            {isRunning && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isRunning ? 'bg-emerald-500' : 'bg-zinc-600'}`}></span>
          </span>
          <span className="text-zinc-400 capitalize">{project.status}</span>
        </div>
        <div className="text-zinc-600">•</div>
        <div className="flex items-center gap-1.5 text-zinc-400">
          <Github className="w-4 h-4" />
          <span>main</span>
        </div>
        <div className="text-zinc-600">•</div>
        <div className="text-zinc-500">
          {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}
        </div>
      </div>
    </Link>
  );
}
