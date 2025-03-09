import { useAppDispatch } from "@store/hooks";
import styles from "./styles.module.css";
import { TToast } from "@types";
import { removeToast, stopDelayAppearance } from "@store/toasts/toastSlice";
import { useCallback, useEffect, useState } from "react";

const { toastItem } = styles;

const ToastItem = ({ id, title, message, type, delayAppearance, onCloseToast }: TToast) => {
  // toastItem has the children
  const dispatch = useAppDispatch();
  const [progressBarIndicator, setProgressBarIndicator] = useState(0);
  const [pauseProgressBarIndicator, setPauseProgrssBarIndicator] =
    useState(false);

  const progressBarScale = 100;
  const duration = 4000;
  const intervalTime = duration / progressBarScale;

  const closeToastHandler = useCallback(() => {
    dispatch(removeToast(id));
    onCloseToast?.() // if it's not undefined use it as a function
  }, [dispatch, id, onCloseToast]);

  const pauseProgressBarIndicatorHandler = () => {
    setPauseProgrssBarIndicator((prev) => !prev);
  };

  // progressBar calculate
  useEffect(() => {
    const timerId = setInterval(() => {
      if (delayAppearance) return;
      setProgressBarIndicator((prev) => { 
        if (prev < progressBarScale && !pauseProgressBarIndicator) {
          return prev + 1;
        }
        return prev;
      });
    }, intervalTime);
    return () => clearInterval(timerId);
  }, [intervalTime, delayAppearance, pauseProgressBarIndicator]);

  // close toast when progressBar 100%
  useEffect(() => {
    if (progressBarIndicator === progressBarScale) {
      closeToastHandler();
    }
  }, [progressBarIndicator, closeToastHandler]);

  // delay appearance handler
  useEffect(() => {
    if (delayAppearance) {
      const timerId = setTimeout(() => {
        dispatch(stopDelayAppearance(id)); // make it false after 1000 milliseconds
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [delayAppearance, dispatch, id]);

  // if delay is true return nothing
  if (delayAppearance) return "";

  return (
    <div
      className={`alert alert-${type} ${toastItem}`}
      onMouseEnter={pauseProgressBarIndicatorHandler}
      onMouseLeave={pauseProgressBarIndicatorHandler}
    >
      <h5>{title ? title : type}</h5>
      <p>{message}</p>
      <button className="btn-close" onClick={closeToastHandler}></button>
      <span
        className="placeholder"
        style={{
          width: `${progressBarIndicator}%`,
          transition: `width ${intervalTime}ms liner`,
        }}
      ></span>
    </div>
  );
};

export default ToastItem;
