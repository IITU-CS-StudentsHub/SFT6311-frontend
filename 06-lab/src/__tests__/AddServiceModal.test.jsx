import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, describe, it, vi } from 'vitest';
import AddServiceModal from '../components/AddServiceModal';

describe('AddServiceModal Component', () => {
  it('should render form fields when open', () => {
    render(<AddServiceModal isOpen={true} onClose={vi.fn()} onAdd={vi.fn()} />);
    expect(screen.getByText('Add New Service')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Some Service')).toBeInTheDocument();
  });

  it('should not render when isOpen is false', () => {
    const { container } = render(<AddServiceModal isOpen={false} onClose={vi.fn()} onAdd={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should call onAdd with form data when valid and submitted', async () => {
    const mockOnAdd = vi.fn();
    render(<AddServiceModal isOpen={true} onClose={vi.fn()} onAdd={mockOnAdd} />);
    
    await userEvent.type(screen.getByPlaceholderText('Some Service'), 'Test Service');
    await userEvent.type(screen.getByPlaceholderText('myapp.novitech.dev'), 'test.novitech.dev');
    
    const submitBtn = screen.getByRole('button', { name: /Add Service/i });
    expect(submitBtn).not.toBeDisabled();
    
    await userEvent.click(submitBtn);

    expect(mockOnAdd).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Test Service',
      url: 'test.novitech.dev'
    }));
  });

  it('should disable submit button when form is invalid', async () => {
    render(<AddServiceModal isOpen={true} onClose={vi.fn()} onAdd={vi.fn()} />);
    
    const submitBtn = screen.getByRole('button', { name: /Add Service/i });
    expect(submitBtn).toBeDisabled();
    
    await userEvent.type(screen.getByPlaceholderText('Some Service'), 'Te');
    expect(submitBtn).toBeDisabled();
  });
});
