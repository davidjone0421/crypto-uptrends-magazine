import { createContext, useContext, useState, ReactNode } from "react";

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string; name: string; role: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

// TODO: Replace with Supabase Auth
const MOCK_CREDENTIALS = {
  email: "davidjone0421@gmail.com",
  password: "Tahir@300",
  name: "David Jone",
  role: "Owner",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthState["user"]>(() => {
    const saved = localStorage.getItem("admin_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string): boolean => {
    // TODO: Replace with supabase.auth.signInWithPassword()
    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      const u = { email, name: MOCK_CREDENTIALS.name, role: MOCK_CREDENTIALS.role };
      setUser(u);
      localStorage.setItem("admin_user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("admin_user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
