import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PhoneDetailInfo from '@src/features/phones/components/PhoneDetail/PhoneDetailInfo/PhoneDetailInfo';
import { cartService } from '@src/features/cart/services/cart.service';
import { mockedPhoneDetail } from '@test/mocks/mockedPhones';

vi.mock('@src/features/cart/services/cart.service', () => ({
  cartService: {
    addItem: vi.fn(),
  },
}));

vi.mock(
  '@src/features/phones/components/PhoneDetail/PhoneDetailStorage/PhoneDetailStorage',
  () => ({
    default: ({ onSelect }: { onSelect: (storage: string) => void }) => (
      <button onClick={() => onSelect('256 GB')}>select-storage</button>
    ),
  }),
);

vi.mock('@src/features/phones/components/PhoneDetail/PhoneDetailColors/PhoneDetailColors', () => ({
  default: ({
    onSelect,
  }: {
    onSelect: (color: { name: string; hexCode: string; imageUrl: string }) => void;
  }) => (
    <button
      onClick={() =>
        onSelect({
          name: 'Black',
          hexCode: '#000',
          imageUrl: '/img.png',
        })
      }
    >
      select-color
    </button>
  ),
}));

describe('PhoneDetailInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render phone name', () => {
    render(
      <PhoneDetailInfo
        phone={mockedPhoneDetail}
        finalPrice={1000}
        selectedColor={null}
        selectedStorage={null}
        onSelectColor={vi.fn()}
        onSelectStorage={vi.fn()}
        canAddToCart={false}
      />,
    );

    expect(screen.getByText('iPhone')).toBeInTheDocument();
  });

  it('should show "From X EUR" when no options are selected', () => {
    render(
      <PhoneDetailInfo
        phone={mockedPhoneDetail}
        finalPrice={1000}
        selectedColor={null}
        selectedStorage={null}
        onSelectColor={vi.fn()}
        onSelectStorage={vi.fn()}
        canAddToCart={false}
      />,
    );

    expect(screen.getByText('From 1000 EUR')).toBeInTheDocument();
  });

  it('should show final price when color and storage are selected', () => {
    render(
      <PhoneDetailInfo
        phone={mockedPhoneDetail}
        finalPrice={1000}
        selectedColor={mockedPhoneDetail.colorOptions[0]}
        selectedStorage="256 GB"
        onSelectColor={vi.fn()}
        onSelectStorage={vi.fn()}
        canAddToCart={true}
      />,
    );

    expect(screen.getByText('1000 EUR')).toBeInTheDocument();
  });

  it('should disable add to cart button when cannot add', () => {
    render(
      <PhoneDetailInfo
        phone={mockedPhoneDetail}
        finalPrice={1000}
        selectedColor={null}
        selectedStorage={null}
        onSelectColor={vi.fn()}
        onSelectStorage={vi.fn()}
        canAddToCart={false}
      />,
    );

    const button = screen.getByRole('button', { name: /añadir/i });
    expect(button).toBeDisabled();
  });

  it('should call cartService.addItem with correct payload', () => {
    render(
      <PhoneDetailInfo
        phone={mockedPhoneDetail}
        finalPrice={1000}
        selectedColor={mockedPhoneDetail.colorOptions[0]}
        selectedStorage="256 GB"
        onSelectColor={vi.fn()}
        onSelectStorage={vi.fn()}
        canAddToCart={true}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /añadir/i }));

    expect(cartService.addItem).toHaveBeenCalledWith({
      id: '1',
      brand: 'Apple',
      name: 'iPhone',
      imageUrl: 'img1',
      storage: '256 GB',
      color: {
        name: 'Black',
        hexCode: '#000',
      },
      price: 1000,
      quantity: 1,
    });
  });

  it('should NOT call cartService.addItem if color or storage is missing', () => {
    render(
      <PhoneDetailInfo
        phone={mockedPhoneDetail}
        finalPrice={1200}
        selectedColor={null}
        selectedStorage="256 GB"
        onSelectColor={vi.fn()}
        onSelectStorage={vi.fn()}
        canAddToCart={false}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /añadir/i }));

    expect(cartService.addItem).not.toHaveBeenCalled();
  });

  it('should call onSelectStorage and onSelectColor callbacks', () => {
    const onSelectStorage = vi.fn();
    const onSelectColor = vi.fn();

    render(
      <PhoneDetailInfo
        phone={mockedPhoneDetail}
        finalPrice={1000}
        selectedColor={null}
        selectedStorage={null}
        onSelectColor={onSelectColor}
        onSelectStorage={onSelectStorage}
        canAddToCart={false}
      />,
    );

    fireEvent.click(screen.getByText('select-storage'));
    fireEvent.click(screen.getByText('select-color'));

    expect(onSelectStorage).toHaveBeenCalledWith('256 GB');
    expect(onSelectColor).toHaveBeenCalledWith({
      name: 'Black',
      hexCode: '#000',
      imageUrl: '/img.png',
    });
  });
});
