import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, XCircle, Loader2, Clock } from 'lucide-react';

interface Deployment {
  uuid: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export function DeploymentCard({ deployment }: { deployment: Deployment }) {
  const getStatusIcon = () => {
    switch (deployment.status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'building':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-zinc-500" />;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border border-zinc-800 bg-black rounded-lg hover:bg-zinc-900/50 transition-colors">
      <div className="flex items-center gap-4">
        {getStatusIcon()}
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-zinc-200">Production</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-mono">
              {deployment.uuid.substring(0, 7)}
            </span>
          </div>
          <div className="text-sm text-zinc-500 mt-1">
            {deployment.status === 'building' 
              ? 'Deploying...' 
              : `Deployed ${formatDistanceToNow(new Date(deployment.updatedAt), { addSuffix: true })}`}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-zinc-800">
          Logs
        </button>
      </div>
    </div>
  );
}
