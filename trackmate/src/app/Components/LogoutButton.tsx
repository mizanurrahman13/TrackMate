"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // updates context
    router.push("/login"); // Redirect to login page
    router.refresh(); // reloads layout and nav
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-600 hover:underline me-4 md:me-6"
    >
      Logout
    </button>
  );
}
