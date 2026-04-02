'use client';

import { useState } from 'react';
import { triggerDeployment } from '@/lib/coolify/api';
import { Play, Loader2 } from 'lucide-react';

export function DeployButton({ projectUuid }: { projectUuid: string }) {
  const [loading, setLoading] = useState(false);

  const handleDeploy = async () => {
    setLoading(true);
    try {
      await triggerDeployment(projectUuid);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDeploy}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-md font-medium text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
      Deploy
    </button>
  );
}
