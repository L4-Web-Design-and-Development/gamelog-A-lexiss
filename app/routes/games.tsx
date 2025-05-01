export default function AddGame() {
  return (
    <div className="container mx-auto py-20">
      <h1 className="text-6xl font-bold text-center">
        {[
          <span key="1" className="p-2 text-pink-500">
            Add
          </span>,
          <span key="2" className="p-2 text-cyan-500">
            Game
          </span>,
        ]}
      </h1>
    </div>
  );
}
