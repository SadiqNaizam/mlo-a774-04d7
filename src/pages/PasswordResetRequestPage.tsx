import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import AuthLayoutHeader from '@/components/layout/AuthLayoutHeader'; // Custom component
import AuthLayoutFooter from '@/components/layout/AuthLayoutFooter'; // Custom component

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Though FormLabel will be used, direct Label might be useful contextually
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Mail, AlertTriangle, CheckCircle2 } from 'lucide-react';

const passwordResetRequestSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

type PasswordResetRequestFormValues = z.infer<typeof passwordResetRequestSchema>;

interface FormStatus {
  type: 'success' | 'error';
  message: string;
}

const PasswordResetRequestPage: React.FC = () => {
  const [formStatus, setFormStatus] = useState<FormStatus | null>(null);
  // const navigate = useNavigate(); // Not navigating away on success per user journey

  console.log('PasswordResetRequestPage loaded');

  const form = useForm<PasswordResetRequestFormValues>({
    resolver: zodResolver(passwordResetRequestSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: PasswordResetRequestFormValues) => {
    setFormStatus(null); // Clear previous status
    console.log('Password reset requested for email:', data.email);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demonstration purposes, always show a success-like message
    // In a real app, you would handle API responses (success/error)
    setFormStatus({
      type: 'success',
      message: "If an account with that email address exists, a password reset link has been sent. Please check your inbox (and spam folder).",
    });
    form.reset(); // Optionally reset form fields
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <AuthLayoutHeader />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Reset Your Password</CardTitle>
            <CardDescription>
              Enter your registered email address below, and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="pl-10" // Padding for the icon
                            {...field}
                            disabled={form.formState.isSubmitting}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
            </Form>
            {formStatus && (
              <Alert variant={formStatus.type === 'error' ? 'destructive' : 'default'} className={formStatus.type === 'success' ? 'border-green-500 text-green-700 dark:border-green-600 dark:text-green-400' : ''}>
                {formStatus.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                <AlertTitle>{formStatus.type === 'success' ? 'Request Sent' : 'Error'}</AlertTitle>
                <AlertDescription>{formStatus.message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2 text-sm">
            <p>
              Remember your password?{' '}
              <Link to="/" className="font-medium text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <AuthLayoutFooter />
    </div>
  );
};

export default PasswordResetRequestPage;