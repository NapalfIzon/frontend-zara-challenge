import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { PhonesProvider } from '@src/features/phones/context/PhonesContext';

import './globals.scss';


export const metadata: Metadata = {
  title: 'Frontend Zara Challenge',
  description: 'Frontend technical challenge – smartphones e-commerce',
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="es">
      <body>
        <PhonesProvider>{children}</PhonesProvider>
      </body>
    </html>
  );
};

export default RootLayout;
