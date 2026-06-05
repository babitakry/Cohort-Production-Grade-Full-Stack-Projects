import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center">
      {/* Hero Header Section */}
      <section className="py-16 md:py-24 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center">
        <div className="w-12 h-12 rounded-2xl bg-zinc-950 dark:bg-zinc-50 flex items-center justify-center shadow-lg shadow-black/10 dark:shadow-white/5 mb-8">
          <svg
            className="w-6 h-6 text-white dark:text-black stroke-[2.5]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-none">
          Simplify your day, <br />
          <span className="bg-gradient-to-r from-zinc-800 to-zinc-400 dark:from-zinc-100 dark:to-zinc-500 bg-clip-text text-transparent">
            focus your energy.
          </span>
        </h1>
        <p className="mt-6 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          TaskFlow is a production-grade full-stack task management application designed for speed, beauty, and responsiveness. Take control of your backlog and workflow statistics.
        </p>
        
        {/* Call to Actions */}
        <div className="mt-10 flex justify-center gap-3">
          <Link
            href="/todos"
            className="px-6 py-3.5 rounded-2xl text-sm font-black bg-zinc-950 dark:bg-zinc-50 text-white dark:text-black hover:bg-zinc-900 dark:hover:bg-zinc-200 transition-all shadow-lg shadow-black/5 dark:shadow-white/5"
          >
            Get Started
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3.5 rounded-2xl text-sm font-black bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-800/80 transition-all"
          >
            View Dashboard
          </Link>
        </div>
      </section>

      {/* Mini Feature Highlights */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-zinc-200/50 dark:border-zinc-800/40 w-full">
        {[
          { title: "Task Pipeline", desc: "Manage and update your daily workflow instantly with inline updates." },
          { title: "Real-time Metrics", desc: "View detailed statistics and weekly activity tracking on your dashboard." },
          { title: "Granular Details", desc: "Drill down into individual task metadata, timestamps, and details." },
        ].map((item, idx) => (
          <div key={idx} className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 mb-1">{item.title}</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-200/50 dark:border-zinc-800/40 w-full text-center sm:text-left flex flex-col md:flex-row gap-8 items-center justify-between mt-12">
        <div className="flex-1">
          <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50 mb-4">
            Designed for Focus & Efficiency
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg mb-4">
            TaskFlow is built around the philosophy of minimal friction. Every view is optimized to display only the most critical information, helping you clear your mind and focus on what needs to get done next.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1 text-sm font-bold text-zinc-950 dark:text-zinc-50 hover:underline"
          >
            Learn more about the project
            <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="w-full md:w-80 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-black/5 dark:border-white/5 p-6 rounded-3xl shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-center pb-3 border-b border-zinc-150 dark:border-zinc-800">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Project Stack</span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">Stable</span>
          </div>
          {[
            { label: "Framework", val: "Next.js 15+ (App Router)" },
            { label: "Database", val: "PostgreSQL via Prisma" },
            { label: "Styling", val: "Tailwind CSS v4" },
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm">
              <span className="text-zinc-500">{item.label}</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{item.val}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
