
// This file re-exports from the hooks folder to maintain compatibility
import { 
  useToast,
  toast,
  reducer
} from "../../hooks/use-toast";

import type { 
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
