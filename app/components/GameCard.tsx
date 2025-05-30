import { Form } from "@remix-run/react";

interface GameCardProps {
  id: string;
  imageUrl?: string;
  title: string;
  genre: string;
  creationDate: string;
}

const GameCard = ({
  id,
  imageUrl,
  title,
  genre,
  creationDate,
}: GameCardProps) => (
  <div className="bg-transparent shadow-md rounded-lg overflow-hidden col-span-1 text-left">
    <img src={imageUrl} alt={title} className="h-64 w-full object-cover" />
    <div className="p-4">
      <div className="text-white text-lg font-semibold mb-1">{title}</div>
      <div className="text-gray-400 text-sm">{genre}</div>
      <div className="text-gray-500 text-xs mt-1">{creationDate}</div>

      <div className="flex justify-end mt-4 space-x-2">
        <div className="flex flex-col space-y-2">
          <button className="px-2 py-1 text-xs border border-cyan-600 text-cyan-600 bg-transparent rounded-md hover:bg-cyan-50 transition">
            Edit
          </button>
          <Form method="post">
            <input type="hidden" name="intent" value="delete" />
            <input type="hidden" name="gameId" value={id} />
            <button
              type="submit"
              className="px-2 py-1 text-xs border border-pink-600 text-pink-600 bg-transparent rounded-md hover:bg-cyan-50 transition"
            >
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  </div>
);

export default GameCard;
