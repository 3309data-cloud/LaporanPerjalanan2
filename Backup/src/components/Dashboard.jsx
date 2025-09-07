export default function Dashboard() {
  const cards = [
    { title: "CPU Traffic", value: "70%", color: "bg-blue-500" },
    { title: "Likes", value: "1,245", color: "bg-pink-500" },
    { title: "Sales", value: "3,200", color: "bg-green-500" },
    { title: "New Members", value: "120", color: "bg-purple-500" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`p-6 text-white rounded-2xl shadow-lg ${card.color}`}
          >
            <p className="text-lg">{card.title}</p>
            <h3 className="text-3xl font-bold mt-2">{card.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
