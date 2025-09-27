import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

// Mock the TableComponent to avoid complex rendering in App tests
vi.mock('../components/TableComponent', () => ({
  default: () => <div data-testid="table-component">Table Component Mock</div>
}))

// Mock the HeaderComponent
vi.mock('../components/HeaderComponent', () => ({
  default: () => <div data-testid="header-component">Header Component Mock</div>
}))

describe('App', () => {
  it('renders the main application structure', () => {
    render(<App />)
    
    expect(screen.getByTestId('header-component')).toBeInTheDocument()
    expect(screen.getByTestId('table-component')).toBeInTheDocument()
  })

  it('renders with proper layout structure', () => {
    render(<App />)
    
    // Check that the main content area is present
    const content = screen.getByRole('main')
    expect(content).toBeInTheDocument()
  })

  it('includes all necessary components', () => {
    render(<App />)
    
    // Verify both main components are rendered
    expect(screen.getByText('Header Component Mock')).toBeInTheDocument()
    expect(screen.getByText('Table Component Mock')).toBeInTheDocument()
  })
})
