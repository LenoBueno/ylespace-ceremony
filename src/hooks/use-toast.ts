
// This file re-exports toast functionality from the UI component
import { useToast, toast } from "@/components/ui/use-toast";

// Export the hook and functions
export { useToast, toast };

// Re-export the types
export type { ToastProps, ToastActionElement } from "@/components/ui/use-toast";
