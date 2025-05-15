interface Game {
  id: number;
  title: string;
  genre: string;
  creationDate: string;
  image: string;
}

const GameCardItem = ({ game }: { game: Game }) => (
  <div className="bg-transparent shadow-md rounded-lg overflow-hidden col-span-1">
    <img
      src={game.image}
      alt={game.title}
      className="h-48 w-full object-cover"
    />
    <div className="p-4">
      <div className="text-lg font-bold">{game.title}</div>
      <div className="text-gray-600">{game.genre}</div>
      <div className="text-gray-500 text-sm">{game.creationDate}</div>
      <div className="flex justify-end items-center mt-4 space-x-2">
        <button className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600">
          Cyan Button
        </button>
        <button className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
          Pink Button
        </button>
      </div>
    </div>
  </div>
);

export default function GameCard() {
  const games = [
    {
      id: 1,
      title: "The Witcher 3: Wild Hunt",
      genre: "Action RPG",
      creationDate: "2015-05-19",
      image: "app/assets/svg/thewitcher.svg",
    },
    {
      id: 2,
      title: "Game Title 2",
      genre: "Genre 2",
      creationDate: "2023-02-01",
      image: "/path/to/image2.jpg",
    },
    {
      id: 3,
      title: "Game Title 3",
      genre: "Genre 3",
      creationDate: "2023-03-01",
      image: "/path/to/image3.jpg",
    },
    {
      id: 4,
      title: "Game Title 4",
      genre: "Genre 4",
      creationDate: "2023-04-01",
      image: "/path/to/image4.jpg",
    },
    {
      id: 5,
      title: "Game Title 5",
      genre: "Genre 5",
      creationDate: "2023-05-01",
      image: "/path/to/image5.jpg",
    },
    {
      id: 6,
      title: "Game Title 6",
      genre: "Genre 6",
      creationDate: "2023-06-01",
      image: "/path/to/image6.jpg",
    },
    {
      id: 7,
      title: "Game Title 7",
      genre: "Genre 7",
      creationDate: "2023-07-01",
      image: "/path/to/image7.jpg",
    },
    {
      id: 8,
      title: "Game Title 8",
      genre: "Genre 8",
      creationDate: "2023-08-01",
      image: "/path/to/image8.jpg",
    },
    {
      id: 9,
      title: "Game Title 9",
      genre: "Genre 9",
      creationDate: "2023-08-01",
      image: "/path/to/image8.jpg",
    },
  ];

  return (
    <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-40">
      {games.map((game) => (
        <GameCardItem key={game.id} game={game} />
      ))}
    </div>
  );
}
