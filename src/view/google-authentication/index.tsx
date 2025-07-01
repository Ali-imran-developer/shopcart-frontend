import AuthController from "@/controllers/authController";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";

const GoogleAuthButton = () => {
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const response = await axios.post(
        "https://learning-express-three.vercel.app/api/auth/google/token-login",
        { credential: credentialResponse.credential }
      );
      const { token } = response.data;
      AuthController.set({ token: token });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => toast.error("Google Login Failed")}
      useOneTap
    />
  );
};

export default GoogleAuthButton;