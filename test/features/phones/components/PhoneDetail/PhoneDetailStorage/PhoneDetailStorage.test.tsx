import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PhoneDetailStorage from '@src/features/phones/components/PhoneDetail/PhoneDetailStorage/PhoneDetailStorage';
import { mockedStorageOptions } from '@test/mocks/mockedPhones';

describe('PhoneDetailStorage', () => {
  it('should render all storage options', () => {
    render(<PhoneDetailStorage options={mockedStorageOptions} selected={null} onSelect={vi.fn()} />);

    expect(screen.getByLabelText('128 GB')).toBeInTheDocument();
    expect(screen.getByLabelText('256 GB')).toBeInTheDocument();
  });

  it('should check the selected storage option', () => {
    render(<PhoneDetailStorage options={mockedStorageOptions} selected="256 GB" onSelect={vi.fn()} />);

    const radio = screen.getByLabelText('256 GB');
    expect(radio).toBeChecked();
  });

  it('should call onSelect when option is clicked', () => {
    const onSelect = vi.fn();

    render(<PhoneDetailStorage options={mockedStorageOptions} selected={null} onSelect={onSelect} />);

    fireEvent.click(screen.getByLabelText('128 GB'));
    expect(onSelect).toHaveBeenCalledWith('128 GB');
  });
});
