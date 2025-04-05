import { isAxiosError } from "axios";
const axiosErrorHandler = (error: unknown) => {
  if (isAxiosError(error))
    return (
      error.response?.data || error.response?.data.message || error.message || "An unexpected error"
    );
  else return "An unexpected error";
};
export default axiosErrorHandler;
