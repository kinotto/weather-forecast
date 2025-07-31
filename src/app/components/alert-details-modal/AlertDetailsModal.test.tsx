import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlertDetailsModal from './AlertDetailsModal';
import { AlertFeature } from '@/app/model/alert';

const mockAlert = {
  id: '1',
  properties: {
    event: 'Tornado Warning',
    severity: 'Extreme',
    effective: '2024-07-30T10:00:00Z',
    expires: '2024-07-30T12:00:00Z',
    areaDesc: 'Midwest region',
    headline: 'Severe tornado expected',
    description: 'A tornado is expected to hit the area soon.',
    instruction: 'Take shelter immediately.'
  }
} as AlertFeature

describe('AlertDetailsModal', () => {
  it('renders alert details correctly', () => {
    render(<AlertDetailsModal alert={mockAlert} onClose={jest.fn()} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Tornado Warning')).toBeInTheDocument();
    expect(screen.getByText(/Severity:/)).toBeInTheDocument();
    expect(screen.getByText(/Effective:/)).toBeInTheDocument();
    expect(screen.getByText(/Expires:/)).toBeInTheDocument();
    expect(screen.getByText(/Area:/)).toBeInTheDocument();
    expect(screen.getByText(/Headline:/)).toBeInTheDocument();
    expect(screen.getByText(/Description:/)).toBeInTheDocument();
    expect(screen.getByText(/Instruction:/)).toBeInTheDocument();
  });

  it('calls onClose when clicking outside the modal', () => {
    const onClose = jest.fn();
    render(<AlertDetailsModal alert={mockAlert} onClose={onClose} />);
    fireEvent.click(screen.getByRole('dialog')); // overlay click
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when clicking the close button', () => {
    const onClose = jest.fn();
    render(<AlertDetailsModal alert={mockAlert} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText(/close modal/i));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when pressing Escape', () => {
    const onClose = jest.fn();
    render(<AlertDetailsModal alert={mockAlert} onClose={onClose} />);
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
