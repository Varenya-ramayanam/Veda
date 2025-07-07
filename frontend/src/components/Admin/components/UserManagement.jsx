import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "johndoe@gmail.com", role: "customer" },
    { id: 2, name: "Jane Smith", email: "abc@gmail.com", role: "admin" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
    };
    setUsers((prev) => [...prev, newUser]);
    toast.success(`${formData.name} was added successfully!`);
    setFormData({ name: "", email: "", password: "", role: "customer" });
  };

  const confirmDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    toast.success(`${selectedUser.name} was removed.`);
    setOpenDialog(false);
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, role: newRole } : u
      )
    );
    toast.success(`Role updated to ${newRole}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h2 className="text-3xl font-bold text-[#ea2e0e]">User Management</h2>

      {/* Add User Form */}
      <div className="bg-white shadow-md rounded-xl p-6 border space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Add New User</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["name", "email", "password"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea2e0e]"
                placeholder={`Enter ${field}`}
                required
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea2e0e]"
              required
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-500 text-white font-semibold rounded-full px-6 py-3"
            >
              Add User
            </Button>
          </div>
        </form>
      </div>

      {/* User List Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow border">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-center">Change Role</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No users available.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4 text-center">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="p-2 border rounded"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Dialog open={openDialog && selectedUser?.id === user.id} onOpenChange={setOpenDialog}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => {
                            setSelectedUser(user);
                            setOpenDialog(true);
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete {user.name}?</DialogTitle>
                        </DialogHeader>
                        <p className="text-sm text-gray-600 mt-2">
                          Are you sure you want to remove this user? This action cannot be undone.
                        </p>
                        <DialogFooter className="mt-6">
                          <Button variant="outline" onClick={() => setOpenDialog(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={confirmDelete}>
                            Confirm Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
