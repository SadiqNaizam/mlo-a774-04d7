import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';

import AuthLayoutHeader from '@/components/layout/AuthLayoutHeader';
import AuthLayoutFooter from '@/components/layout/AuthLayoutFooter';
import PasswordField from '@/components/PasswordField';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const passwordResetConfirmSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Path to show the error on
});

type PasswordResetConfirmFormValues = z.infer<typeof passwordResetConfirmSchema>;

const PasswordResetConfirmPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null); // null: not checked, true: valid, false: invalid

  const token = searchParams.get('token');

  useEffect(() => {
    console.log('PasswordResetConfirmPage loaded');
    // Simulate token validation
    if (token) {
      console.log('Token found:', token);
      // In a real app, you'd validate this token with the backend here.
      // For simulation, let's assume tokens starting with 'valid' are good.
      if (token.startsWith('valid_token_')) {
        setTokenValid(true);
      } else {
        setTokenValid(false);
        setError("Invalid or expired password reset link. Please request a new one.");
        toast.error("Invalid or expired password reset link.");
      }
    } else {
      setTokenValid(false);
      setError("No password reset token found. Please use the link from your email.");
      toast.error("No password reset token found.");
    }
  }, [token]);

  const form = useForm<PasswordResetConfirmFormValues>({
    resolver: zodResolver(passwordResetConfirmSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: PasswordResetConfirmFormValues) => {
    if (!tokenValid) {
        setError("Cannot reset password due to an invalid or missing token.");
        toast.error("Cannot reset password due to an invalid or missing token.");
        return;
    }
    setIsLoading(true);
    setError(null);
    console.log("Password reset data:", data, "Token:", token);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success/failure
    const isSuccess = Math.random() > 0.2; // 80% success rate for demo

    if (isSuccess) {
      toast.success("Password successfully reset. Please log in with your new password.");
      navigate('/'); // Navigate to LoginPage (path "/" from App.tsx)
    } else {
      setError("Failed to reset password. The link might have expired or an unknown error occurred. Please try again.");
      toast.error("Failed to reset password. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <AuthLayoutHeader />
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Set New Password</CardTitle>
            <CardDescription>
              {tokenValid === false ? "There's an issue with your reset link." : "Enter your new password below."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {tokenValid === false && !error && (
                 <Alert variant="destructive" className="mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Invalid Link</AlertTitle>
                    <AlertDescription>
                        This password reset link is invalid or has expired. Please
                        <Link to="/password-reset-request" className="font-medium text-primary hover:underline ml-1">
                            request a new one
                        </Link>.
                    </AlertDescription>
                 </Alert>
            )}

            {tokenValid === true && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <PasswordField
                            id="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <PasswordField
                            id="confirmPassword"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading || tokenValid === false}>
                    {isLoading ? 'Setting Password...' : 'Set New Password'}
                  </Button>
                </form>
              </Form>
            )}
            {tokenValid === null && ( // Loading state while token is "validated"
                <div className="text-center py-4">
                    <p className="text-muted-foreground">Validating reset link...</p>
                </div>
            )}
          </CardContent>
        </Card>
      </main>
      <AuthLayoutFooter />
    </div>
  );
};

export default PasswordResetConfirmPage;