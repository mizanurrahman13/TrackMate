"use client";

import { useEffect, useState } from "react";

type Task = {
  _id: string;
  name: string;
  endAt?: string | null;
  status: string;
};

export default function EmailReminder() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const upcomingOrOverdue = tasks.filter((task) => {
    if (!task.endAt || task.status === "Completed") return false;
    const end = new Date(task.endAt);
    const now = new Date();
    const hoursLeft = (end.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursLeft <= 24; // due within 24 hours or overdue
  });

  const handleSendReminders = async () => {
    setSending(true);
    const res = await fetch("/api/reminders/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasks: upcomingOrOverdue }),
    });
    setSending(false);
    if (res.ok) {
      alert("Reminders sent successfully!");
    } else {
      alert("Failed to send reminders.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4 text-black">Email Reminders</h2>
      <p className="text-sm text-black mb-2">
        Tasks due within 24 hours or overdue:
      </p>
      <ul className="space-y-2 mb-4">
        {upcomingOrOverdue.length > 0 ? (
          upcomingOrOverdue.map((task) => (
            <li key={task._id} className="bg-red-100 p-2 rounded text-sm text-black">
              {task.name} — due by {new Date(task.endAt!).toLocaleString()}
            </li>
          ))
        ) : (
          <p className="text-sm text-black">No reminders needed right now.</p>
        )}
      </ul>
      <button
        onClick={handleSendReminders}
        disabled={sending || upcomingOrOverdue.length === 0}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {sending ? "Sending..." : "Send Email Reminders"}
      </button>
    </div>
  );
}
