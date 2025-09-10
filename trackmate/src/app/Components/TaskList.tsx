import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditTaskModal from "./EditTaskModal";
import { Task } from "../typs/Task";
import { format } from "date-fns";
import { getStartedDisplay } from "../../../src/app/Shared/utils";

const priorityColor = {
  Low: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-red-100 text-red-800",
};  

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const router = useRouter();

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
          },
        });
  
        if (!res.ok) {
          const errorText = await res.text(); // optional: log error body
          console.error("Server error response:", errorText);
          throw new Error(`Server error: ${res.status}`);
        }
  
        const data = await res.json(); // ✅ Only consume once
        console.log("Fetched tasks:", data);
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };
  
    fetchTasks();
  }, []);
  

//   useEffect(() => {
//     const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
//     setTasks(storedTasks);
//   }, []);
  

//   useEffect(() => {
//     const fetchTasks = async () => {
//       const res = await fetch("/api/Tasks");
//       const data = await res.json();
//       setTasks(data);
//     };
//     fetchTasks();
//   }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesCategory = filter === "All" || task.category === filter;
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const [now, setNow] = useState(new Date());

useEffect(() => {
  const interval = setInterval(() => {
    setNow(new Date());
  }, 60000); // update every minute

  return () => clearInterval(interval);
}, []);

const task = {
  name: "Write report",
  startedAt: "2025-09-09T22:30:00", // ISO format
};

const started = new Date(task.startedAt);

const formattedDate = format(started, "MMMM d, yyyy"); // → September 9, 2025
const formattedTime = format(started, "h:mm a");        // → 10:30 PM

const displayText = `Started on ${formattedDate} at ${formattedTime}`;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div>
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          >
            <option value="All">All Categories</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Fitness">Fitness</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-4">
        {/* Search Box */}
        <input
            type="text"
            placeholder="Search for tasks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        {/* Add Task Button */}
        <button
            onClick={() => router.push("/CreateTask")}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            Add Task
        </button>
</div>

      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Task</th>            
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Priority</th>
            <th className="px-6 py-3">Started At</th>
            <th className="px-6 py-3">End At</th>
            <th className="px-6 py-3">Duration</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
  {filteredTasks.map((task) => {
    const started = task.startedAt ? new Date(task.startedAt) : null;
    const ended = task.endAt ? new Date(task.endAt) : null;

    let timeDisplay = "—";
    if (started && ended) {
      const durationMs = ended.getTime() - started.getTime();
      const hours = Math.floor(durationMs / (1000 * 60 * 60));
      const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
      timeDisplay = `${hours}h ${minutes}m`;
    } else if (started && !ended) {
      const now = new Date();
      const durationMs = now.getTime() - started.getTime();
      const hours = Math.floor(durationMs / (1000 * 60 * 60));
      const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
      timeDisplay = `In progress… ${hours}h ${minutes}m`;
    } else {
      timeDisplay = "Not started";
    }

    return (
      <tr key={task._id?.toString()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{task.name}</td>
        <td className="px-6 py-4">{task.category}</td>
        <td className="px-6 py-4">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityColor[task.priority]}`}>
            {task.priority}
          </span>
        </td>
        {/* <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
          {started ? started.toLocaleString() : "—"}
        </td> */}
        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
          {getStartedDisplay(task.startedAt, task.endAt)}
        </td>


        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
          {ended ? ended.toLocaleString() : "—"}
        </td>
        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
          {timeDisplay}
        </td>
        <td className="px-6 py-4">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              task.status === "Completed"
                ? "bg-green-100 text-green-800"
                : task.status === "In Progress"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {task.status}
          </span>
        </td>
        <td>
        <button onClick={() => setEditingTask(task)} className="text-blue-600 hover:underline">Edit</button>
      </td>

      
      </tr>
    );
  })}
</tbody>

      </table>
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdated={() => fetchTasks()} // refresh list
        />
      )}
    </div>
  );
}
