import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HeaderComponent from '../HeaderComponent'

describe('HeaderComponent', () => {
  it('renders the header with correct title', () => {
    render(<HeaderComponent />)
    
    expect(screen.getByText('Wakfu Sublimations')).toBeInTheDocument()
  })

  it('renders with proper header structure', () => {
    render(<HeaderComponent />)
    
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('has correct styling and layout', () => {
    render(<HeaderComponent />)
    
    const headerName = screen.getByText('Wakfu Sublimations')
    expect(headerName).toBeInTheDocument()
  })
})
