
import { toast as sonnerToast } from "sonner";

export type ToastVariant = "default" | "destructive";

export interface ToastActionElement {
  altText?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export interface ToastProps {
  variant?: ToastVariant;
  title?: string;
  description?: string;
  action?: ToastActionElement;
  duration?: number;
}

const defaultToastVariants: {
  [key in ToastVariant]: Partial<ToastProps>;
} = {
  default: {},
  destructive: {
    variant: "destructive",
  },
};

export function toast({ title, description, variant = "default", action, duration }: ToastProps) {
  return sonnerToast[variant === "destructive" ? "error" : "success"](title, {
    description,
    action,
    duration,
  });
}

export const useToast = () => {
  return {
    toast,
    // Toaster component expects this property, but we're using sonner
    // Return an empty array since we're not tracking toasts locally
    toasts: [],
  };
};
