import Lottie from "lottie-react";
import notFound from "@assets/lottieFiles/notFount.json";
import loading from "@assets/lottieFiles/loading.json";
import error from "@assets/lottieFiles/error.json";
import empty from "@assets/lottieFiles/empty.json";
import success from "@assets/lottieFiles/success.json";

const lottieFilesMap = {
    notFound, // 'cause the key and value have the same name
    loading, 
    error, 
    empty,
    success
}
type LottieHandlerProps = {
    type: keyof typeof lottieFilesMap; //keys
    message?: string;
    className?: string;
}
const LottieHandler = ({type, message, className}: LottieHandlerProps) => {
    const lottie = lottieFilesMap[type]; // type is saved here as string
    const messageStyle = type === "error" ? {fontSize: "19px",color: "red", marginBottom: "50px"} : {fontSize: "19px"}
  return ( // jsx based on types and messages
    <div className={`d-flex flex-column align-items-center ${className}`}>
      <Lottie animationData={lottie} style={{width: "400px", marginBottom: "30px" }}/>
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  )
}

export default LottieHandler
