import { ReactNode, AnchorHTMLAttributes } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CartEmpty from '@src/features/cart/components/CartEmpty/CartEmpty';


type MockLinkProps = {
  href: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: MockLinkProps) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('CartEmpty', () => {
  it('renders the empty cart title', () => {
    render(<CartEmpty />);

    expect(screen.getByRole('heading', { name: 'CART (0)' })).toBeInTheDocument();
  });

  it('renders continue shopping link with correct href', () => {
    render(<CartEmpty />);

    const link = screen.getByRole('link', {
      name: /continue shopping/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
