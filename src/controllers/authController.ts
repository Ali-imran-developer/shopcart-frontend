import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const COOKIE_KEY = import.meta.env.VITE_APP_KEY;
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

class AuthController {
  static encrypt(data: Record<string, any>): string {
    const plaintext = JSON.stringify(data);
    return CryptoJS.AES.encrypt(plaintext, SECRET_KEY).toString();
  }

  static decrypt(cipherText: string): Record<string, any> {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedText);
    } catch (error) {
      console.error("Decryption failed:", error);
      return {};
    }
  }

  static get(): Record<string, any> {
    const encrypted = Cookies.get(COOKIE_KEY);
    return encrypted ? AuthController.decrypt(encrypted) : {};
  }

  static set(newData: Record<string, any>): void {
    const existingData = AuthController.get();
    const updatedData = { ...existingData, ...newData };
    const encrypted = AuthController.encrypt(updatedData);
    Cookies.set(COOKIE_KEY, encrypted, {
      secure: true,
      sameSite: "Strict",
    });
  }

  static remove(keys: string | string[]): void {
    const existingData = AuthController.get();
    const updatedData = { ...existingData };
    (Array.isArray(keys) ? keys : [keys]).forEach((key) => {
      delete updatedData[key];
    });
    const encrypted = AuthController.encrypt(updatedData);
    Cookies.set(COOKIE_KEY, encrypted, {
      secure: true,
      sameSite: "Strict",
    });
  }

  static clear(): void {
    Cookies.remove(COOKIE_KEY);
  }
}

export default AuthController;