import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Login } from "./pages";
import { useEffect } from "react";
import { useStore } from "./store";

const App = () => {
  const { setUser } = useStore();
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // If no user is logged in, redirect to login
  if (!storedUser) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Get user role from stored user data
  const userRole = storedUser.role;

  return (
    <Routes>
      {/* Admin Routes */}
      {userRole === "admin" && (
        <Route element={<Layout />}>
          <Route path="/" element={<>Dashboard Admin</>} />
          <Route path="/murid" element={<>Manajemen Murid</>} />
          <Route path="/rekomendasi" element={<>Rekomendasi</>} />
          <Route path="/pengaturan" element={<>Pengaturan Admin</>} />
        </Route>
      )}

      {/* Teacher Routes */}
      {userRole === "guru" && (
        <Route element={<Layout />}>
          <Route path="/" element={<>Dashboard Guru</>} />
          <Route path="/murid" element={<>Daftar Murid</>} />
          <Route path="/rekomendasi" element={<>Lihat Rekomendasi</>} />
        </Route>
      )}

      {/* Student Routes */}
      {userRole === "siswa" && (
        <Route element={<Layout />}>
          <Route path="/" element={<>Profil Siswa</>} />
          <Route path="/hasil" element={<>Hasil Rekomendasi</>} />
        </Route>
      )}

      {/* Catch all - redirect to appropriate homepage based on role */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
