import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import CartList from '@src/features/cart/components/CartList/CartList';
import { useCart } from '@src/features/cart/hooks/useCart';
import { mockedCartItem } from '@test/mocks/mockedCart';

vi.mock('@src/features/cart/hooks/useCart');

vi.mock('@src/features/cart/components/CartItem/CartItem', () => ({
  default: ({ item }: { item: typeof mockedCartItem }) => (
    <li data-testid="cart-item">{item.name}</li>
  ),
}));

vi.mock('@src/features/cart/components/CartSummary/CartSummary', () => ({
  default: () => <div data-testid="cart-summary" />,
}));

describe('CartList', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render title with correct cart count', () => {
    vi.mocked(useCart).mockReturnValue({
      items: [mockedCartItem],
      total: mockedCartItem.price,
      removeItem: vi.fn(),
    });

    render(<CartList />);

    expect(screen.getByRole('heading', { name: 'CART (1)' })).toBeInTheDocument();
  });

  it('should render a CartItem for each item in the cart', () => {
    vi.mocked(useCart).mockReturnValue({
      items: [mockedCartItem, { ...mockedCartItem, id: 'IPH-15PM' }],
      total: 0,
      removeItem: vi.fn(),
    });

    render(<CartList />);

    expect(screen.getAllByTestId('cart-item')).toHaveLength(2);
  });

  it('should render CartSummary in the footer', () => {
    vi.mocked(useCart).mockReturnValue({
      items: [],
      total: 0,
      removeItem: vi.fn(),
    });

    render(<CartList />);

    expect(screen.getByTestId('cart-summary')).toBeInTheDocument();
  });

  it('should render correctly when cart is empty', () => {
    vi.mocked(useCart).mockReturnValue({
      items: [],
      total: 0,
      removeItem: vi.fn(),
    });

    render(<CartList />);

    expect(screen.getByRole('heading', { name: 'CART (0)' })).toBeInTheDocument();
    expect(screen.queryAllByTestId('cart-item')).toHaveLength(0);
  });
});
