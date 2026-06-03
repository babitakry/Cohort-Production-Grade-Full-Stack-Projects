"use client";
// import { api } from "~/trpc/server";
import { trpc } from "~/trpc/client";

export default function Home() {
  // const { status } = await api.health.getHealth.query();
  // const { message } = await api.chaicode.query({ email: "babita@example.com" });
  // const { data } = trpc.chaicode.useQuery({ email: "babita@example.com" });

  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center bg-black text-white">
      <div>
        {/* <h1 className="text-3xl">Streamyst - Stream in Style</h1> */}
        {/* <h2>Server Status: {status}</h2> */}
        {/* <h2 className="text-xl">Server Message:{message}</h2> */}
        {/* <h2 className="text-xl">Server Message: {data?.message}</h2> */}
      </div>
    </main>
  );
}
