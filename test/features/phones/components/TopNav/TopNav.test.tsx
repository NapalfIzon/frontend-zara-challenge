import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TopNav from '@src/features/phones/components/TopNav/TopNav';
import { useCartCount } from '@src/features/cart/hooks/useCartCount';

vi.mock('@src/features/cart/hooks/useCartCount');

describe('TopNav', () => {
  it('should render home link', () => {
    vi.mocked(useCartCount).mockReturnValue(0);

    render(<TopNav />);
    const homeLink = screen.getByRole('link', {
      name: /go to homepage/i,
    });

    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should render cart link with correct aria-label when cart is empty', () => {
    vi.mocked(useCartCount).mockReturnValue(0);

    render(<TopNav />);
    const cartLink = screen.getByRole('link', {
      name: /shopping cart with 0 items/i,
    });

    expect(cartLink).toBeInTheDocument();
  });

  it('should render cart link with correct aria-label when cart has items', () => {
    vi.mocked(useCartCount).mockReturnValue(3);

    render(<TopNav />);
    const cartLink = screen.getByRole('link', {
      name: /shopping cart with 3 items/i,
    });

    expect(cartLink).toBeInTheDocument();
  });
});
