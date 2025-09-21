import { useState } from "react";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext"; // adjust path


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { login } = useAuth(); // get login function from context


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    handleLogin();
  };

const handleLogin = async () => {
  const res = await fetch("/api/auth/Login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("token", data.token); // optional
    login();               // ✅ update global login state
    router.push("/task-list");
    router.refresh();      // ✅ reload layout and nav
  } else {
    alert("Invalid credentials");
  }
};

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your email
        </label>
        <div className="relative">
          <EnvelopeIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="dash@gmail.com"
            required
          />
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your password
        </label>
        <div className="relative">
          <LockClosedIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex items-start mb-5">
        <input
          id="remember"
          type="checkbox"
          className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600"
        />
        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Remember me
        </label>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}

