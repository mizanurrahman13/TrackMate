// src/app/Task-Calendar/page.tsx
"use client";

import TaskCalendarView from "../Components/TaskCalendarView"; // adjust path if needed
import { useEffect, useState } from "react";
import { Task } from "../typs/Task";

export default function TaskCalendarPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Calendar View</h1>
      <TaskCalendarView tasks={tasks} />
    </div>
  );
}
