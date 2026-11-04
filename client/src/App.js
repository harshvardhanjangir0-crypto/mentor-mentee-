import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import AuthModal from './components/AuthModal';
import { LayoutDashboard, Users, Calendar, Target, Activity, CheckCircle2, Clock } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 ml-64 p-8">
          {/* Header */}
          <header className="flex items-center justify-between pb-6 mb-8 border-b border-slate-800">
            <div>
              <h1 className="text-2xl font-bold capitalize text-slate-100">{activeTab} View</h1>
              <p className="text-xs text-slate-400">Enterprise Mentor-Mentee Operations Center</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                System Status: Active
              </span>
            </div>
          </header>

          {/* Tab Views */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#161F30] border border-slate-800">
                  <span className="text-xs text-slate-400">Active Mentorship Pairs</span>
                  <div className="text-2xl font-bold text-slate-100 mt-1">42</div>
                </div>
                <div className="p-4 rounded-xl bg-[#161F30] border border-slate-800">
                  <span className="text-xs text-slate-400">Sessions Conducted</span>
                  <div className="text-2xl font-bold text-slate-100 mt-1">128 hrs</div>
                </div>
                <div className="p-4 rounded-xl bg-[#161F30] border border-slate-800">
                  <span className="text-xs text-slate-400">Target Milestones Met</span>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">87%</div>
                </div>
                <div className="p-4 rounded-xl bg-[#161F30] border border-slate-800">
                  <span className="text-xs text-slate-400">Avg Program Rating</span>
                  <div className="text-2xl font-bold text-cyan-400 mt-1">4.9 / 5.0</div>
                </div>
              </div>

              {/* Pair Activity */}
              <div className="p-6 rounded-xl bg-[#161F30] border border-slate-800">
                <h3 className="font-bold text-slate-100 mb-4">Active Mentorship Tracking</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div>
                      <h4 className="font-semibold text-sm text-slate-200">Sarah Jenkins & David Chen</h4>
                      <p className="text-xs text-slate-400">System Architecture & Microservices</p>
                    </div>
                    <span className="px-2.5 py-1 rounded text-xs bg-emerald-500/20 text-emerald-400 font-medium">
                      On Track
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div>
                      <h4 className="font-semibold text-sm text-slate-200">Elena Rostova & Michael Scott</h4>
                      <p className="text-xs text-slate-400">Leadership & Team Management</p>
                    </div>
                    <span className="px-2.5 py-1 rounded text-xs bg-amber-500/20 text-amber-400 font-medium">
                      Meeting Nudge Needed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'matching' && (
            <div className="p-6 rounded-xl bg-[#161F30] border border-slate-800">
              <h3 className="font-bold text-slate-100 mb-2">Smart Algorithmic Matching</h3>
              <p className="text-xs text-slate-400 mb-4">Pairs generated based on skill gaps, capacity, and goals.</p>
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-sm">
                <p className="text-emerald-400 font-bold mb-1">94% Compatibility Match</p>
                <p className="text-slate-300">Mentor: Dr. Sarah Jenkins (Node.js, Docker, System Design)</p>
                <p className="text-slate-400 text-xs mt-1">Mentee Target: Master Backend Architecture in Q3</p>
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="p-6 rounded-xl bg-[#161F30] border border-slate-800">
              <h3 className="font-bold text-slate-100 mb-4">Session & Agenda Logs</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm text-slate-200">Architecture Review & Goal Check</h4>
                    <p className="text-xs text-slate-400">Scheduled: Oct 28, 2026 • 45 Mins</p>
                  </div>
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs font-semibold">Scheduled</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'goals' && (
            <div className="p-6 rounded-xl bg-[#161F30] border border-slate-800">
              <h3 className="font-bold text-slate-100 mb-4">Mentee Target Board</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-xs font-bold text-amber-400 block mb-2">In Progress</span>
                  <p className="font-semibold text-sm">Build Distributed Queue System</p>
                  <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                    <div className="bg-emerald-500 h-full w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="p-6 rounded-xl bg-[#161F30] border border-slate-800">
              <h3 className="font-bold text-slate-100 mb-2">Program Health Analytics</h3>
              <p className="text-xs text-slate-400">Bi-directional feedback and 30/60/90 day engagement metrics.</p>
            </div>
          )}
        </main>

        {/* Auth Modal Component */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
        />
      </div>
    </AuthProvider>
  );
}
