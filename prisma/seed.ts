import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const games = [
    {
      title: "The Legend of Zelda: Breath of the Wild",
      description: "An open-world adventure game set in the kingdom of Hyrule.",
      price: 59.99,
      rating: 4.9,
      releaseDate: new Date("2017-03-03"),
      imageUrl:
        "https://res.cloudinary.com/dh9tcgzao/image/upload/v1747911814/legendofzelda_wlwbin.svg",
    },
    {
      title: "The Witcher 3: Wild Hunt",
      description:
        "An action RPG set in a fantasy world full of monsters and magic.",
      price: 39.99,
      rating: 4.8,
      releaseDate: new Date("2015-05-19"),
      imageUrl:
        "https://res.cloudinary.com/dh9tcgzao/image/upload/v1747307536/thewithcer_kjndpf.svg",
    },
    {
      title: "Red Dead Redemption 2",
      description: "An open-world western adventure game.",
      price: 59.99,
      rating: 4.7,
      releaseDate: new Date("2018-10-26"),
      imageUrl:
        "https://res.cloudinary.com/dh9tcgzao/image/upload/v1747911810/cf9235be-4a59-40a3-98cb-8070c3364906.png",
    },
    {
      title: "God of War",
      description: "An action-adventure game based on Norse mythology.",
      price: 49.99,
      rating: 4.9,
      releaseDate: new Date("2018-04-20"),
      imageUrl:
        "https://res.cloudinary.com/dh9tcgzao/image/upload/v1747911795/a6925943-f9c4-41c1-ac47-7e983f6d9406.png",
    },
    {
      title: "Minecraft",
      description:
        "A sandbox game where players can build and explore their own worlds.",
      price: 26.95,
      rating: 4.8,
      releaseDate: new Date("2011-11-18"),
      imageUrl:
        "https://res.cloudinary.com/dh9tcgzao/image/upload/v1747911782/02a7fa85-678b-44db-bb23-13feb93146d5.png",
    },
    {
      title: "Fortnite",
      description:
        "A battle royale game where players fight to be the last one standing.",
      price: 0.0,
      rating: 4.5,
      releaseDate: new Date("2017-07-25"),
      imageUrl:
        "https://res.cloudinary.com/dh9tcgzao/image/upload/v1747911756/c6e7d79b-6998-493e-85c4-acc7157fd52b.png",
    },
    {
      title: "Cyberpunk 2077",
      description: "An open-world RPG set in a dystopian future.",
      price: 59.99,
      rating: 4.0,
      releaseDate: new Date("2020-12-10"),
      imageUrl:
        "https://res.cloudinary.com/dh9tcgzao/image/upload/v1747911741/531b6e5c-7334-4281-9ad3-e101d021416a.png",
    },
    {
      title: "Among Us",
      description:
        "A multiplayer game where players work together to complete tasks on a spaceship.",
      price: 4.99,
      rating: 4.4,
      releaseDate: new Date("2018-06-15"),
      imageUrl:
        "https://res.cloudinary.com/dh9tcgzao/image/upload/v1747911687/a023d6c1-2207-4507-b83e-59753186c1d7.png",
    },
    {
      title: "Animal Crossing: New Horizons",
      description:
        "A life simulation game where players can build and manage their own island.",
      price: 59.99,
      rating: 4.9,
      releaseDate: new Date("2020-03-20"),
      imageUrl:
        "https://res.cloudinary.com/dh9tcgzao/image/upload/v1747911672/d1bb5593-8cd0-4f02-84e8-a8d9f0673db4.png",
    },
    {
      title: "Hades",
      description:
        "A rogue-like dungeon crawler where players fight their way out of the Underworld.",
      price: 24.99,
      rating: 4.9,
      releaseDate: new Date("2020-09-17"),
      imageUrl:
        "https://res.cloudinary.com/dh9tcgzao/image/upload/v1747911639/97bd91c1-ec34-4364-8048-190d8e72c640.png",
    },
  ];

  for (const game of games) {
    await prisma.game.create({ data: game });
  }

  console.log("👾 Games created successfully");

  const categories = [
    {
      title: "Action",
      description:
        "Games that require quick reflexes and hand-eye coordination.",
    },
    {
      title: "Adventure",
      description: "Games that involve exploration and puzzle-solving.",
    },
    {
      title: "RPG",
      description: "Games that focus on character development and story.",
    },
    {
      title: "Simulation",
      description: "Games that simulate real-world activities or systems.",
    },
    {
      title: "Strategy",
      description: "Games that require strategic thinking and planning.",
    },
    {
      title: "Puzzle",
      description:
        "Games that challenge players with logic and problem-solving.",
    },
    {
      title: "Sports",
      description: "Games that simulate sports or physical activities.",
    },
    {
      title: "Multiplayer",
      description: "Games that can be played with multiple players.",
    },
    {
      title: "Indie",
      description: "Games developed by independent studios or individuals.",
    },
    {
      title: "Horror",
      description: "Games that aim to scare or unsettle players.",
    },
  ];

  for (const category of categories) {
    await prisma.category.create({ data: category });
  }

  console.log("🎮 Categories created successfully");

  console.log("🔗 Linking each game to a category");

  // Fetch games from the database
  const dbGames = await prisma.game.findMany();

  // Fetch categories from the database
  const dbCategories = await prisma.category.findMany();

  // Link each game to a category
  for (const game of dbGames) {
    const category =
      dbCategories[Math.floor(Math.random() * dbCategories.length)];
    await prisma.game.update({
      where: { id: game.id },
      data: { categoryId: category.id },
    });
  }

  console.log("🔗 Games and categories linked successfully");

  console.log("Seed data created successfully");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
