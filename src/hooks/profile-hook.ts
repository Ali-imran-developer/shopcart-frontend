import { useCallback, useState } from "react";
import ProfileController from "@/controllers/profileController";
import { useDispatch } from "react-redux";
import { setProfileList } from "@/store/slices/profileSlice";
import AuthController from "@/controllers/authController";

export const useProfile = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);

  const handleAddNewProfile = useCallback(async (data: any) => {
    try {
      setLoading(true);
      const response: any = await ProfileController.addNewProfile(data);
      return response;
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response: any = await ProfileController.fetchProfile();
      dispatch(setProfileList(response?.profile));
      AuthController.set({ profile: response?.profile });
      const { profile } = AuthController.get();
      setProfileData(profile);
      return response;
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEditProfile = useCallback(async (data: any, id: string) => {
    try {
      setLoading(true);
      const response: any = await ProfileController.editProfile(data, id);
      return response;
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    handleAddNewProfile,
    handleFetchProfile,
    handleEditProfile,
    Loading,
    profileData,
    setLoading,
  };
};
