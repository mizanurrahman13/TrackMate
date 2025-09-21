// import type { NextApiRequest, NextApiResponse } from "next";

// let tasks: any[] = []; // Temporary in-memory store

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const { name, description, priority, status } = req.body;

//   // Basic validation
//   if (
//     !name ||
//     !description ||
//     !priority ||
//     !status ||
//     name.length > 100 ||
//     description.length > 300
//   ) {
//     return res.status(400).json({ message: "Invalid input" });
//   }

//   const newTask = {
//     id: tasks.length + 1,
//     name,
//     description,
//     priority,
//     status,
//   };

//   tasks.push(newTask);

//   return res.status(201).json({ message: "Task created", task: newTask });
// }

import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../src/app/Shared/mongodb";
import { z } from "zod";

// ✅ Zod schema: both startedAt and endAt are required and validated
const TaskSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(["Work", "Study", "Fitness"], "Invalid category"),
  priority: z.enum(["High", "Medium", "Low"], "Invalid priority"),
  status: z.enum(["Yet to start", "In Progress", "Completed"], "Invalid status"),

  startedAt: z.union([
    z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format for startedAt",
    }),
    z.null(),
  ]),
  
  endAt: z.union([
    z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format for endAt",
    }),
    z.null(),
  ]),
  
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const parseResult = TaskSchema.safeParse(req.body);
  if (!parseResult.success) {
    console.error("Zod validation error:", parseResult.error);
    return res.status(400).json({
      message: "Invalid task data",
      errors: parseResult.error.format(),
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db("taskdb");

    const { name, description, category, priority, status, startedAt, endAt } = parseResult.data;

    const taskData = {
      name,
      description,
      category,
      priority,
      status,
      startedAt: startedAt ? new Date(startedAt) : null,
      endAt: endAt ? new Date(endAt) : null,
      createdAt: new Date(),
    };

    const result = await db.collection("tasks").insertOne(taskData);

    res.status(201).json({ message: "Task created", taskId: result.insertedId });
  } catch (error) {
    console.error("MongoDB error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


