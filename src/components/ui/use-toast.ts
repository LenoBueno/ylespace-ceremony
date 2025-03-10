
// Re-export da implementação original do toast
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
