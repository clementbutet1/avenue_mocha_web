import { toast } from "react-toastify";

export const errorTypes = {
  1: { description: "BadRequest" },
  2: { description: "The user already exist" },
  3: { description: "Problem with password" },
  4: { description: "User not found" },
  5: { description: "Auth successful" },
  6: { description: "Password incorrect"},
  7: { description: "Disconnect"},
  8: { description: "Disconnect success"},
};

export default function displayToastErrorByErrorCode(errorCode) {
  console.log(errorCode);
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
