import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ImgHTMLAttributes } from 'react';
import CartItem from '@src/features/cart/components/CartItem/CartItem';
import { useCart } from '@src/features/cart/hooks/useCart';
import { mockedCartItem } from '@test/mocks/mockedCart';

vi.mock('@src/features/cart/hooks/useCart');

vi.mock('next/image', () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt ?? ''} {...props} />;
  },
}));

describe('CartItem', () => {
  const removeItemMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useCart).mockReturnValue({
      items: [],
      total: 0,
      removeItem: removeItemMock,
    });
  });

  it('should render item information correctly', () => {
    render(<CartItem item={mockedCartItem} />);

    expect(screen.getByText(mockedCartItem.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockedCartItem.storage} | ${mockedCartItem.color.name}`),
    ).toBeInTheDocument();
    expect(screen.getByText(`${mockedCartItem.price} EUR`)).toBeInTheDocument();
  });

  it('should render product image with correct alt text', () => {
    render(<CartItem item={mockedCartItem} />);
    const image = screen.getByRole('img', {
      name: mockedCartItem.name,
    });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockedCartItem.imageUrl);
  });

  it('should call removeItem when clicking remove button', () => {
    render(<CartItem item={mockedCartItem} />);
    fireEvent.click(screen.getByRole('button', { name: /eliminar/i }));

    expect(removeItemMock).toHaveBeenCalledTimes(1);
    expect(removeItemMock).toHaveBeenCalledWith(mockedCartItem);
  });
});
