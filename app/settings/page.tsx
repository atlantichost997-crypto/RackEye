import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { createClient } from '@/lib/supabase/server';

export default async function SettingsPage() {
  const supabase = await createClient();
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (e) {
    console.error('Auth error:', e);
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">Settings</h1>
        <p className="text-zinc-400 text-sm mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="max-w-3xl space-y-8">
        <section className="bg-black border border-zinc-800 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-lg font-medium text-white">Account Information</h2>
            <p className="text-sm text-zinc-400 mt-1">Your personal account details.</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
              <input 
                type="email" 
                value={user?.email || ''} 
                disabled 
                className="w-full max-w-md px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">User ID</label>
              <input 
                type="text" 
                value={user?.id || ''} 
                disabled 
                className="w-full max-w-md px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400 font-mono text-xs cursor-not-allowed"
              />
            </div>
          </div>
        </section>

        <section className="bg-black border border-zinc-800 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-lg font-medium text-white">API Keys</h2>
            <p className="text-sm text-zinc-400 mt-1">Manage your Coolify API keys.</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Coolify API Token</label>
              <div className="flex gap-3 max-w-md">
                <input 
                  type="password" 
                  value="••••••••••••••••••••••••" 
                  disabled 
                  className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400 cursor-not-allowed"
                />
                <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">
                  Edit
                </button>
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                This token is used to authenticate with your Coolify instance.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
