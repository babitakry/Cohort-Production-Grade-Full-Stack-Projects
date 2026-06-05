import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let todos: any[] = [];
  try {
    todos = await prisma.todo.findMany();
  } catch (error) {
    console.error("Error fetching todos for dashboard:", error);
  }

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Group by day of week for a basic SVG chart (last 7 days)
  const last7Days = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() - idx);
    return {
      date: d,
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      count: 0,
      completedCount: 0,
    };
  }).reverse();

  todos.forEach((todo) => {
    const todoDate = new Date(todo.createdAt);
    const dayMatch = last7Days.find(
      (day) => day.date.toDateString() === todoDate.toDateString()
    );
    if (dayMatch) {
      dayMatch.count += 1;
      if (todo.completed) {
        dayMatch.completedCount += 1;
      }
    }
  });

  const maxTasksInADay = Math.max(...last7Days.map((d) => d.count), 1);

  return (
    <main className="flex-1 min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
            Productivity Analytics
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Real-time insights and statistics on your workflow completion.
          </p>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              label: "Total Tasks",
              value: total,
              color: "text-zinc-900 dark:text-white",
              description: "Lifetime tasks created",
            },
            {
              label: "Completed",
              value: completed,
              color: "text-green-600 dark:text-green-400",
              description: "Tasks marked as done",
            },
            {
              label: "Pending",
              value: pending,
              color: "text-amber-600 dark:text-amber-400",
              description: "Tasks awaiting completion",
            },
            {
              label: "Completion Rate",
              value: `${completionRate}%`,
              color: "text-zinc-950 dark:text-zinc-50",
              description: "Overall task efficiency",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-black/5 dark:border-white/5 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {card.label}
              </p>
              <h2 className={`text-4xl font-extrabold mt-2 ${card.color}`}>
                {card.value}
              </h2>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Charts & Activity Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Activity Chart */}
          <div className="md:col-span-2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-black/5 dark:border-white/5 p-6 rounded-3xl shadow-sm flex flex-col">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              Weekly Task Creation Activity
            </h3>
            <div className="flex-1 flex items-end justify-between h-48 gap-3 pt-4 border-b border-zinc-200 dark:border-zinc-800">
              {last7Days.map((day, idx) => {
                const percent = (day.count / maxTasksInADay) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full flex justify-center items-end h-36">
                      {/* Tooltip */}
                      <span className="absolute -top-7 scale-0 group-hover:scale-100 transition-all bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black text-xs px-2 py-0.5 rounded-md font-bold shadow-md">
                        {day.count} tasks
                      </span>
                      {/* Bar Background */}
                      <div className="w-6 sm:w-8 bg-zinc-100 dark:bg-zinc-800/60 rounded-t-lg h-full absolute bottom-0 left-1/2 -translate-x-1/2" />
                      {/* Bar Fill */}
                      <div
                        style={{ height: `${percent}%` }}
                        className="w-6 sm:w-8 bg-zinc-900 dark:bg-zinc-50 rounded-t-lg transition-all duration-500 origin-bottom absolute bottom-0 left-1/2 -translate-x-1/2 shadow-lg shadow-black/5 dark:shadow-white/5"
                      />
                    </div>
                    <span className="text-xs font-bold text-zinc-500 mt-2 select-none">
                      {day.dayName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Insights List */}
          <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-black/5 dark:border-white/5 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Efficiency Rating
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                Analyzing your current workflow state:
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${completionRate > 75 ? "bg-green-500" : completionRate > 40 ? "bg-amber-500" : "bg-red-500"}`} />
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {completionRate > 75 ? "Excellent Pace" : completionRate > 40 ? "Steady Progress" : "Needs Attention"}
                  </p>
                </div>
                <div className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
                  {completionRate > 75
                    ? "Fantastic! You are clearing tasks quickly. Keep keeping up this great momentum."
                    : completionRate > 40
                    ? "You're making solid progress, but you still have a few tasks remaining. Let's get them checked off!"
                    : "Your pending tasks are stacking up. Try starting with smaller tasks to build completion momentum."}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/80 mt-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500">Active Backlog</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-50">{pending} items</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
