'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

interface ProtectedActionProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const ProtectedAction = ({ children, isAuthenticated }: ProtectedActionProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      e.stopPropagation();
      toast.error('Please sign-up to continue');
      router.push('/sign-up');
      return;
    }
  };

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  );
};

export default ProtectedAction; 