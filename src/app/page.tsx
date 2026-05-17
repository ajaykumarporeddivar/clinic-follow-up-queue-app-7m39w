import { Inter } from 'next/font/google';
import Link from 'next/link';
import {
  ClipboardList,
  LayoutDashboard,
  FileText,
  Lock,
  ArrowRight,
  Star,
  ShieldCheck,
  Activity,
  Zap,
} from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Clinic Follow-up Queue — Streamline client follow-ups, boost repeat visits.',
  description:
    'The first generated app provides wellness clinic operators with a structured intake queue, a centralized dashboard to prioritize client follow-ups, and instant ROI reports to boost repeat visits.',
};

export default function HomePage(): JSX.Element {
  return (
    <div className={`relative ${inter.className}`}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-zinc-100 py-4">
        <div className="container mx-auto flex items-center justify-between px-6 md:px-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              CFQ
            </div>
            <span className="font-bold text-xl text-zinc-900">Clinic Follow-up Queue</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="#features" className="text-zinc-600 hover:text-zinc-900 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-zinc-600 hover:text-zinc-900 transition-colors">
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="bg-zinc-900 text-white rounded-lg px-4 py-2 hover:bg-zinc-700 transition-colors flex items-center group"
            >
              Open Dashboard <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <div className="container mx-auto max-w-4xl">
          <span className="inline-flex items-center rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 mb-6">
            <Zap className="h-3 w-3 mr-1" /> AI-Powered Wellness Workflow
          </span>
          <h1 className="font-black text-5xl md:text-7xl tracking-tight leading-none text-white mb-6">
            Never miss a client follow-up again.
          </h1>
          <p className="text-zinc-400 text-xl mt-4 mb-10 max-w-2xl mx-auto">
            Streamline client intake, automate reminders, and boost repeat visits with an intelligent queue system
            designed for wellness clinics.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dashboard"
              className="bg-white text-zinc-900 font-bold rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
            >
              Start Free Today <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/dashboard"
              className="border border-zinc-600 text-zinc-300 rounded-xl px-8 py-4 hover:bg-zinc-800 transition-colors flex items-center justify-center group"
            >
              See It Live <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Hero Visual: CSS-only UI mockup */}
          <div className="relative bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6 max-w-5xl mx-auto mt-16 shadow-2xl overflow-hidden">
            {/* Window controls */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <div className="flex-1 text-center text-zinc-500 text-sm">Clinic Dashboard</div>
            </div>
            {/* UI Content */}
            <div className="flex space-x-4 h-[350px]">
              {/* Sidebar */}
              <div className="w-1/4 bg-zinc-700 rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <div className="h-6 bg-indigo-500 rounded-md w-3/4 mb-4 animate-pulse"></div>
                  <div className="h-4 bg-zinc-600 rounded-md w-full mb-3"></div>
                  <div className="h-4 bg-zinc-600 rounded-md w-5/6 mb-3"></div>
                  <div className="h-4 bg-zinc-600 rounded-md w-3/4 mb-3"></div>
                </div>
                <div className="h-8 bg-zinc-600 rounded-md w-full"></div>
              </div>
              {/* Main content */}
              <div className="flex-1 flex flex-col space-y-4">
                {/* Header / Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="h-20 bg-zinc-700 rounded-lg flex items-center justify-center text-zinc-300 text-sm">
                    <span className="font-bold text-xl text-white mr-2">128</span> Pending
                  </div>
                  <div className="h-20 bg-zinc-700 rounded-lg flex items-center justify-center text-zinc-300 text-sm">
                    <span className="font-bold text-xl text-white mr-2">12</span> Overdue
                  </div>
                  <div className="h-20 bg-zinc-700 rounded-lg flex items-center justify-center text-zinc-300 text-sm">
                    <span className="font-bold text-xl text-white mr-2">56%</span> Conversion
                  </div>
                  <div className="h-20 bg-emerald-600 rounded-lg flex items-center justify-center text-zinc-100 text-sm animate-pulse">
                    <span className="font-bold text-xl text-white mr-2">+$5K</span> This Month
                  </div>
                </div>
                {/* Table/List */}
                <div className="bg-zinc-700 rounded-lg p-4 flex-1">
                  <div className="h-6 bg-zinc-600 rounded-md w-full mb-3"></div>
                  <div className="h-4 bg-zinc-600 rounded-md w-full mb-2"></div>
                  <div className="h-4 bg-zinc-600 rounded-md w-11/12 mb-2"></div>
                  <div className="h-4 bg-zinc-600 rounded-md w-full mb-2"></div>
                  <div className="h-4 bg-zinc-600 rounded-md w-10/12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-zinc-800/30 border-y border-zinc-700/50 py-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-around gap-8 px-6 md:px-8">
          <div className="text-center">
            <p className="font-black text-4xl text-white">100+</p>
            <p className="text-zinc-400 text-sm mt-1">Clinics onboarded</p>
          </div>
          <div className="text-center">
            <p className="font-black text-4xl text-white">99.9%</p>
            <p className="text-zinc-400 text-sm mt-1">Uptime guarantee</p>
          </div>
          <div className="text-center">
            <p className="font-black text-4xl text-white">25,000+</p>
            <p className="text-zinc-400 text-sm mt-1">Follow-ups Managed</p>
          </div>
          <div className="text-center">
            <p className="font-black text-4xl text-white">4.8★</p>
            <p className="text-zinc-400 text-sm mt-1">Overall Rating</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-24 px-6">
        <div className="container mx-auto">
          <h2 className="text-zinc-900 font-black text-4xl text-center mb-4 tracking-tight">
            The 3 workflows that solve missed client follow-ups
          </h2>
          <p className="text-zinc-500 mt-3 text-center max-w-2xl mx-auto mb-16">
            Clinic Follow-up Queue brings clarity and automation to your client journey, ensuring every client feels
            valued and every opportunity is captured.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-zinc-50 rounded-2xl border border-zinc-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 mb-4">
                <ClipboardList className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-zinc-900 text-xl mb-2 tracking-tight">Intake Queue Management</h3>
              <p className="text-zinc-600 mb-4">
                Effortlessly capture new client information, referrals, and requests, transforming raw data into a
                structured queue ready for processing.
              </p>
              <p className="text-zinc-400 text-sm">Pain Point: Turn messy intake into actionable tasks.</p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-zinc-50 rounded-2xl border border-zinc-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-4">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-zinc-900 text-xl mb-2 tracking-tight">Prioritized Follow-up Dashboard</h3>
              <p className="text-zinc-600 mb-4">
                Gain a centralized, real-time overview of all pending follow-ups, prioritizing tasks by urgency and
                value to focus on what matters most.
              </p>
              <p className="text-zinc-400 text-sm">Pain Point: Prioritize high-value client actions instantly.</p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-zinc-50 rounded-2xl border border-zinc-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600 mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-zinc-900 text-xl mb-2 tracking-tight">Automated Client ROI Reports</h3>
              <p className="text-zinc-600 mb-4">
                Generate client-ready reports that highlight the value of your follow-ups, demonstrating client
                retention and improved engagement effortlessly.
              </p>
              <p className="text-zinc-400 text-sm">Pain Point: Prove repeat visit ROI without manual effort.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Locked Roadmap / Selling Points Section */}
      <section className="bg-zinc-950 text-white py-20 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="font-black text-4xl text-white mb-4 tracking-tight">Unlock the full roadmap in one click</h2>
          <p className="text-zinc-400 text-lg mb-12">
            Upgrade to ClinicPro and gain immediate access to advanced automation, team features, and robust analytics
            that will take your clinic&apos;s efficiency to the next level.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                name: 'Intake Automation',
                value: 'Automatically process new client inquiries from various channels.',
              },
              {
                name: 'Queue Automation',
                value: 'Smart routing and task assignment to optimize workflow.',
              },
              {
                name: 'Reporting Automation',
                value: 'Scheduled, custom reports delivered directly to your inbox.',
              },
              {
                name: 'Team Roles & Permissions',
                value: 'Granular access control for your entire clinic staff.',
              },
              {
                name: 'Real Database & Workspaces',
                value: 'Persistent data storage and dedicated workspaces for growth.',
              },
              {
                name: 'Advanced Analytics',
                value: 'Deep insights into client journey, retention, and performance.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-start text-left"
              >
                <Lock className="h-5 w-5 text-zinc-500 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-1">{feature.name}</h3>
                  <p className="text-zinc-400 text-sm">{feature.value}</p>
                  <p className="text-zinc-500 text-xs mt-2">Available after upgrade</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="#pricing"
            className="bg-indigo-600 text-white font-bold rounded-xl px-8 py-4 shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center max-w-sm mx-auto group"
          >
            Unlock Full Roadmap <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-zinc-50 py-24 px-6">
        <div className="container mx-auto">
          <h2 className="text-zinc-900 font-black text-4xl text-center mb-16 tracking-tight">
            How Clinic Follow-up Queue works
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600 text-white font-bold text-2xl mb-4 shadow-md">
                1
              </div>
              <h3 className="font-bold text-zinc-900 text-xl mb-2 tracking-tight">Capture & Queue</h3>
              <p className="text-zinc-600">
                Easily add messy client intake notes and requests from various sources into a unified, structured queue.
              </p>
            </div>

            <ArrowRight className="h-8 w-8 text-zinc-400 rotate-90 md:rotate-0" />

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600 text-white font-bold text-2xl mb-4 shadow-md">
                2
              </div>
              <h3 className="font-bold text-zinc-900 text-xl mb-2 tracking-tight">Prioritize & Act</h3>
              <p className="text-zinc-600">
                The intelligent dashboard automatically prioritizes high-value follow-ups, telling you exactly which
                client needs attention now.
              </p>
            </div>

            <ArrowRight className="h-8 w-8 text-zinc-400 rotate-90 md:rotate-0" />

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600 text-white font-bold text-2xl mb-4 shadow-md">
                3
              </div>
              <h3 className="font-bold text-zinc-900 text-xl mb-2 tracking-tight">Report & Retain</h3>
              <p className="text-zinc-6