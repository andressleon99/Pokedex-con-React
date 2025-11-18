import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario al iniciar la aplicación
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error al cargar usuario:", e);
      }
    }
    setLoading(false);
  }, []);

  // Registrar nuevo usuario
  const register = (email, password, username) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Verificar si el email ya existe
    if (users.some((u) => u.email === email)) {
      return { success: false, message: "El email ya está registrado" };
    }

    // Crear nuevo usuario público
    const newUser = {
      id: Date.now(),
      email,
      password, // En producción, esto debería estar hasheado
      username,
      type: "public",
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    return { success: true, message: "Registro exitoso" };
  };

  // Login
  const login = (email, password) => {
    // Verificar si es el admin
    if (email === "admin@pokedex.com" && password === "admin123") {
      const adminUser = {
        id: 1,
        email: "admin@pokedex.com",
        username: "Admin",
        type: "admin",
      };
      setUser(adminUser);
      localStorage.setItem("currentUser", JSON.stringify(adminUser));
      return { success: true, message: "Bienvenido Admin" };
    }

    // Buscar usuario público
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        username: foundUser.username,
        type: "public",
      };
      setUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      return { success: true, message: `Bienvenido ${foundUser.username}` };
    }

    return { success: false, message: "Email o contraseña incorrectos" };
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.type === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};
