import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, describe, it, vi } from 'vitest';
import ServiceCard from '../components/ServiceCard';

const mockService = {
  id: 1,
  title: 'Test Service',
  url: 'test.local',
  status: 'online',
  category: 'Dev',
  ssl: true,
  tags: ['public']
};

describe('ServiceCard Component', () => {
  it('should render service details', () => {
    render(<ServiceCard service={mockService} onToggleStatus={vi.fn()} onDelete={vi.fn()} onEdit={vi.fn()} />);
    expect(screen.getByText('Test Service')).toBeInTheDocument();
    expect(screen.getByText('test.local')).toBeInTheDocument();
  });

  it('should handle edit button click', async () => {
    const mockOnEdit = vi.fn();
    render(<ServiceCard service={mockService} onToggleStatus={vi.fn()} onDelete={vi.fn()} onEdit={mockOnEdit} />);
    
    const editBtn = screen.getByTitle('Edit Service');
    await userEvent.click(editBtn);
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockService);
  });
});
