import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage.tsx";
import TeacherList from "./components/TeacherList";
import TeacherProfile from "./components/TeacherProfile";
import { useState } from "react";


export default function App() {
  const [darkMode, setDarkMode] = useState(false); // ✅ Add this

  return (
    <div className={`min-h-screen`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teachers" element={<TeacherList />} />
            <Route path="/teacher/:id" element={<TeacherProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}