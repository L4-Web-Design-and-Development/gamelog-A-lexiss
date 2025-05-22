import { PrismaClient } from "@prisma/client";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import GameCard from "~/components/GameCard";
import gameImageFallback from "~/assets/svg/gamelog-logo.svg";

export const meta: MetaFunction = () => {
  return [
    { title: "GameLog" },
    { name: "description", content: "Track your gaming journey with ease." },
  ];
};

export async function loader() {
  const prisma = new PrismaClient();
  const games = await prisma.game.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
  return json({ games });
}

export default function Index() {
  const { games } = useLoaderData<typeof loader>();

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section
        className="w-full h-[50vh] bg-center relative flex flex-col justify-center items-start px-10 md:px-20"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dh9tcgzao/image/upload/v1747307530/HeroImage_s2h9yz.png")`,
        }}
      >
        <div className="z-10">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            Track Your <span className="text-cyan-400">Gaming</span> <br />{" "}
            Journey with Ease
          </h1>
          <button className="border border-cyan-400 text-cyan-300 px-6 py-2 rounded-lg hover:bg-cyan-700 transition">
            Add Game
          </button>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </section>

      {/* Game Card Top */}
      <section className="px-6 md:px-16 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Games</h2>
          <a href="/games" className="text-cyan-400 hover:underline">
            See all →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard
              id={game.id}
              key={game.id}
              imageUrl={game.imageUrl || gameImageFallback}
              title={game.title}
              genre={game.category?.title || "Unknown"}
              creationDate={game.createdAt}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
