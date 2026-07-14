"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Admin = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function ManageAdminsPage() {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  async function fetchAdmins() {
    try {
      const res = await fetch("/api/admin/users/role");
      if (res.status === 403) {
        router.push("/admin/dashboard");
        return;
      }
      const data = await res.json();
      setAdmins(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load admins");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddAdmin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter an email");
      return;
    }

    try {
      const res = await fetch("/api/admin/users/role", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), role: "admin" }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to add admin");
        return;
      }

      setSuccess(`"${email.trim()}" is now an admin`);
      setEmail("");
      fetchAdmins();
    } catch {
      setError("Something went wrong");
    }
  }

  async function handleRemoveAdmin(admin: Admin) {
    if (!confirm(`Remove admin access for "${admin.email}"?`)) return;

    try {
      const res = await fetch("/api/admin/users/role", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: admin.email, role: "customer" }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to remove admin");
        return;
      }

      setSuccess(`Admin access removed from "${admin.email}"`);
      fetchAdmins();
    } catch {
      setError("Something went wrong");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Admins</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">{success}</div>
      )}

      <div className="bg-white rounded-xl border p-6 mb-8">
        <h2 className="font-semibold mb-4">Add New Admin</h2>
        <form onSubmit={handleAddAdmin} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user email..."
            className="flex-1 px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition"
          >
            Add Admin
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-semibold mb-4">Current Admins ({admins.length})</h2>
        {loading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : admins.length === 0 ? (
          <p className="text-gray-500 text-sm">No admins found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Email</th>
                  <th className="pb-3 pr-4">Since</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium">{admin.name}</td>
                    <td className="py-3 pr-4 text-gray-600">{admin.email}</td>
                    <td className="py-3 pr-4 text-gray-500">
                      {new Date(admin.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => handleRemoveAdmin(admin)}
                        className="text-red-600 hover:text-red-800 text-xs font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
