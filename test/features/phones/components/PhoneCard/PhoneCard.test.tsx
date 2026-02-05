import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PhoneCard from '@src/features/phones/components/PhoneCard/PhoneCard';
import { PhoneCardInfo } from '@src/features/phones/types/phone-card.types';

const mockPhone: PhoneCardInfo = {
  id: 'id1',
  brand: 'random brand',
  name: 'random name',
  imageUrl: '/random-image.jpg',
  basePrice: 1234,
};

describe('PhoneCard', () => {
  it('should render phone brand, name and price', () => {
    render(<PhoneCard phone={mockPhone} />);

    expect(screen.getByText('random brand')).toBeInTheDocument();
    expect(screen.getByText('random name')).toBeInTheDocument();
    expect(screen.getByText('1234 EUR')).toBeInTheDocument();
  });

  it('should render a link to the phone detail page', () => {
    render(<PhoneCard phone={mockPhone} />);

    const link = screen.getByRole('listitem', {
      name: /random brand random name, price 1234 euros/i,
    });

    expect(link).toHaveAttribute('href', '/phones/id1');
  });

  it('should render the product image with correct alt text', () => {
    render(<PhoneCard phone={mockPhone} />);

    const image = screen.getByAltText('random brand random name');
    expect(image).toBeInTheDocument();
  });
});
