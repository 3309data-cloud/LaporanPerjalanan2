// src/components/Tables.jsx
export default function Tables() {
  const data = [
    { id: 1, name: "Alexander Pierce", email: "alex@example.com", status: "Active" },
    { id: 2, name: "John Doe", email: "john@example.com", status: "Inactive" },
    { id: 3, name: "Jane Smith", email: "jane@example.com", status: "Active" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Table</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{user.id}</td>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td
                className={`py-2 px-4 border font-semibold ${
                  user.status === "Active" ? "text-green-600" : "text-red-600"
                }`}
              >
                {user.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
