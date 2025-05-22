interface GameCardProps {
  id: string;
  imageUrl?: string;
  title: string;
  genre: string;
  creationDate: string;
}

const GameCard = ({ imageUrl, title, genre, creationDate }: GameCardProps) => (
  <div className="bg-transparent shadow-md rounded-lg overflow-hidden col-span-1">
    <img src={imageUrl} alt={title} className="h-48 w-full object-cover" />
    <div className="p-4">
      <div className="text-white text-lg font-semibold mb-1">{title}</div>
      <div className="text-gray-400 text-sm">{genre}</div>
      <div className="text-gray-500 text-xs mt-1">{creationDate}</div>
      <div className="flex justify-end items-center mt-4 space-x-2">
        <button className="px-3 py-1.5 text-sm bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition">
          Edit
        </button>
        <button className="px-3 py-1.5 text-sm bg-pink-600 text-white rounded-md hover:bg-pink-700 transition">
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default GameCard;
