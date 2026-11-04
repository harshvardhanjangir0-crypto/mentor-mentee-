import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { X, KeyRound, Mail, User, Briefcase, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { loginUser } = useContext(AuthContext);
  const [tab, setTab] = useState('otp-login'); // 'otp-login' | 'register'
  const [step, setStep] = useState(1); // 1: Email, 2: OTP Entry
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('mentee');
  const [title, setTitle] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockOtp);
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp === generatedOtp || enteredOtp === '123456') {
      loginUser({
        name: name || email.split('@')[0],
        email,
        role,
        title: title || (role === 'mentor' ? 'Senior Technical Specialist' : 'Junior Developer')
      });
      onClose();
    } else {
      alert('Invalid OTP code. Use: ' + generatedOtp);
    }
  };

  const quickDemo = (selectedRole) => {
    const demos = {
      mentor: { name: 'Dr. Sarah Jenkins', role: 'mentor', title: 'VP of Engineering', email: 'sarah@tech.io' },
      mentee: { name: 'David Chen', role: 'mentee', title: 'Full Stack Trainee', email: 'david@tech.io' },
      admin: { name: 'Admin Portal', role: 'admin', title: 'Program Manager', email: 'admin@tech.io' }
    };
    loginUser(demos[selectedRole]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#161F30] border border-slate-800 rounded-2xl p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 p-1"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-100">Welcome to MentorTrack</h2>
          <p className="text-xs text-slate-400">OTP Authenticated Access System</p>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-slate-900 p-1 rounded-xl mb-6 border border-slate-800">
          <button
            onClick={() => { setTab('otp-login'); setStep(1); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
              tab === 'otp-login' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            OTP Login
          </button>
          <button
            onClick={() => { setTab('register'); setStep(1); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
              tab === 'register' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            Register Profile
          </button>
        </div>

        {/* Form Body */}
        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            {tab === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="mentee">Mentee (Seeking Guidance)</option>
                    <option value="mentor">Mentor (Offering Guidance)</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              Request OTP Code <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            {generatedOtp && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-center">
                <span className="text-xs text-emerald-400 block font-medium">Demo OTP Generated:</span>
                <span className="text-xl font-mono font-bold text-emerald-300 tracking-wider">{generatedOtp}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2 text-center">
                Enter 6-Digit OTP Sent to {email}
              </label>
              <div className="flex justify-center gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-10 h-12 text-center text-lg font-bold rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 focus:border-emerald-500 focus:outline-none"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition"
            >
              Verify & Complete Access
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-xs text-slate-400 hover:text-slate-200"
            >
              ← Back to Email Step
            </button>
          </form>
        )}

        {/* Demo Fast Logins */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 mb-2">1-Click Fast Demo Logins:</p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => quickDemo('mentor')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700"
            >
              Mentor
            </button>
            <button
              onClick={() => quickDemo('mentee')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700"
            >
              Mentee
            </button>
            <button
              onClick={() => quickDemo('admin')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
