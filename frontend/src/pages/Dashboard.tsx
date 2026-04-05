import { useEffect, useState } from "react";
import { getMe } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { username, logout } = useAuth();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getMe()
      .then((res) => setMessage(res.data))
      .catch(() => { logout(); navigate("/login"); });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-center text-white">
        <h1 className="text-3xl font-bold mb-2">👋 Selamat datang, {username}!</h1>
        <p className="text-gray-400 mb-6">{message}</p>
        <button
          onClick={() => { logout(); navigate("/login"); }}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}