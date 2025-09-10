import { useState, useEffect } from "react";

type Task = {
    _id: string;
    name: string;
    description: string;
    category: "Work" | "Study" | "Fitness";
    priority: "High" | "Medium" | "Low";
    status: "Yet to start" | "In Progress" | "Completed";
    startedAt?: string;
    endAt?: string;
  };

  interface EditTaskModalProps {
    task: Task;
    onClose: () => void;
    onUpdated: () => void;
  }
  
  const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({ ...task });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData({ ...task });
  }, [task]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!formData.name || formData.name.length > 100) return "Name must be under 100 characters.";
    if (!formData.description || formData.description.length > 300) return "Description must be under 300 characters.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const updatedTask = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
        status: formData.status,
        startedAt: formData.startedAt,
        endAt: formData.endAt,
      };
      

    setLoading(true);
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });      

      if (!res.ok) throw new Error("Update failed");
      onUpdated(); // refresh task list
      onClose();   // close modal
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    //   <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-xl space-y-4">
    //     <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Task</h2>

    //     {error && <p className="text-red-500 text-sm">{error}</p>}

    //     <input
    //       type="text"
    //       value={formData.name}
    //       onChange={(e) => handleChange("name", e.target.value)}
    //       className="w-full p-2 border rounded"
    //       placeholder="Task Name"
    //       maxLength={100}
    //       required
    //     />

    //     <textarea
    //       value={formData.description}
    //       onChange={(e) => handleChange("description", e.target.value)}
    //       className="w-full p-2 border rounded"
    //       placeholder="Description"
    //       maxLength={300}
    //       required
    //     />

    //     <select
    //       value={formData.category}
    //       onChange={(e) => handleChange("category", e.target.value)}
    //       className="w-full p-2 border rounded"
    //     >
    //       <option value="Work">Work</option>
    //       <option value="Study">Study</option>
    //       <option value="Fitness">Fitness</option>
    //     </select>

    //     <select
    //       value={formData.priority}
    //       onChange={(e) => handleChange("priority", e.target.value)}
    //       className="w-full p-2 border rounded"
    //     >
    //       <option value="High">High</option>
    //       <option value="Medium">Medium</option>
    //       <option value="Low">Low</option>
    //     </select>

    //     <select
    //       value={formData.status}
    //       onChange={(e) => handleChange("status", e.target.value)}
    //       className="w-full p-2 border rounded"
    //     >
    //       <option value="Yet to start">Yet to start</option>
    //       <option value="In Progress">In Progress</option>
    //       <option value="Completed">Completed</option>
    //     </select>

    //     <input
    //       type="datetime-local"
    //       value={formData.startedAt}
    //       onChange={(e) => handleChange("startedAt", e.target.value)}
    //       className="w-full p-2 border rounded"
    //     />

    //     <input
    //       type="datetime-local"
    //       value={formData.endAt}
    //       onChange={(e) => handleChange("endAt", e.target.value)}
    //       className="w-full p-2 border rounded"
    //     />

    //     <button type="submit" className="flex items-center justify-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-lg hover:bg-blue-800">
    //       {loading && <span className="loader w-4 h-4"></span>}
    //       Update Task
    //     </button>
    //   </form>
    // </div>
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Edit Task</h2>

    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2 mt-10">
      {/* Task Name */}
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Task Name <span className="text-xs text-gray-500">(max 100 chars)</span>
        </label>
        <input
          type="text"
          id="name"
          maxLength={100}
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
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
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
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
          value={formData.priority}
          onChange={(e) => handleChange("priority", e.target.value)}
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
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value)}
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
          value={formData.startedAt || ""}
          onChange={(e) => handleChange("startedAt", e.target.value)}
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
          value={formData.endAt || ""}
          onChange={(e) => handleChange("endAt", e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          
        />
      </div>
    </div>

    {/* Description */}
    <div className="mt-6">
      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Description <span className="text-xs text-gray-500">(max 300 chars)</span>
      </label>
      <textarea
        id="description"
        maxLength={300}
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        rows={4}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Enter task description"
        required
      />
    </div>

    {/* Button Group */}
    <div className="flex justify-end space-x-4 mt-10">
      <button
        type="button"
        onClick={onClose}
        className="inline-flex items-center text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center"
      >
        {loading && <span className="loader mr-2"></span>}
        Update Task
      </button>
    </div>
  </form>
</div>

  );
}

export default EditTaskModal;
