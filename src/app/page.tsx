"use client";

import { useState, useEffect } from "react";
import { Trash } from "lucide-react";

interface Task {
  activity: string;
  price: number;
  type: string;
  bookingRequired: boolean;
  accessibility: number;
}

export default function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activity, setActivity] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [type, setType] = useState<string>("education");
  const [bookingRequired, setBookingRequired] = useState<boolean>(false);
  const [accessibility, setAccessibility] = useState<number>(0.5);

  // Load tasks from local storage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];
    setTasks(savedTasks);
  }, []);

  // Save tasks to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = { activity, price, type, bookingRequired, accessibility };
    setTasks([...tasks, newTask]);
    setActivity("");
    setPrice(0);
    setType("education");
    setBookingRequired(false);
    setAccessibility(0.5);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4">To-Do List ({tasks.length})</h2>
      <form onSubmit={addTask} className="space-y-3">
        <label className="block">
          Activity: 
            <input
              type="text"
              placeholder="Activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
        </label>
        <label className="block">
          Price: 
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              className="w-full p-2 border rounded"
            />
        </label>
        <label className="block">
          Type: 
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={bookingRequired}
            onChange={(e) => setBookingRequired(e.target.checked)}
            className="mr-2"
          />
          Booking Required
        </label>
        <label className="block">
          Accessibility: {accessibility}
          <input
            type="range"
            min="0.0"
            max="1.0"
            step="0.1"
            value={accessibility}
            onChange={(e) => setAccessibility(parseFloat(e.target.value))}
            className="w-full"
          />
        </label>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded text-lg font-semibold">
          Add Task
        </button>
      </form>
      <ul className="mt-4 space-y-2">
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center p-2 bg-white shadow rounded">
            <div>
              <p className="font-semibold">{task.activity}</p>
              <p className="text-sm text-gray-600">Type: {task.type} | Price: ${task.price}</p>
              <p className="text-xs">Accessibility: {task.accessibility} | Booking: {task.bookingRequired ? "Yes" : "No"}</p>
            </div>
            <button
              onClick={() => removeTask(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash size={24} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
