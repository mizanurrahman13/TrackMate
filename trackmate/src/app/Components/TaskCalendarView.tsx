import { useState } from "react";
import { format, startOfWeek, addDays, isSameDay, isSameWeek, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { Task } from "../typs/Task";

type Props = {
  tasks: Task[];
};

export default function TaskCalendarView({ tasks }: Props) {
  const [viewMode, setViewMode] = useState<"daily" | "weekly" | "monthly">("weekly");
  const today = new Date();

  const getDays = () => {
    if (viewMode === "daily") return [today];
    if (viewMode === "weekly") {
      const start = startOfWeek(today, { weekStartsOn: 0 });
      return Array.from({ length: 7 }, (_, i) => addDays(start, i));
    }
    if (viewMode === "monthly") {
      const start = startOfMonth(today);
      const end = endOfMonth(today);
      return eachDayOfInterval({ start, end });
    }
    return [];
  };

  const days = getDays();

  const getTasksForDay = (day: Date) =>
    tasks.filter((task) => {
      if (!task.startedAt) return false; // ✅ skip if undefined
      const taskDate = new Date(task.startedAt);
      return isSameDay(taskDate, day);
    });
  

  return (
    // <div className="p-4">
    //   <div className="flex justify-between items-center mb-4">
    //     <h2 className="text-xl font-semibold">Task Calendar View</h2>
    //     <div className="space-x-2">
    //       {["daily", "weekly", "monthly"].map((mode) => (
    //         <button
    //           key={mode}
    //           onClick={() => setViewMode(mode as "daily" | "weekly" | "monthly")}
    //           className={`px-3 py-1 rounded ${
    //             viewMode === mode ? "bg-blue-600 text-white" : "bg-gray-200"
    //           }`}
    //         >
    //           {mode.charAt(0).toUpperCase() + mode.slice(1)}
    //         </button>
    //       ))}
    //     </div>
    //   </div>

    //   <div className={`grid ${viewMode === "monthly" ? "grid-cols-7" : "grid-cols-1 md:grid-cols-7"} gap-4`}>
    //     {days.map((day) => (
    //       <div key={day.toISOString()} className="border rounded p-2 bg-white shadow-sm">
    //         <h3 className="text-sm font-medium mb-2">{format(day, "EEE, MMM d")}</h3>
    //         <ul className="space-y-1">
    //           {getTasksForDay(day).map((task) => (
    //             <li key={task._id} className="text-xs bg-blue-100 p-1 rounded">
    //               {task.name}
    //               {task.status}
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="p-4">
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Task Calendar View</h2>
        <div className="space-x-2">
        {["daily", "weekly", "monthly"].map((mode) => (
            <button
            key={mode}
            onClick={() => setViewMode(mode as "daily" | "weekly" | "monthly")}
            className={`px-3 py-1 rounded text-black ${
                viewMode === mode ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
        ))}
        </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {days.map((day) => (
    <div key={day.toISOString()} className="grid gap-4">
      <div className="bg-white border rounded-lg p-3 shadow-sm text-black">
        <h3 className="text-sm font-semibold mb-2 text-black">{format(day, "EEE, MMM d")}</h3>
        <ul className="space-y-2">
          {getTasksForDay(day).map((task) => (
            <li key={task._id} className="bg-blue-100 p-2 rounded text-xs">
              <div
                className={`font-lobster text-base ${
                  task.status === "In Progress"
                    ? "text-green-600"
                    : task.status === "Yet to start"
                    ? "text-yellow-600"
                    : task.status === "Completed"
                    ? "text-blue-600"
                    : "text-black"
                }`}
              >
                {task.name}
              </div>
              <div className="text-sm text-black">{task.status}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ))}
</div>


</div>

  );
}
