import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { Filter } from '@/app/model/alert';

describe('Header component', () => {
  const mockOnSortChange = jest.fn();
  const mockOnSearchChange = jest.fn();
  const mockOnFromChange = jest.fn();
  const mockOnToChange = jest.fn();

  const setup = () => {
    render(
      <Header
        sortBy={Filter.event}
        onSortChange={mockOnSortChange}
        searchQuery=""
        onSearchChange={mockOnSearchChange}
        fromDate={null}
        toDate={null}
        onFromChange={mockOnFromChange}
        onToChange={mockOnToChange}
      />
    );
  };

  it('renders title and icon', () => {
    setup();
    expect(screen.getByRole('heading', { name: /weather forecast/i })).toBeInTheDocument();
    expect(screen.getByTitle('Weather')).toBeInTheDocument();
  });

  it('calls onSortChange when sort option is changed', () => {
    setup();
    fireEvent.change(screen.getByLabelText(/sort alerts/i), {
      target: { value: Filter.severity }
    });
    expect(mockOnSortChange).toHaveBeenCalledWith(Filter.severity);
  });

  it('calls onSearchChange when typing in the search input', () => {
    setup();
    const searchInput = screen.getByLabelText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'storm' } });
    expect(mockOnSearchChange).toHaveBeenCalledWith('storm');
  });

  it('renders date pickers', () => {
    setup();
    expect(screen.getByPlaceholderText(/from/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/to/i)).toBeInTheDocument();
  });
});
