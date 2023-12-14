import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("fattyandcoPharmaUser"); // TODO: remove from session storage too
    dispatch({ type: "LOGOUT" });
  };
  return logout;
};
