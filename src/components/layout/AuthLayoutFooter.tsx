import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const AuthLayoutFooter: React.FC = () => {
  console.log('AuthLayoutFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 px-4 sm:px-6 lg:px-8 bg-background border-t">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <div className="flex justify-center items-center gap-4 mb-2">
          <Link to="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <Link to="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
        <p>&copy; {currentYear} SecureAuth App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default AuthLayoutFooter;