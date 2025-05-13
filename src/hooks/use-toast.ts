
import { toast as sonnerToast } from "sonner";

import type {
  ToastProps,
  ToastActionElement,
  ToastVariant,
} from "@/components/ui/toast";

const defaultToastVariants: {
  [key in ToastVariant]: Partial<ToastProps>;
} = {
  default: {},
  destructive: {
    variant: "destructive",
  },
};

type ToastParams = {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  action?: ToastActionElement;
};

export function toast({ title, description, variant = "default", action }: ToastParams) {
  return sonnerToast[variant === "destructive" ? "error" : "success"](title, {
    description,
    action,
  });
}

export const useToast = () => {
  return {
    toast,
  };
};
