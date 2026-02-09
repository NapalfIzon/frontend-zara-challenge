import { render, screen, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { PhonesProvider, usePhones } from '@src/features/phones/context/PhonesContext';
import { phonesService } from '@src/features/phones/services/phones.service';
import { mockedPhones } from '@test/mocks/mockedPhones';

vi.mock('@src/features/phones/services/phones.service');

describe('PhonesContext', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should load phones on mount', async () => {
    vi.mocked(phonesService.getPhones).mockResolvedValue(mockedPhones);

    render(
      <PhonesProvider>
        <TestConsumer />
      </PhonesProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('count')).toHaveTextContent('2');
    });
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
    expect(screen.getByTestId('error')).toHaveTextContent('');
  });

  it('should set error when initial fetch fails', async () => {
    vi.mocked(phonesService.getPhones).mockRejectedValue(new Error('fail'));

    render(
      <PhonesProvider>
        <TestConsumer />
      </PhonesProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Failed to load phones');
    });
  });

  it('should filter phones when search term has 3 or more characters', async () => {
    vi.mocked(phonesService.getPhones).mockResolvedValue(mockedPhones);

    render(
      <PhonesProvider>
        <TestConsumer />
      </PhonesProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('count')).toHaveTextContent('2');
    });
    await act(async () => {
      screen.getByText('search').click();
    });
    await waitFor(() => {
      expect(screen.getByTestId('count')).toHaveTextContent('1');
    });
  });

  it('should clear phones when search term is shorter than 3 characters', async () => {
    vi.mocked(phonesService.getPhones).mockResolvedValue(mockedPhones);

    render(
      <PhonesProvider>
        <TestConsumer />
      </PhonesProvider>,
    );
    await act(async () => {
      screen.getByText('short').click();
    });

    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('should reset phones when search term is cleared', async () => {
    vi.mocked(phonesService.getPhones).mockResolvedValue(mockedPhones);

    render(
      <PhonesProvider>
        <TestConsumer />
      </PhonesProvider>,
    );
    await act(async () => {
      screen.getByText('search').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('count')).toHaveTextContent('1');
    });

    await act(async () => {
      screen.getByText('reset').click();
    });
    await waitFor(() => {
      expect(screen.getByTestId('count')).toHaveTextContent('2');
    });
  });

  it('should set error when search request fails', async () => {
    vi.mocked(phonesService.getPhones)
      .mockResolvedValueOnce(mockedPhones)
      .mockRejectedValueOnce(new Error('search error'));

    render(
      <PhonesProvider>
        <TestConsumer />
      </PhonesProvider>,
    );
    await act(async () => {
      screen.getByText('search').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Search failed');
    });
  });

  it('should throw if usePhones is used outside provider', () => {
    expect(() => render(<TestConsumer />)).toThrow(
      '🛑 usePhones must be used within PhonesProvider',
    );
  });
});

const TestConsumer = () => {
  const { phones, loading, error, searchTerm, setSearchTerm } = usePhones();

  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="error">{error ?? ''}</span>
      <span data-testid="count">{phones.length}</span>
      <span data-testid="search">{searchTerm}</span>

      <button onClick={() => setSearchTerm('sam')}>search</button>
      <button onClick={() => setSearchTerm('')}>reset</button>
      <button onClick={() => setSearchTerm('sa')}>short</button>
    </div>
  );
};
