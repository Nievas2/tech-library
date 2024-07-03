import axiosInstance from "@/api/axiosInstance";
import { useAuthContext } from "@/contexts";
import { useState } from "react"

interface RegisterParams {
  username : string;
  email    : string;
  password : string;
}

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext() || {};

  const register = async ({ username, email, password }: RegisterParams) => {
    setLoading(true);

    try {
      const res = await axiosInstance.post("/register", {username, email, password});
      const data = res.data;
      
      if (data.error) throw new Error(data.error)

      localStorage.setItem("library-user", JSON.stringify(data));
      localStorage.setItem("user-token", data.accesToken);
      setAuthUser(data)
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  return { loading, register }
}