import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [time, setTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const [motivasi, setMotivasi] = useState("");

  const daftarMotivasi = [
    "Terus belajar, jangan menyerah!",
    "Sukses berawal dari langkah kecil.",
    "Jalani hari ini dengan penuh semangat!",
    "Setiap usaha pasti membuahkan hasil.",
    "Kamu lebih hebat dari yang kamu kira.",
  ];

  // Greeting otomatis
  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Selamat Pagi! ☀️";
    if (hour < 18) return "Selamat Siang! 🌤️";
    return "Selamat Malam! 🌙";
  };

  // Ambil pesan dari backend
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  // Update jam realtime
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setMotivasi(
      daftarMotivasi[Math.floor(Math.random() * daftarMotivasi.length)]
    );
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // ✅ handleLogout sesuai instruksi: hapus token lalu redirect
  const handleLogout = () => {
    localStorage.removeItem("token"); // hanya menghapus token
    navigate("/login"); // redirect ke login
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50"
      } min-h-screen p-6 transition`}
    >
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-7 transition">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <div className="flex gap-3">
            <button
              onClick={toggleDarkMode}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Greeting */}
        <p className="mt-2 text-lg font-medium">{getGreeting()}</p>

        {/* Jam realtime */}
        <p className="text-gray-600 dark:text-gray-300">
          Sekarang pukul:
          <span className="font-semibold ml-1">
            {time.toLocaleTimeString()}
          </span>
        </p>

        {/* Motivasi */}
        <p className="mt-3 text-blue-600 dark:text-blue-300 font-semibold italic">
          "{motivasi}"
        </p>

        {/* Pesan backend */}
        <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg shadow">
          <p className="text-gray-700 dark:text-gray-200">
            Pesan dari server backend:{" "}
            <span className="font-bold">{message}</span>
          </p>
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">
          <div className="bg-blue-500 text-white p-5 rounded-lg shadow-lg text-center hover:scale-105 transition cursor-pointer">
            <h3 className="text-xl font-bold">Presensi</h3>
          </div>

          <div className="bg-green-500 text-white p-5 rounded-lg shadow-lg text-center hover:scale-105 transition cursor-pointer">
            <h3 className="text-xl font-bold">Laporan</h3>
          </div>

          <div className="bg-yellow-500 text-white p-5 rounded-lg shadow-lg text-center hover:scale-105 transition cursor-pointer">
            <h3 className="text-xl font-bold">Data User</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
