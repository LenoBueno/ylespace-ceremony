
// Re-export from the core implementation to avoid circular dependencies
import { 
  useToast,
  toast,
  reducer,
  ToastProps,
  ToastActionElement
} from "../../hooks/use-toast";

export { 
  useToast,
  toast,
  reducer
};

export type {
  ToastProps,
  ToastActionElement
};
