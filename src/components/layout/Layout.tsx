import { useStore } from "@/store";
import { Link, Outlet } from "react-router-dom";
import { Button } from "../ui/button";
import { toast } from "sonner";

export function Layout() {
  const { user, setUser } = useStore();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.reload();
      toast.success("Berhasil logout");
    }, 500);
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 p-4 bg-gray-100">
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
            className="w-full mt-4"
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
