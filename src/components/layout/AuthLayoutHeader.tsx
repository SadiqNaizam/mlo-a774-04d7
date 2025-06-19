import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react'; // Using ShieldCheck as a representative icon

const AuthLayoutHeader: React.FC = () => {
  console.log('AuthLayoutHeader loaded');

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-background border-b">
      <div className="container mx-auto flex items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
          <ShieldCheck className="h-7 w-7" />
          <span>SecureAuth App</span>
        </Link>
        {/* No navigation links as per description for a minimal auth header */}
      </div>
    </header>
  );
};

export default AuthLayoutHeader;