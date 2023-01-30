import { toast } from "react-toastify";

export const errorTypes = {
  0: { description: "Bad Request" },
  1: { description: "The user already exist" },
  2: { description: "Problem with password" },
  3: { description: "User not found" },
  4: { description: "Password incorrect" },
};

export default function displayToastErrorByErrorCode(errorCode) {
  toast.error(errorTypes[errorCode]?.description || "Error", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
