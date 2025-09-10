import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const staticTasks = [
    {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
        ,
        name: "Write reporttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
        category: "Work",
        priority: "High",
        status: "Yet to start",
        description:
          "Prepare the quarterly financial report including revenue breakdown, expense analysis, and projections for the next quarter. Ensure all figures are verified and sources cited."
      },
      {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: "Read textbook",
        category: "Study",
        priority: "Medium",
        status: "In Progress",
        description:
          "Read chapters 4 through 7 of the economics textbook and summarize key concepts related to market structures, supply and demand, and fiscal policy."
      },
      {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: "Gym session",
        category: "Fitness",
        priority: "Low",
        status: "Complete",
        description:
          "Complete a 60-minute workout focusing on cardio and core strength. Include warm-up, HIIT intervals, and cooldown stretches."
      }
  ];  

export default function CreateTaskForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Yet to start");
  const [startedAt, setStartedAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const router = useRouter();

// const handleSubmit = (e: React.FormEvent) => {
//   e.preventDefault();

//   if (name.length > 100 || description.length > 300) {
//     alert("Name or description exceeds character limit.");
//     return;
//   }

//   const newTask = {
//     id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
//     name,
//     description,
//     category,
//     priority,
//     status,
//   };

//   try {
//     const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
//     const updatedTasks = [...storedTasks, newTask];
//     localStorage.setItem("tasks", JSON.stringify(updatedTasks));


//     alert("Task created and saved!");

//     // Reset form
//     setName("");
//     setDescription("");
//     setCategory("");
//     setPriority("Medium");
//     setStatus("Yet to start");

//     // Redirect to task list
//     router.push("/task-list");
//   } catch (err) {
//     console.error("Error saving task:", err);
//     alert("Something went wrong.");
//   }
// }; 
  
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (name.length > 100 || description.length > 300) {
      alert("Name or description exceeds character limit.");
      return;
    }
  
    const newTask = {
      //id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name,
      description,
      category,
      priority,
      status,
      startedAt,
      endAt
    };
  
    try {
      const res = await fetch("/api/tasks/CreateTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Write report",
          description: "Finish quarterly summary",
          category: "Work",
          priority: "High",
          status: "Yet to start",
          startedAt: new Date().toISOString(),
          endAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour later
        }),
      });
      
  
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create task");
      }
  
      alert("Task created and saved to database!");
  
      // Reset form
      setName("");
      setDescription("");
      setCategory("Work");
      setPriority("Medium");
      setStatus("Yet to start");
      setStartedAt("");
      setEndAt("");
  
      // Redirect to task list
      router.push("/task-list");
    } catch (err) {
      console.error("Error saving task:", err);
      alert("Something went wrong.");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-10 space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Task Name */}
    <div>
      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Task Name <span className="text-xs text-gray-500">(max 100 chars)</span>
      </label>
      <input
        type="text"
        id="name"
        maxLength={100}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Enter task name"
        required
      />
    </div>

    {/* Category */}
    <div>
      <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Category
      </label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="Work">Work</option>
        <option value="Study">Study</option>
        <option value="Fitness">Fitness</option>
      </select>
    </div>

    {/* Priority */}
    <div>
      <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Priority
      </label>
      <select
        id="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>

    {/* Status */}
    <div>
      <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Status
      </label>
      <select
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="Yet to start">Yet to start</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>

    {/* StartedAt */}
    <div>
      <label htmlFor="startedAt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Start Date & Time
      </label>
      <input
        type="datetime-local"
        id="startedAt"
        value={startedAt}
        onChange={(e) => setStartedAt(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        
      />
    </div>

    {/* EndAt */}
    <div>
      <label htmlFor="endAt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        End Date & Time
      </label>
      <input
        type="datetime-local"
        id="endAt"
        value={endAt}
        onChange={(e) => setEndAt(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        
      />
    </div>
  </div>

  {/* Description */}
  <div>
    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Description <span className="text-xs text-gray-500">(max 300 chars)</span>
    </label>
    <textarea
      id="description"
      maxLength={300}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      rows={4}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      placeholder="Enter task description"
      required
    />
  </div>

  {/* Button Group */}
  <div className="flex space-x-4">
    <button
      type="button"
      onClick={() => router.push("/task-list")}
      className="inline-flex items-center text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
    >
      <ArrowLeftIcon className="w-4 h-4 mr-2" />
      Back to List
    </button>

    <button
      type="submit"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Create Task
    </button>
  </div>
</form>

  );
}
