import { PrismaClient } from "@prisma/client";
import {
  json,
  redirect,
  type MetaFunction,
  type ActionFunctionArgs,
} from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
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
  await prisma.$disconnect();
  return json({ games });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const gameId = formData.get("gameId") as string;

  if (intent === "delete" && gameId) {
    const prisma = new PrismaClient();
    try {
      await prisma.game.delete({ where: { id: gameId } });
      return redirect("/");
    } catch (error) {
      console.error("Delete failed:", error);
      return json({ error: "Failed to delete game" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }

  return null;
}

export default function Index() {
  const { games } = useLoaderData<typeof loader>();

  return (
    <main className="text-white min-h-screen">
      {/* Hero Section */}
      <section
        className="w-full bg-center bg-no-repeat bg-cover relative flex flex-col justify-center items-start px-10 md:px-20"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dh9tcgzao/image/upload/v1747307530/HeroImage_s2h9yz.png")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "",
          minHeight: "1000px",
        }}
      >
        <div className="z-10 p-6 rounded-lg">
          <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-6">
            Track Your
            <br />
            <span className="text-cyan-400">Gaming</span>
            <br />
            Journey with
            <br />
            Ease
          </h1>
          <a
            href="/games"
            className="inline-block border border-cyan-400 text-cyan-300 px-8 py-3 text-lg md:px-20 md:py-3 md:text-2xl lg:px-40 lg:text-2xl xl:px-60 rounded-lg hover:bg-cyan-700 transition text-center"
          >
            Add Game
          </a>
        </div>
        <div className="absolute inset-0 bg-opacity-50" />
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
            <div key={game.id} className="relative">
              <GameCard
                id={game.id}
                imageUrl={game.imageUrl || gameImageFallback}
                title={game.title}
                genre={game.category?.title || "Unknown"}
                creationDate={new Date(game.createdAt).toLocaleDateString()}
              />
              <Form method="post" className="absolute top-4 right-4">
                <input type="hidden" name="intent" value="delete" />
                <input type="hidden" name="gameId" value={game.id} />
              </Form>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
