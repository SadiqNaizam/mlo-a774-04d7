import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

// Custom Components
import AuthLayoutHeader from '@/components/layout/AuthLayoutHeader';
import AuthLayoutFooter from '@/components/layout/AuthLayoutFooter';
import PasswordField from '@/components/PasswordField';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginPage: React.FC = () => {
  console.log('LoginPage loaded');
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoginError(null);
    console.log('Login form submitted:', data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (data.email === 'user@example.com' && data.password === 'password123') {
      toast.success('Login Successful!', {
        description: 'You will be redirected shortly.',
      });
      // In a real app, you'd redirect to a dashboard or authenticated area.
      // navigate('/dashboard'); // Example, if /dashboard route existed
      // For now, as App.tsx has no specific dashboard route, we'll just show success.
      // Optionally, reset form or navigate to '/':
      form.reset();
      // navigate('/'); // Navigating to '/' (LoginPage) might not be desired after login.
    } else {
      const errorMessage = 'Invalid email or password. Please try again.';
      setLoginError(errorMessage);
      toast.error('Login Failed', {
        description: errorMessage,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <AuthLayoutHeader />
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      {/* Using custom PasswordField */}
                      <PasswordField
                        id="password"
                        label="Password"
                        placeholder="••••••••"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {loginError && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Login Error</AlertTitle>
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <Link
              to="/password-reset-request" // Path from App.tsx
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
            {/* 
            Could add a registration link here if needed in the future, e.g.:
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Sign Up
              </Link>
            </p>
            */}
          </CardFooter>
        </Card>
      </main>
      <AuthLayoutFooter />
    </div>
  );
};

export default LoginPage;