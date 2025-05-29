import { json, redirect, type ActionFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import { useRef, useState } from "react";
import fs from "fs/promises";
import path from "path";
const BACKGROUND_IMAGE_URL =
  "https://res.cloudinary.com/dh9tcgzao/image/upload/v1747307530/HeroImage_s2h9yz.png";

const prisma = new PrismaClient();

const GENRES = [
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Simulation",
  "Puzzle",
  "Sports",
  "Horror",
  "Platformer",
];

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title") as string | null;
  const description = formData.get("description") as string | null;
  const priceStr = formData.get("price") as string | null;
  const ratingStr = formData.get("rating") as string | null;
  const releaseDateStr = formData.get("releaseDate") as string | null;
  const imageUrl = formData.get("imageUrl") as string | null;
  const genre = formData.get("genre") as string | null;

  if (
    !title ||
    !description ||
    !priceStr ||
    !ratingStr ||
    !releaseDateStr ||
    !genre
  ) {
    return json({ error: "Please fill all required fields" }, { status: 400 });
  }

  const price = parseFloat(priceStr);
  const rating = parseFloat(ratingStr);
  const releaseDate = new Date(releaseDateStr);

  try {
    await prisma.game.create({
      data: {
        title,
        description,
        price,
        rating,
        releaseDate,
        imageUrl: imageUrl || "",
        genre,
      },
    });

    // Update games.json (optional)
    const filePath = path.join(process.cwd(), "prisma", "games.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const games = JSON.parse(fileData);
    games.push({
      title,
      description,
      price,
      rating,
      releaseDate: releaseDate.toISOString(),
      imageUrl,
      genre,
    });
    await fs.writeFile(filePath, JSON.stringify(games, null, 2));

    return redirect("/games");
  } catch (error) {
    console.error("Error adding game:", error);
    return json({ error: "Failed to add game" }, { status: 500 });
  }
};

export default function AddGame() {
  const actionData = useActionData<{ error?: string }>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="flex items-center justify-center bg-transparent min-h-screen"
      style={{
        backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto p-6 text-white max-w-xl">
        <h1 className="text-4xl font-bold mb-4 text-center">Add a New Game</h1>

        {actionData?.error && (
          <p className="text-red-500 mb-4 text-center">{actionData.error}</p>
        )}

        <Form method="post" className="grid gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            className="p-2 rounded bg-gray-800 border border-gray-600"
          />
          <textarea
            name="description"
            placeholder="Description"
            required
            className="p-2 rounded bg-gray-800 border border-gray-600"
          />
          {/* Genre dropdown */}
          <select
            name="genre"
            required
            className="p-2 rounded bg-gray-800 border border-gray-600 text-white"
            defaultValue=""
          >
            <option value="" disabled>
              Select genre
            </option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Price"
            required
            min="0"
            className="p-2 rounded bg-gray-800 border border-gray-600"
          />
          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating (e.g. 4.5)"
            required
            min="0"
            className="p-2 rounded bg-gray-800 border border-gray-600"
          />
          <input
            type="date"
            name="releaseDate"
            required
            className="p-2 rounded bg-gray-800 border border-gray-600"
          />

          <div>
            <button
              type="button"
              className="p-4 rounded bg-gray-800 border border-dashed border-gray-600 min-h-[80px] flex items-center justify-center text-gray-400 cursor-pointer w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              Click to select an image file
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = function (event) {
                    const urlInput = document.getElementById(
                      "imageUrl"
                    ) as HTMLInputElement;
                    if (urlInput && typeof event.target?.result === "string") {
                      urlInput.value = event.target.result;
                      setImagePreview(event.target.result);
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <input type="hidden" name="imageUrl" id="imageUrl" />
            {imagePreview && (
              <div className="mt-4 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-40 rounded border border-gray-600"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded"
          >
            Add Game
          </button>
        </Form>
      </div>
    </div>
  );
}
