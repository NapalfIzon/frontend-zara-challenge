import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from '@src/features/phones/components/SearchBar/SearchBar';

describe('SearchBar', () => {
  it('should render input with given value', () => {
    render(<SearchBar value="iphone" onChange={vi.fn()} />);

    expect(screen.getByDisplayValue('iphone')).toBeInTheDocument();
  });

  it('should call onChange when typing', () => {
    const onChange = vi.fn();

    render(<SearchBar value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'samsung' },
    });

    expect(onChange).toHaveBeenCalledWith('samsung');
  });

  it('should show clear button when value is not empty', () => {
    render(<SearchBar value="test" onChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: /clear search/i })).toBeInTheDocument();
  });

  it('should clear value and keep focus on input when clear button is clicked', () => {
    const onChange = vi.fn();

    render(<SearchBar value="test" onChange={onChange} />);
    const input = screen.getByRole('textbox');
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    input.focus();
    fireEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith('');
    expect(input).toHaveFocus();
  });
});
