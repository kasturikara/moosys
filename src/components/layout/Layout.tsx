import { useStore } from "@/store";
import { Link, Outlet } from "react-router-dom";
import { Button } from "../ui/button";

export function Layout() {
  const { user, setUser } = useStore();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 bg-gray-100 p-4">
        <nav>
          <ul>
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <Link to="/murid">Murid</Link>
            </li>
            <li>
              <Link to="/rekomendasi">Rekomendasi</Link>
            </li>
          </ul>
        </nav>
        {user && (
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="mt-4 w-full"
          >
            Logout
          </Button>
        )}
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
