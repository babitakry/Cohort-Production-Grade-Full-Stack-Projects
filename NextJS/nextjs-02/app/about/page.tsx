export const revalidate = 3600; // Revalidate page content every hour (ISR)

export default function AboutPage() {
  const features = [
    {
      title: "Task Operations",
      description: "Create, edit, and delete tasks seamlessly with a unified inline flow.",
      icon: (
        <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      bg: "bg-amber-50 dark:bg-amber-950/30 border-amber-200/30 dark:border-amber-800/20"
    },
    {
      title: "Real-time Completion",
      description: "Mark tasks as completed in real time, instantly updating local state and stats.",
      icon: (
        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "bg-blue-50 dark:bg-blue-950/30 border-blue-200/30 dark:border-blue-800/20"
    },
    {
      title: "Server-side Rendering",
      description: "Fast server-side rendering for improved page load speeds and initial paint performance.",
      icon: (
        <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      bg: "bg-violet-50 dark:bg-violet-950/30 border-violet-200/30 dark:border-violet-800/20"
    },
    {
      title: "Modern UI/UX",
      description: "Responsive and modern user interface styled with custom glassmorphism components.",
      icon: (
        <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      bg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200/30 dark:border-emerald-800/20"
    },
    {
      title: "Type-safe Operations",
      description: "Type-safe database operations powered by Prisma Client and strict TypeScript schemas.",
      icon: (
        <svg className="w-5 h-5 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      bg: "bg-rose-50 dark:bg-rose-950/30 border-rose-200/30 dark:border-rose-800/20"
    },
    {
      title: "Secure Data",
      description: "Secure and efficient data management with PostgreSQL backend persistence.",
      icon: (
        <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      bg: "bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200/30 dark:border-cyan-800/20"
    },
  ];

  return (
    <main className="flex-1 min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 mb-3">
            About TaskFlow
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            TaskFlow is a modern full-stack task management application designed to help users organize, track, and manage their daily tasks efficiently. Built with performance, responsiveness, and user experience in mind, it provides a smooth workflow for creating, updating, and completing tasks in real time.
          </p>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            The application leverages modern web technologies to deliver fast server-side rendering, seamless client-side interactions, and reliable data persistence. Users can manage their tasks effortlessly through an intuitive interface while enjoying instant updates and a responsive design across devices.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-6 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-black/5 dark:border-white/5 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${feature.bg}`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
