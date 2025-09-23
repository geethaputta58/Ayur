import React, { useState } from "react";

type Appointment = {
  id: number;
  title: string;
  date: string;
  time: string;
  practitioner: string;
  status: "Scheduled" | "Completed" | "Cancelled";
};

const initialAppointments: Appointment[] = [
  {
    id: 1,
    title: "Consultation",
    date: "2025-09-25",
    time: "10:00 AM",
    practitioner: "Dr. Sharma",
    status: "Scheduled",
  },
  {
    id: 2,
    title: "Therapy Session",
    date: "2025-09-28",
    time: "2:00 PM",
    practitioner: "Dr. Patel",
    status: "Completed",
  },
];

export default function Appointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    practitioner: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (form.title && form.date && form.time && form.practitioner) {
      setAppointments([
        ...appointments,
        {
          id: appointments.length + 1,
          title: form.title,
          date: form.date,
          time: form.time,
          practitioner: form.practitioner,
          status: "Scheduled",
        },
      ]);
      setForm({ title: "", date: "", time: "", practitioner: "" });
    }
  };

  return (
    <div className="bg-[#f6fff7] min-h-screen py-10 px-4 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-green-600 mb-2">Appointments</h1>
        <p className="text-gray-600 mb-6">
          Manage your Panchakarma appointments and sessions with ease.
        </p>
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Book New Appointment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="title"
              placeholder="Appointment Title"
              value={form.title}
              onChange={handleChange}
              className="border rounded p-2"
            />
            <input
              type="text"
              name="practitioner"
              placeholder="Practitioner Name"
              value={form.practitioner}
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
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Add Appointment
          </button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-green-700">Your Appointments</h2>
          <div className="grid gap-4">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="bg-white rounded-lg shadow flex flex-col md:flex-row items-center justify-between p-4"
              >
                <div>
                  <div className="font-bold text-lg text-green-800">{appt.title}</div>
                  <div className="text-gray-500">
                    {appt.date} at {appt.time}
                  </div>
                  <div className="text-gray-600">Practitioner: {appt.practitioner}</div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    appt.status === "Scheduled"
                      ? "bg-green-100 text-green-700"
                      : appt.status === "Completed"
                      ? "bg-gray-200 text-gray-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {appt.status}
                </span>
              </div>
            ))}
            {appointments.length === 0 && (
              <div className="text-center text-gray-500 py-8">No appointments found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}