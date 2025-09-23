import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type MedicalRecord = {
  id: number;
  title: string;
  date: string;
  doctor: string;
  notes: string;
  image?: string;
};

const initialRecords: MedicalRecord[] = [
  {
    id: 1,
    title: "Initial Consultation",
    date: "2025-09-10",
    doctor: "Dr. Sharma",
    notes: "Patient reported mild headaches and fatigue.",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Therapy Session",
    date: "2025-09-15",
    doctor: "Dr. Patel",
    notes: "Panchakarma therapy administered. Patient responded well.",
    image: "/placeholder.svg",
  },
];

const chartData = [
  { name: "BP", value: 120 },
  { name: "Pulse", value: 80 },
  { name: "Temp", value: 98.6 },
];

export default function MedicalRecords() {
  const [records, setRecords] = useState(initialRecords);
  const [form, setForm] = useState({
    title: "",
    date: "",
    doctor: "",
    notes: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (form.title && form.date && form.doctor && form.notes) {
      setRecords([
        ...records,
        {
          id: records.length + 1,
          title: form.title,
          date: form.date,
          doctor: form.doctor,
          notes: form.notes,
          image: form.image || "/placeholder.svg",
        },
      ]);
      setForm({ title: "", date: "", doctor: "", notes: "", image: "" });
    }
  };

  return (
    <div className="bg-[#f6fff7] min-h-screen py-10 px-4 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-green-600 mb-2">Medical Records</h1>
        <p className="text-gray-600 mb-6">
          View and manage your Panchakarma medical records and progress.
        </p>
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Add New Record</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="title"
              placeholder="Record Title"
              value={form.title}
              onChange={handleChange}
              className="border rounded p-2"
            />
            <input
              type="text"
              name="doctor"
              placeholder="Doctor Name"
              value={form.doctor}
              onChange={handleChange}
              className="border rounded p-2"
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border rounded p-2"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL (optional)"
              value={form.image}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>
          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            className="border rounded p-2 w-full mb-4"
            rows={3}
          />
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Add Record
          </button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-green-700">Your Records</h2>
          <div className="grid gap-4">
            {records.map((rec) => (
              <div
                key={rec.id}
                className="bg-white rounded-lg shadow flex flex-col md:flex-row items-center justify-between p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={rec.image || "/placeholder.svg"}
                    alt="Medical"
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div>
                    <div className="font-bold text-lg text-green-800">{rec.title}</div>
                    <div className="text-gray-500">{rec.date}</div>
                    <div className="text-gray-600">Doctor: {rec.doctor}</div>
                    <div className="text-gray-700 mt-2">{rec.notes}</div>
                  </div>
                </div>
              </div>
            ))}
            {records.length === 0 && (
              <div className="text-center text-gray-500 py-8">No medical records found.</div>
            )}
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Health Progress Chart</h2>
          <div className="bg-white rounded-lg shadow p-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}