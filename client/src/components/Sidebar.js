import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Users, Calendar, Target, Activity, LogOut, UserCheck } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onOpenAuth }) {
  const { user, logoutUser } = useContext(AuthContext);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'matching', label: 'Smart Matching', icon: Users },
    { id: 'sessions', label: 'Sessions & Logs', icon: Calendar },
    { id: 'goals', label: 'Goal Board', icon: Target },
    { id: 'analytics', label: 'Health Analytics', icon: Activity },
  ];

  return (
    <aside className="w-64 bg-[#161F30] border-r border-slate-800 p-5 flex flex-col justify-between h-screen fixed top-0 left-0 z-20">
      <div>
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl border border-emerald-500/30">
            M
          </div>
          <div>
            <h1 className="font-bold text-slate-100 text-lg leading-none">MentorTrack</h1>
            <span className="text-xs text-slate-400">Enterprise Platform</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Anchor */}
      <div className="pt-4 border-t border-slate-800">
        {user ? (
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center border border-emerald-500/30">
                {user.name ? user.name.charAt(0) : 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-slate-100 truncate">{user.name}</p>
                <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 capitalize font-medium">
                  {user.role}
                </span>
              </div>
            </div>
            <button
              onClick={logoutUser}
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-md transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="w-full py-2 px-3 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-400 transition"
          >
            <UserCheck size={16} /> Login / Register
          </button>
        )}
      </div>
    </aside>
  );
}
