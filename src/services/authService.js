const USERS_KEY = "agro_users";
const SESSION_KEY = "agro_user";

// Helper to get all users from localStorage
const getUsers = () => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  return users || [];
};

export const login = (username, password) => {
  const users = getUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, message: "Invalid credentials" };
};

export const register = (username, password, role) => {
  const users = getUsers();

  // Prevent duplicate usernames
  if (users.find((u) => u.username === username)) {
    return { success: false, message: "Username already exists" };
  }

  const newUser = { username, password, role };
  const updatedUsers = [...users, newUser];
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  localStorage.setItem(SESSION_KEY, JSON.stringify(newUser)); // auto-login
  return { success: true, user: newUser };
};

export const logout = () => localStorage.removeItem(SESSION_KEY);

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
};

export const isLoggedIn = () => !!getCurrentUser();

export const getUserRole = () => {
  const user = getCurrentUser();
  return user?.role;
};
