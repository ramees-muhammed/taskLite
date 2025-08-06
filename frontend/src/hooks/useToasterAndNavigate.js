import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useToasterAndNavigate = () => {
  const navigate = useNavigate();

  return (success, message, redirectPath = null) => {
    if (success) {
      toast.success(message || "Operation successful");
      if (redirectPath) navigate(redirectPath);
    } else {
      toast.error(message || "Something went wrong");
    }
  };
};

export default useToasterAndNavigate;