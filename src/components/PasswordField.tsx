import React, { useState, InputHTMLAttributes } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  label,
  containerClassName,
  labelClassName,
  inputClassName,
  buttonClassName,
  className, // className from InputHTMLAttributes will be passed to the input
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  console.log('PasswordField loaded for id:', id);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={cn("w-full space-y-1.5", containerClassName)}>
      {label && (
        <Label htmlFor={id} className={cn("text-sm font-medium", labelClassName)}>
          {label}
        </Label>
      )}
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          id={id}
          className={cn("pr-10", inputClassName, className)} // Ensure padding for the icon button
          {...props}
        />
        <Button
          type="button" // Prevents form submission if it's inside a form
          variant="ghost"
          size="icon"
          className={cn(
            "absolute inset-y-0 right-0 h-full px-3 flex items-center justify-center text-gray-500 hover:text-gray-700",
            buttonClassName
          )}
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
          tabIndex={-1} // Optional: to prevent tabbing to it if focus management is handled elsewhere
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default PasswordField;