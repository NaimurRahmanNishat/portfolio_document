// src/app/(common)/layout.tsx
import React from 'react';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout;
