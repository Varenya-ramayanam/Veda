import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../../../redux/slices/adminSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // should match Mongoose enum
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addUser(formData)).unwrap();
      toast.success(`${formData.name} added successfully!`);
      setFormData({ name: "", email: "", password: "", role: "user" });
    } catch (err) {
      toast.error(err?.message || "Failed to add user");
    }
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteUser(selectedUser._id)).unwrap();
      toast.success(`${selectedUser.name} deleted`);
    } catch (err) {
      toast.error(err?.message || "Failed to delete user");
    }
    setOpenDialog(false);
  };

  const handleRoleChange = async (userId, newRole) => {
    const user = users.find((u) => u._id === userId);
    try {
      await dispatch(updateUser({ id: userId, name: user.name, email: user.email, role: newRole })).unwrap();
      toast.success(`Role updated to ${newRole}`);
    } catch (err) {
      toast.error(err?.message || "Failed to update role");
    }
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
              <option value="user">User</option>
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
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4 text-center">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="p-2 border rounded"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Dialog
                      open={openDialog && selectedUser?._id === user._id}
                      onOpenChange={setOpenDialog}
                    >
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
                      <DialogContent aria-describedby="confirm-delete-description">
                        <DialogHeader>
                          <DialogTitle>Delete {user.name}?</DialogTitle>
                        </DialogHeader>
                        <p id="confirm-delete-description" className="text-sm text-gray-600 mt-2">
                          Are you sure you want to delete this user? This action cannot be undone.
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
