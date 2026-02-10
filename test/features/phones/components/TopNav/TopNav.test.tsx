import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TopNav from '@src/features/phones/components/TopNav/TopNav';
import { useCart } from '@src/features/cart/hooks/useCart';

vi.mock('@src/features/cart/hooks/useCart');

describe('TopNav', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render home link', () => {
    vi.mocked(useCart).mockReturnValue({
      items: [],
      total: 0,
      removeItem: vi.fn(),
    });

    render(<TopNav />);

    const homeLink = screen.getByRole('link', {
      name: /go to homepage/i,
    });

    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should render cart link with correct aria-label when cart is empty', () => {
    vi.mocked(useCart).mockReturnValue({
      items: [],
      total: 0,
      removeItem: vi.fn(),
    });

    render(<TopNav />);

    const cartLink = screen.getByRole('link', {
      name: /shopping cart with 0 items/i,
    });

    expect(cartLink).toBeInTheDocument();
  });

  it('should render cart link with correct aria-label when cart has items', () => {
    vi.mocked(useCart).mockReturnValue({
      items: [{ id: '1' }, { id: '2' }, { id: '3' }] as ReturnType<typeof useCart>['items'],
      total: 0,
      removeItem: vi.fn(),
    });

    render(<TopNav />);

    const cartLink = screen.getByRole('link', {
      name: /shopping cart with 3 items/i,
    });

    expect(cartLink).toBeInTheDocument();
  });
});
