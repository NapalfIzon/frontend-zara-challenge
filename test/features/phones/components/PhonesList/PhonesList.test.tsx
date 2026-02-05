import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PhonesList from '@src/features/phones/components/PhonesList/PhonesList';
import { usePhones } from '@src/features/phones/context/PhonesContext';

vi.mock('@src/features/phones/context/PhonesContext');

const mockPhones = Array.from({ length: 20 }).map((_, index) => ({
  id: `phone-${index}`,
  brand: 'random brand',
  name: `random phone ${index}`,
  imageUrl: '/test.jpg',
  basePrice: 100 + index,
}));

describe('PhonesList', () => {
  it('should render loading state', () => {
    vi.mocked(usePhones).mockReturnValue({
      phones: [],
      loading: true,
      error: null,
      searchTerm: '',
      setSearchTerm: vi.fn(),
    });

    render(<PhonesList />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should render error state', () => {
    vi.mocked(usePhones).mockReturnValue({
      phones: [],
      loading: false,
      error: 'Failed to load phones',
      searchTerm: '',
      setSearchTerm: vi.fn(),
    });

    render(<PhonesList />);

    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load phones');
  });

  it('should render a list of phone cards (paginated)', () => {
    vi.mocked(usePhones).mockReturnValue({
      phones: mockPhones,
      loading: false,
      error: null,
      searchTerm: '',
      setSearchTerm: vi.fn(),
    });

    render(<PhonesList />);

    const links = screen.getAllByRole('listitem');

    expect(links.length).toBe(20);
    expect(screen.getByText('20 RESULTS')).toBeInTheDocument();
  });
});
