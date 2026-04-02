'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Navbar() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setEmail(user.email ?? null);
        }
      } catch (e) {
        console.error('Auth error:', e);
      }
    };
    getUser();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="h-16 border-b border-zinc-800 bg-black/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center md:hidden">
        <span className="text-white font-semibold flex items-center gap-2">
          RackEye
        </span>
      </div>
      <div className="hidden md:block">
        {/* Breadcrumbs or page title could go here */}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline-block">{email || 'User'}</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-zinc-400 hover:text-white transition-colors p-2 rounded-md hover:bg-zinc-800/50"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
