// COMPONENTS
import SignInForm from "@/_auth/forms/SignInForm";
import { useUserContext } from "@/context/AuthContext";
// CONTEXTS
import { useDialog } from "@/context/DialogContext";

const useAuth = (callback: (e: React.SyntheticEvent) => void) => {
  const { isAuthenticated } = useUserContext();
  const { dispatch } = useDialog();
  
  // Define the handleAuth function that checks the authentication status and invokes the callback function
  const handleAuth = async (e: React.SyntheticEvent) => {
    if (isAuthenticated) {
      callback(e);
    } else {
      dispatch({
        type: "OPEN_DIALOG",
        payload: {
          children: <SignInForm/>,
        },
      });
    }
  };
  
  // Return the handleAuth function from the hook
  return handleAuth;
};

export default useAuth;
