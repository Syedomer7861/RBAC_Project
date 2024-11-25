import React, { useEffect, useState } from "react";
import { fetchRoles, addRole, updateRole } from "../mockApi"; // Ensure proper imports
import { PlusIcon, PencilIcon } from '@heroicons/react/outline'; // Import Heroicons

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newRoleName, setNewRoleName] = useState("");
  const [newRolePermissions, setNewRolePermissions] = useState([]);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [updatedPermissions, setUpdatedPermissions] = useState([]);

  useEffect(() => {
    fetchRoles().then(setRoles);
  }, []);

  const handleAddRole = () => {
    if (newRoleName.trim()) {
      const newId = roles.length > 0 ? Math.max(...roles.map((role) => role.id)) + 1 : 1;
      const newRole = {
        id: newId,
        name: newRoleName,
        permissions: newRolePermissions,
      };

      addRole(newRole).then((addedRole) => {
        setRoles([...roles, addedRole]);
        setNewRoleName("");
        setNewRolePermissions([]);
      });
    }
  };

  const handleUpdateRole = (id) => {
    const updatedData = { permissions: updatedPermissions };
    updateRole(id, updatedData).then((updatedRole) => {
      setRoles((prevRoles) =>
        prevRoles.map((role) => (role.id === id ? updatedRole : role))
      );
      setEditingRoleId(null);
      setUpdatedPermissions([]);
    });
  };

  const handlePermissionsChange = (event) => {
    const { value } = event.target;
    setUpdatedPermissions(value.split(","));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">Role Management</h2>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search roles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3"
        />
      </div>

      {/* Roles Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border-b">ID</th>
              <th className="p-3 text-left border-b">Name</th>
              <th className="p-3 text-left border-b">Permissions</th>
              <th className="p-3 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles
              .filter((role) => role.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{role.id}</td>
                  <td className="p-3 border-b">{role.name}</td>
                  <td className="p-3 border-b">
                    {editingRoleId === role.id ? (
                      <input
                        type="text"
                        value={updatedPermissions.join(", ")}
                        onChange={handlePermissionsChange}
                        className="p-2 border rounded-lg w-full"
                        placeholder="Enter permissions (comma separated)"
                      />
                    ) : (
                      role.permissions.join(", ")
                    )}
                  </td>
                  <td className="p-3 border-b">
                    {editingRoleId === role.id ? (
                      <button
                        onClick={() => handleUpdateRole(role.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingRoleId(role.id);
                          setUpdatedPermissions(role.permissions);
                        }}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center gap-2"
                      >
                        <PencilIcon className="w-5 h-5" />
                        Update
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Add New Role */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
        <h3 className="text-xl font-medium mb-4">Add New Role</h3>
        <input
          type="text"
          placeholder="Role Name"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          className="p-2 border rounded-lg w-full mb-4"
        />
        <div className="flex justify-between items-center">
          <button
            onClick={handleAddRole}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Add Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;
