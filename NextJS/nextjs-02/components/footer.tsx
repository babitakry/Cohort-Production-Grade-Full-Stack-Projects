export default function Footer() {
  return (
    <footer className="w-full mt-auto bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md border-t border-zinc-200/50 dark:border-zinc-800/50 py-6 text-center text-xs text-zinc-500 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-medium">
          &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
        </p>
        <p className="flex items-center gap-1.5 font-semibold text-zinc-400 dark:text-zinc-600">
          <span>Built with</span>
          <span className="text-zinc-600 dark:text-zinc-400">Next.js</span>
          <span>&bull;</span>
          <span className="text-zinc-600 dark:text-zinc-400">Prisma</span>
          <span>&bull;</span>
          <span className="text-zinc-600 dark:text-zinc-400">Tailwind</span>
        </p>
      </div>
    </footer>
  );
}
