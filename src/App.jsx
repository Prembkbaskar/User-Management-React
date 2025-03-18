import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users");
    }
    setLoading(false);
  };

  const addUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/users", { name, email });
      setName("");
      setEmail("");
      fetchUsers();
      setError(null);
    } catch (err) {
      setError("Failed to add user");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        User Management
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={addUser} className="mb-6 space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-600 bg-gray-800 text-white p-3 rounded-lg w-1/2 focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-600 bg-gray-800 text-white p-3 rounded-lg w-1/2 focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add User"}
          </button>
        </div>
      </form>

      <button
        onClick={fetchUsers}
        className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-3 rounded-lg w-full mb-6 transition duration-200"
      >
        Refresh Users
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border border-white border-collapse shadow-lg rounded-lg">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="border border-white p-3">Name</th>
              <th className="border border-white p-3">Email</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="border border-white bg-gray-800 text-white hover:bg-gray-700 transition"
              >
                <td className="border border-white p-3">{user.name}</td>
                <td className="border border-white p-3">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
