"use client";

import { useAuth } from "./AuthContext";
import LogoutButton from "./LogoutButton";

export default function HeaderNav() {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="hidden md:flex space-x-6">
      {isLoggedIn ? (
        <>        
          <a href="/task-list" className="text-gray-700 dark:text-white">Task List</a>
          <a href="/Task-Calendar" className="text-gray-700 dark:text-white">Task Calendar</a>
          <a href="/ProductivityInsights" className="hover:underline me-4 md:me-6">Chart View Tasks</a>
          <a href="/GoalTracker" className="hover:underline me-4 md:me-6">Goal Tracker</a>
          <LogoutButton />
        </>
      ) : (
        <>
          <a href="/login" className="hover:underline me-4 md:me-6">Login</a>
          <a href="/register" className="hover:underline me-4 md:me-6">Register</a>
        </>
      )}
    </nav>
  );
}
