import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Details | AnimeMarket',
  description: 'View detailed information about our anime merchandise, including specifications, pricing, and more.',
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen">
      {children}
    </section>
  );
}