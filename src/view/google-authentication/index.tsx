import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export const useGoogleAuth = () => {
  return useGoogleLogin({
    onSuccess: async (tokenResponse: any) => {
      try {
        const response = await axios.post("https://learning-express-three.vercel.app/api/auth/google/token-login",
          {
            credential: tokenResponse.credential,
          }
        );
        const { token } = response.data;
        localStorage.setItem("token", token);
        window.location.href = "/dashboard";
      } catch (err) {
        console.error("Login failed", err);
      }
    },
    onError: () => {
      console.error("Google login error");
    },
  });
};
