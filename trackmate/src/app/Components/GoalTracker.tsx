"use client";

import { useState, useEffect } from "react";

type Task = {
    _id: string;
    name: string;
    status: string;
    startedAt?: string | null;
    endAt?: string | null;
};



export default function GoalTracker() {
    const [goal, setGoal] = useState("");
    const [target, setTarget] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const [tasks, setTasks] = useState<Task[]>([]);

    const progressPercent = Math.min((progress / target) * 100, 100);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch("/api/tasks");
            const data = await res.json();
            setTasks(data);
        };
        fetchTasks();
    }, []);

    useEffect(() => {
        const selectedTask = tasks.find((task) => task.name === goal);
        if (selectedTask?.startedAt) {
          const now = new Date();
          const end = selectedTask.endAt ? new Date(selectedTask.endAt) : null;
      
          // Only calculate if endAt is not set or is in the future
          if (!end || end > now) {
            const start = new Date(selectedTask.startedAt);
            const elapsed = (now.getTime() - start.getTime()) / (1000 * 60 * 60); // hours
            setProgress(Math.round(elapsed));
          }
        }
    }, [goal, tasks]);     

    const incompleteTasks = tasks.filter((task) => {
        if (!task.endAt) return true; // no endAt means still active
        const end = new Date(task.endAt);
        return end > new Date(); // end date is in the future
    });
      
    const handleSetGoal = async () => {
        const selectedTask = tasks.find((task) => task.name === goal);
        if (!selectedTask || !selectedTask.startedAt || target <= 0) return;
      
        const start = new Date(selectedTask.startedAt);
        const estimatedEnd = new Date(start.getTime() + target * 60 * 60 * 1000); // target hours in ms
      
        const res = await fetch(`/api/tasks/${selectedTask._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endAt: estimatedEnd.toISOString() }),
        });
      
        if (res.ok) {
          alert("Goal set and end date updated!");
      
          // ✅ Reset form fields
          setGoal("");
          setTarget(0);
          setProgress(0);
      
          // ✅ Refresh task list
          const updated = await fetch("/api/tasks");
          const data = await updated.json();
          setTasks(data);
        } else {
          alert("Failed to update goal.");
        }
      };
      
      

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-xl font-bold mb-4 text-black">Goal Tracker</h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 text-black">Goal</label>
                    <select
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
                        required
                    >
                        <option value="">Select a task</option>
                        {incompleteTasks.map((task) => (
                            <option key={task._id} value={task.name}>
                                {task.name}
                            </option>
                        ))}
                    </select>


                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 text-black">Target Hours</label>
                    <input
                        type="number"
                        value={target}
                        onChange={(e) => setTarget(Number(e.target.value))}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 text-black">Progress Hours</label>
                    <input
                        type="number"
                        value={progress}
                        onChange={(e) => setProgress(Number(e.target.value))}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                </div>
            </form>

            <div className="mt-6">
                <p className="text-sm text-gray-600">Progress: {progress} / {target} hours</p>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-2 text black">
                    <div
                        className="bg-green-500 h-4 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
            </div>
            <button
                type="button"
                onClick={handleSetGoal}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4"
            >
                Set Goal
            </button>

        </div>


    );
}
