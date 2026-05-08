import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, logoutAdmin } from "../../redux/adminSlice";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { adminInfo, users } = useSelector((state) => state.admin);

  const [search, setSearch] = useState("");

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [editUserId, setEditUserId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // FETCH USERS
  const fetchUsers = async () => {
    if (!adminInfo) return;

    const res = await axios.get(
      `http://localhost:5000/api/admin/users?search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      }
    );

    dispatch(setUsers(res.data));
  };

  // DELETE USER
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    });

    fetchUsers();
  };

  // START EDIT
  const editUser = (user) => {
    setEditUserId(user._id);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  // SAVE EDIT
const saveEdit = async (id) => {
  const nameRegex = /^[A-Za-z]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nameRegex.test(editName)) {
    alert("Name must contain only alphabets");
    return;
  }

  if (!emailRegex.test(editEmail)) {
    alert("Invalid email");
    return;
  }

  try {
    await axios.put(
      `http://localhost:5000/api/admin/user/${id}`,
      {
        name: editName,
        email: editEmail,
      },
      {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      }
    );

    setEditUserId(null);
    fetchUsers();

  } catch (error) {
   let message =
  error.response?.data?.message || error.message || "Update failed";

// check duplicate email error
if (message.includes("E11000")) {
  message = "Email already exists";
}

alert(message);
  }
};
  const cancelEdit = () => {
    setEditUserId(null);
  };

  // CREATE USER
 const createUser = async () => {
  const nameRegex = /^[A-Za-z]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!newName || !newEmail || !newPassword) {
    alert("All fields are required");
    return;
  }

  if (!nameRegex.test(newName)) {
    alert("Name must contain only alphabets");
    return;
  }

  if (!emailRegex.test(newEmail)) {
    alert("Invalid email format");
    return;
  }

  try {
    await axios.post(
      "http://localhost:5000/api/admin/user",
      {
        name: newName,
        email: newEmail,
        password: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      }
    );

    // success
    setNewName("");
    setNewEmail("");
    setNewPassword("");
    fetchUsers();

  } catch (error) {
    // SHOW BACKEND ERROR
    const message =
      error.response?.data?.message || "User creation failed";

    alert(message); // email alredy exists
  }
};
 
  useEffect(() => {
    if (adminInfo) {
      fetchUsers();
    }
  }, [search]);

  // LOGOUT
  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin/login");
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-5 rounded shadow mb-8">
        <h3 className="text-lg font-semibold mb-3">Create User</h3>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Name"
            value={newName}
              onChange={(e) => {
              const value = e.target.value.replace(/[^A-Za-z]/g, "");
              setNewName(value);
            }}
            className="border p-2 rounded w-full"
          />

          <input
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <input
            type="password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <button
            onClick={createUser}
            className="bg-green-500 text-white px-5 rounded hover:bg-green-600"
          >
            Create
          </button>

        </div>
      </div>

      
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />

        <p className="font-medium">Total Users: {users.length}</p>
      </div>

     
      <div className="bg-white rounded shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="text-center hover:bg-gray-100"
              >
                
                <td className="border p-2">
                  {editUserId === user._id ? (
                    <input
                      value={editName}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^A-Za-z]/g, "");
                        setEditName(value);
                      }}
                     
                      className="border p-1 rounded"
                    />
                  ) : (
                    user.name
                  )}
                </td>

                
                <td className="border p-2">
                  {editUserId === user._id ? (
                    <input
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="border p-1 rounded"
                    />
                  ) : (
                    user.email
                  )}
                </td>

              
                <td className="border p-2">

                  {editUserId === user._id ? (
                    <>
                      <button
                        onClick={() => saveEdit(user._id)}
                        className="bg-green-500 text-white px-3 py-1 mr-2 rounded hover:bg-green-600"
                      >
                        Save
                      </button>

                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => editUser(user)}
                        className="bg-blue-500 text-white px-3 py-1 mr-2 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}

                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminDashboard;