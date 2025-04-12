import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | AnimeMarket',
  description: 'Browse our collection of anime merchandise, clothing, accessories, and collectibles.',
};

export default function ProductsLayout({
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