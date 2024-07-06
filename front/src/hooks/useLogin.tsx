import { useState } from "react"
import axiosInstance from "@/api/axiosInstance";
import { useAuthContext } from "@/contexts";

interface LoginParams {
  username : string;
  password : string;
}

const useLogin = () => {
  const [ loading, setLoading ] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ username, password }: LoginParams) => {
    setLoading(true);

    try {
      const response = await axiosInstance.post("/login", {username, password});
      //console.log(response);
      
      const data = response.data;
      //console.log(data);
      
      localStorage.setItem("library-user", JSON.stringify(data));
      localStorage.setItem("user-token", data.accesToken);
      setAuthUser(data)
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  }

  return { loading, login }
}

export default useLogin