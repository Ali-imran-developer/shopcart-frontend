import { useCallback, useState } from "react";
import LoginController from "@/controllers/loginController";
import toast from "react-hot-toast";
import AuthController from "@/controllers/authController";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handlePrimaryLogin = useCallback(async (values: any) => {
    try {
      setIsLoading(true);
      const data: any = await LoginController.login(values);
      AuthController.set({ token: data?.token });
      AuthController.set({ profile: data?.user })
      toast.success(data?.message);
      navigate("/");
      return data;
    } catch (error: any) {
      console.log("@Error", error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePrimarySignup = useCallback(async (values: any) => {
    try {
      setIsLoading(true);
      const data: any = await LoginController.register(values);
      AuthController.set({ token: data?.token });
      toast.success(data?.message);
      navigate("/");
      return data;
    } catch (error: any) {
      console.log("@Error", error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGoogleSignup = useCallback(async (values: any) => {
    try {
      setIsLoading(true);
      const response: any = await LoginController.googleAuthentication(values);
      const { token } = response.data;
      AuthController.set({ token: token });
      toast.success(response?.message);
      navigate("/");
      return response;
    } catch (error: any) {
      console.log("@Error", error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUpdateUser = useCallback(async (id: String ,values: any) => {
    try {
      setIsLoading(true);
      const data: any = await LoginController.updateUser(id, values);
      AuthController.set({ profile: data?.user });
      toast.success(data?.message);
      return data;
    } catch (error: any) {
      console.log("@Error", error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleforgetPassword = useCallback(async (values: any) => {
    try {
      setIsLoading(true);
      const data: any = await LoginController.forgetPassword(values);
      toast.success(data?.message);
      return data;
    } catch (error: any) {
      console.log("@Error", error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleVerifyCode = useCallback(async (values: any) => {
    try {
      setIsLoading(true);
      const data: any = await LoginController.verifyCode(values);
      toast.success(data?.message);
      return data;
    } catch (error: any) {
      console.log("@Error", error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleResetPassword = useCallback(async (values: any) => {
    try {
      setIsLoading(true);
      const data: any = await LoginController.resetPassword(values);
      toast.success(data?.message);
      return data;
    } catch (error: any) {
      console.log("@Error", error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    handleVerifyCode,
    handleUpdateUser,
    handlePrimaryLogin,
    handlePrimarySignup,
    handleResetPassword,
    handleforgetPassword,
  };
};
