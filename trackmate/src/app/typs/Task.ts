// src/types/Task.ts
export type Task = {
    _id: string;
    name: string;
    description: string; // ✅ consistent
    category: "Work" | "Study" | "Fitness";
    priority: "High" | "Medium" | "Low";
    status: "Yet to start" | "In Progress" | "Completed";
    startedAt?: string;
    endAt?: string;
};
  