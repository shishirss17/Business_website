"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { LoginForm } from './login-form';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function LoginDialog({ open, onOpenChange, onSuccess }: LoginDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Welcome Back</DialogTitle>
          <DialogDescription>Sign in with your email or mobile number.</DialogDescription>
        </DialogHeader>
        <LoginForm onSuccess={() => {
          onOpenChange(false);
          onSuccess?.();
        }} />
      </DialogContent>
    </Dialog>
  );
}
