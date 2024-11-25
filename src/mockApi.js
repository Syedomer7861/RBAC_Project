// mockApi.js

// Mock data for users
const mockUsers = [
  { id: 1, name: "John Doe", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", role: "Manager", status: "Inactive" },
  { id: 3, name: "Bill Gates", role: "User", status: "Active" },
];

// Mock data for roles
const mockRoles = [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Manager", permissions: ["Read", "Write"] },
  { id: 3, name: "User", permissions: ["Read"] },
];

// API functions for users
export const fetchUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers);
    }, 500);
  });
};

export const updateUser = (id, updatedData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userIndex = mockUsers.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...updatedData };
        resolve(mockUsers[userIndex]);
      }
    }, 500);
  });
};

export const deleteUser = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userIndex = mockUsers.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        mockUsers.splice(userIndex, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
};

// API functions for roles
export const fetchRoles = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRoles);
    }, 500);
  });
};

export const addRole = (role) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockRoles.push(role);  // Add the new role to the roles array
      resolve(role);  // Resolve with the added role
    }, 500);  // Simulate API delay
  });
};


export const updateRole = (id, updatedData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const roleIndex = mockRoles.findIndex((role) => role.id === id);
      if (roleIndex !== -1) {
        mockRoles[roleIndex] = { ...mockRoles[roleIndex], ...updatedData };
        resolve(mockRoles[roleIndex]);
      }
    }, 500);
  });
};
