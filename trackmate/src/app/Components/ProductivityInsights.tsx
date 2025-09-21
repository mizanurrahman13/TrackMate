"use client";

import { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";
import { Task } from "../typs/Task";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

export default function ProductivityInsights() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch("/api/tasks");
            const data = await res.json();
            setTasks(data);
        };
        fetchTasks();
    }, []);

    const completedTasks = tasks.filter((t) => t.status === "Completed");
    const timeSpent = completedTasks
        .filter((t) => t.startedAt && t.endAt) // ✅ Ensure both dates are defined
        .map((t) => {
            const start = new Date(t.startedAt!);
            const end = new Date(t.endAt!);
            const duration = (end.getTime() - start.getTime()) / (1000 * 60); // minutes
            return { name: t.name, minutes: Math.round(duration) };
        });

    const habits = tasks.reduce((acc: Record<string, number>, task) => {
        acc[task.category] = (acc[task.category] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold mb-2">Productivity Insights</h2>

            {/* Completed Tasks */}
            <div>
                <h3 className="text-base font-semibold mb-1">Completed Tasks</h3>
                <Bar
                    data={{
                        labels: completedTasks.map((t) => t.name),
                        datasets: [
                            {
                                label: "Completed",
                                data: completedTasks.map(() => 1),
                                backgroundColor: "rgba(54, 162, 235, 0.6)",
                            },
                        ],
                    }}
                    options={{ responsive: true, plugins: { legend: { display: false } } }}
                />
            </div>

            {/* Time Spent */}
            <div>
                <h3 className="text-base font-semibold mb-1">Time Spent on Tasks (minutes)</h3>
                <Line
                    data={{
                        labels: timeSpent.map((t) => t.name),
                        datasets: [
                            {
                                label: "Time Spent",
                                data: timeSpent.map((t) => t.minutes),
                                borderColor: "rgba(75, 192, 192, 1)",
                                backgroundColor: "rgba(75, 192, 192, 0.2)",
                            },
                        ],
                    }}
                    options={{ responsive: true }}
                />
            </div>

            {/* Habit Frequency */}
            <div>
                <h3 className="text-base font-semibold mb-1">Habit Frequency by Category</h3>
                <Pie
                    data={{
                        labels: Object.keys(habits),
                        datasets: [
                            {
                                label: "Habits",
                                data: Object.values(habits),
                                backgroundColor: ["#34d399", "#fbbf24", "#60a5fa"],
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        radius: "60%",
                    }}
                />
            </div>
        </div>

    );
}
