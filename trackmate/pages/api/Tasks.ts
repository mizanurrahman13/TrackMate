import type { NextApiRequest, NextApiResponse } from 'next';

const tasks = [
    {
      id: 1,
      name: "Write reporttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
      category: "Work",
      priority: "High",
      status: "Yet to start",
      description:
        "Prepare the quarterly financial report including revenue breakdown, expense analysis, and projections for the next quarter. Ensure all figures are verified and sources cited."
    },
    {
      id: 2,
      name: "Read textbook",
      category: "Study",
      priority: "Medium",
      status: "In Progress",
      description:
        "Read chapters 4 through 7 of the economics textbook and summarize key concepts related to market structures, supply and demand, and fiscal policy."
    },
    {
      id: 3,
      name: "Gym session",
      category: "Fitness",
      priority: "Low",
      status: "Complete",
      description:
        "Complete a 60-minute workout focusing on cardio and core strength. Include warm-up, HIIT intervals, and cooldown stretches."
    }
];
  
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(tasks);
}
