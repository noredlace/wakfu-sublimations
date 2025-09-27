import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import HeaderComponent from '../HeaderComponent'

// Mock props for testing
const mockProps = {
  activeTab: 'regular' as const,
  onTabChange: vi.fn()
}

describe('HeaderComponent', () => {
  it('renders the header with correct title', () => {
    render(<HeaderComponent {...mockProps} />)
    
    expect(screen.getByText('Wakfu Sublimations')).toBeInTheDocument()
  })

  it('renders with proper header structure', () => {
    render(<HeaderComponent {...mockProps} />)
    
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('has correct styling and layout', () => {
    render(<HeaderComponent {...mockProps} />)
    
    const headerName = screen.getByText('Wakfu Sublimations')
    expect(headerName).toBeInTheDocument()
  })

  it('renders navigation tabs', () => {
    render(<HeaderComponent {...mockProps} />)
    
    expect(screen.getByText('Sublimations')).toBeInTheDocument()
    expect(screen.getByText('Epic Sublimations')).toBeInTheDocument()
    expect(screen.getByText('Relic Sublimations')).toBeInTheDocument()
  })

  it('highlights the active tab', () => {
    render(<HeaderComponent {...mockProps} />)
    
    const activeTab = screen.getByText('Sublimations')
    expect(activeTab.closest('a')).toHaveAttribute('aria-current', 'page')
  })
})
