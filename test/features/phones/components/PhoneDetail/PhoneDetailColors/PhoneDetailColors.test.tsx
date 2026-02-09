import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PhoneDetailColors from '@src/features/phones/components/PhoneDetail/PhoneDetailColors/PhoneDetailColors';
import { mockedColorOptions } from '@test/mocks/mockedPhones';

describe('PhoneDetailColors', () => {
  it('should render color options', () => {
    render(<PhoneDetailColors options={mockedColorOptions} selected={null} onSelect={vi.fn()} />);

    expect(screen.getByLabelText('Black')).toBeInTheDocument();
    expect(screen.getByLabelText('White')).toBeInTheDocument();
  });

  it('should call onSelect when color is selected', () => {
    const onSelect = vi.fn();

    render(<PhoneDetailColors options={mockedColorOptions} selected={null} onSelect={onSelect} />);

    fireEvent.click(screen.getByLabelText('Black'));

    expect(onSelect).toHaveBeenCalledWith(mockedColorOptions[0]);
  });

  it('should show selected color name', () => {
    render(
      <PhoneDetailColors
        options={mockedColorOptions}
        selected={mockedColorOptions[1]}
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByText('White')).toBeInTheDocument();
  });
});
