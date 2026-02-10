import type { ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CartSummary from '@src/features/cart/components/CartSummary/CartSummary';
import { useCart } from '@src/features/cart/hooks/useCart';

vi.mock('@src/features/cart/hooks/useCart');

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: ComponentProps<'a'>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('CartSummary', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useCart).mockReturnValue({
      items: [],
      total: 1329,
      removeItem: vi.fn(),
    });
  });

  it('should render the total amount correctly', () => {
    render(<CartSummary />);

    expect(screen.getByText('TOTAL')).toBeInTheDocument();
    expect(screen.getByText('1329 EUR')).toBeInTheDocument();
  });

  it('should render the continue shopping link with correct href', () => {
    render(<CartSummary />);

    const link = screen.getByRole('link', {
      name: /continue shopping/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('should render the pay button', () => {
    render(<CartSummary />);

    expect(screen.getByRole('button', { name: /pay/i })).toBeInTheDocument();
  });
});
