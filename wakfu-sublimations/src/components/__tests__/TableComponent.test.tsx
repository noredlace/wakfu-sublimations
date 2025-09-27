import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TableComponent from '../TableComponent'
import { mockSublimations } from '../../test/utils'

// Mock the sublimations data
vi.mock('../../assets/data/sublimations.json', () => ({
  default: mockSublimations
}))

// Mock socket images
vi.mock('/RedSocket.png', () => 'red-socket-mock')
vi.mock('/BlueSocket.png', () => 'blue-socket-mock')
vi.mock('/GreenSocket.png', () => 'green-socket-mock')
vi.mock('/YellowSocket.png', () => 'yellow-socket-mock')

describe('TableComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('renders the component with sublimations data', () => {
      render(<TableComponent activeTab="regular" />)
      
      expect(screen.getByText('Sublimations')).toBeInTheDocument()
      expect(screen.getByText('Test Sublimation 1')).toBeInTheDocument()
      expect(screen.getByText('Test Sublimation 2')).toBeInTheDocument()
      expect(screen.getByText('Yellow Wild Sublimation')).toBeInTheDocument()
    })

    it('renders socket filter controls', () => {
      render(<TableComponent activeTab="regular" />)
      
      expect(screen.getByText('Socket Filtering:')).toBeInTheDocument()
      expect(screen.getByText('Reset Socket Order')).toBeInTheDocument()
      
      // Check for socket position numbers
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('4')).toBeInTheDocument()
    })

    it('renders search functionality', () => {
      render(<TableComponent activeTab="regular" />)
      
      const searchInput = screen.getByPlaceholderText('Search sublimations...')
      expect(searchInput).toBeInTheDocument()
    })

    it('renders data table with correct headers', () => {
      render(<TableComponent activeTab="regular" />)
      
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Socket')).toBeInTheDocument()
      expect(screen.getByText('Tier 1')).toBeInTheDocument()
      expect(screen.getByText('Tier 2')).toBeInTheDocument()
      expect(screen.getByText('Tier 3')).toBeInTheDocument()
      expect(screen.getByText('Max Level')).toBeInTheDocument()
      expect(screen.getByText('Obtained From')).toBeInTheDocument()
      expect(screen.getByText('Since Patch')).toBeInTheDocument()
      expect(screen.getByText('Notes')).toBeInTheDocument()
    })
  })

  describe('Search Functionality', () => {
    it('filters sublimations by name', async () => {
      const user = userEvent.setup()
      render(<TableComponent activeTab="regular" />)
      
      const searchInput = screen.getByPlaceholderText('Search sublimations...')
      await user.type(searchInput, 'Test Sublimation 1')
      
      expect(screen.getByText('Test Sublimation 1')).toBeInTheDocument()
      expect(screen.queryByText('Test Sublimation 2')).not.toBeInTheDocument()
      expect(screen.queryByText('Yellow Wild Sublimation')).not.toBeInTheDocument()
    })

    it('filters sublimations by socket pattern', async () => {
      const user = userEvent.setup()
      render(<TableComponent activeTab="regular" />)
      
      const searchInput = screen.getByPlaceholderText('Search sublimations...')
      await user.type(searchInput, 'RBG')
      
      expect(screen.getByText('Test Sublimation 1')).toBeInTheDocument()
      expect(screen.queryByText('Test Sublimation 2')).not.toBeInTheDocument()
    })

    it('filters sublimations by tier effect', async () => {
      const user = userEvent.setup()
      render(<TableComponent activeTab="regular" />)
      
      const searchInput = screen.getByPlaceholderText('Search sublimations...')
      await user.type(searchInput, 'tier 1 effect')
      
      expect(screen.getByText('Test Sublimation 1')).toBeInTheDocument()
      expect(screen.queryByText('Test Sublimation 2')).not.toBeInTheDocument()
    })

    it('filters sublimations by source', async () => {
      const user = userEvent.setup()
      render(<TableComponent activeTab="regular" />)
      
      const searchInput = screen.getByPlaceholderText('Search sublimations...')
      await user.type(searchInput, 'Test Source')
      
      expect(screen.getByText('Test Sublimation 1')).toBeInTheDocument()
      expect(screen.queryByText('Test Sublimation 2')).not.toBeInTheDocument()
    })

    it('clears search results when input is cleared', async () => {
      const user = userEvent.setup()
      render(<TableComponent activeTab="regular" />)
      
      const searchInput = screen.getByPlaceholderText('Search sublimations...')
      await user.type(searchInput, 'Test Sublimation 1')
      
      expect(screen.getByText('Test Sublimation 1')).toBeInTheDocument()
      expect(screen.queryByText('Test Sublimation 2')).not.toBeInTheDocument()
      
      await user.clear(searchInput)
      
      expect(screen.getByText('Test Sublimation 1')).toBeInTheDocument()
      expect(screen.getByText('Test Sublimation 2')).toBeInTheDocument()
      expect(screen.getByText('Yellow Wild Sublimation')).toBeInTheDocument()
    })
  })

  describe('Socket Filtering', () => {
    it('shows all results when no socket filters are set', () => {
      render(<TableComponent activeTab="regular" />)
      
      expect(screen.getByText('Test Sublimation 1')).toBeInTheDocument()
      expect(screen.getByText('Test Sublimation 2')).toBeInTheDocument()
      expect(screen.getByText('Yellow Wild Sublimation')).toBeInTheDocument()
    })

    it('shows all results when less than 3 socket filters are set', async () => {
      const user = userEvent.setup()
      render(<TableComponent activeTab="regular" />)
      
      // Set only 2 socket filters
      const socketSelects = screen.getAllByRole('combobox')
      await user.selectOptions(socketSelects[0], 'R')
      await user.selectOptions(socketSelects[1], 'B')
      
      // Should still show all results
      expect(screen.getByText('Test Sublimation 1')).toBeInTheDocument()
      expect(screen.getByText('Test Sublimation 2')).toBeInTheDocument()
      expect(screen.getByText('Yellow Wild Sublimation')).toBeInTheDocument()
    })

    it('filters by exact 3-socket pattern', async () => {
      const user = userEvent.setup()
      render(<TableComponent activeTab="regular" />)
      
      // Set 3 socket filters: R, B, G
      const socketSelects = screen.getAllByRole('combobox')
      await user.selectOptions(socketSelects[0], 'R')
      await user.selectOptions(socketSelects[1], 'B')
      await user.selectOptions(socketSelects[2], 'G')
      
      // Should show only Test Sublimation 1 (RBG)
      expect(screen.getByText('Test Sublimation 1')).toBeInTheDocument()
      expect(screen.queryByText('Test Sublimation 2')).not.toBeInTheDocument()
      expect(screen.queryByText('Yellow Wild Sublimation')).not.toBeInTheDocument()
    })

    it('filters by 4-socket pattern using sliding window', async () => {
      const user = userEvent.setup()
      render(<TableComponent activeTab="regular" />)
      
      // Set 4 socket filters: R, R, B, B
      const socketSelects = screen.getAllByRole('combobox')
      await user.selectOptions(socketSelects[0], 'R')
      await user.selectOptions(socketSelects[1], 'R')
      await user.selectOptions(socketSelects[2], 'B')
      await user.selectOptions(socketSelects[3], 'B')
      
      // Should show sublimations that match RRB or RBB
      // Since our test data doesn't have RRB or RBB patterns, no results should show
      expect(screen.queryByText('Test Sublimation 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Test Sublimation 2')).not.toBeInTheDocument()
      expect(screen.queryByText('Yellow Wild Sublimation')).not.toBeInTheDocument()
    })

    it('handles yellow wild card sockets', async () => {
      const user = userEvent.setup()
      render(<TableComponent activeTab="regular" />)
      
      // Set 3 socket filters: Y, R, B (Y is wild)
      const socketSelects = screen.getAllByRole('combobox')
      await user.selectOptions(socketSelects[0], 'Y')
      await user.selectOptions(socketSelects[1], 'R')
      await user.selectOptions(socketSelects[2], 'B')
      
      // Should show Yellow Wild Sublimation (YRB)
      expect(screen.queryByText('Test Sublimation 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Test Sublimation 2')).not.toBeInTheDocument()
      expect(screen.getByText('Yellow Wild Sublimation')).toBeInTheDocument()
    })

    it('resets socket filters when reset button is clicked', async () => {
      const user = userEvent.setup()
      render(<TableComponent activeTab="regular" />)
      
      // Set some socket filters
      const socketSelects = screen.getAllByRole('combobox')
      await user.selectOptions(socketSelects[0], 'R')
      await user.selectOptions(socketSelects[1], 'B')
      await user.selectOptions(socketSelects[2], 'G')
      
      // Verify filtering is working
      expect(screen.getByText('Test Sublimation 1')).toBeInTheDocument()
      expect(screen.queryByText('Test Sublimation 2')).not.toBeInTheDocument()
      
      // Click reset button
      const resetButton = screen.getByText('Reset Socket Order')
      await user.click(resetButton)
      
      // Should show all results again
      expect(screen.getByText('Test Sublimation 1')).toBeInTheDocument()
      expect(screen.getByText('Test Sublimation 2')).toBeInTheDocument()
      expect(screen.getByText('Yellow Wild Sublimation')).toBeInTheDocument()
    })
  })

  describe('Socket Image Rendering', () => {
    it('renders socket images correctly', () => {
      render(<TableComponent activeTab="regular" />)
      
      // Check that socket images are rendered in the table
      const socketImages = screen.getAllByAltText(/Socket$/)
      expect(socketImages.length).toBeGreaterThan(0)
    })

    it('renders socket images in filter controls', async () => {
      const user = userEvent.setup()
      render(<TableComponent activeTab="regular" />)
      
      // Set a socket filter
      const socketSelects = screen.getAllByRole('combobox')
      await user.selectOptions(socketSelects[0], 'R')
      
      // Check that the socket image appears in the filter
      const filterSocketImages = screen.getAllByAltText('R Socket')
      expect(filterSocketImages.length).toBeGreaterThan(0)
    })
  })

  describe('Data Source Link', () => {
    it('renders data source link with correct attributes', () => {
      render(<TableComponent activeTab="regular" />)
      
      const dataSourceLink = screen.getByText('Data Source')
      expect(dataSourceLink).toBeInTheDocument()
      expect(dataSourceLink).toHaveAttribute('href', 'https://www.wakfu.com/en/forum/143-guides/241241-updated-sublimations')
      expect(dataSourceLink).toHaveAttribute('target', '_blank')
      expect(dataSourceLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Combined Search and Socket Filtering', () => {
    it('combines search and socket filtering correctly', async () => {
      const user = userEvent.setup()
      render(<TableComponent activeTab="regular" />)
      
      // Set search term
      const searchInput = screen.getByPlaceholderText('Search sublimations...')
      await user.type(searchInput, 'Test')
      
      // Set socket filters
      const socketSelects = screen.getAllByRole('combobox')
      await user.selectOptions(socketSelects[0], 'R')
      await user.selectOptions(socketSelects[1], 'B')
      await user.selectOptions(socketSelects[2], 'G')
      
      // Should only show Test Sublimation 1 (matches both search and socket pattern)
      expect(screen.getByText('Test Sublimation 1')).toBeInTheDocument()
      expect(screen.queryByText('Test Sublimation 2')).not.toBeInTheDocument()
      expect(screen.queryByText('Yellow Wild Sublimation')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels and roles', () => {
      render(<TableComponent activeTab="regular" />)
      
      // Check for search input accessibility
      const searchInput = screen.getByPlaceholderText('Search sublimations...')
      expect(searchInput).toBeInTheDocument()
      
      // Check for table accessibility
      const table = screen.getByRole('table')
      expect(table).toBeInTheDocument()
      
      // Check for button accessibility
      const resetButton = screen.getByRole('button', { name: /Reset Socket Order/i })
      expect(resetButton).toBeInTheDocument()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<TableComponent activeTab="regular" />)
      
      // Test tab navigation
      await user.tab()
      expect(screen.getByPlaceholderText('Search sublimations...')).toHaveFocus()
      
      // Test enter key on reset button
      const resetButton = screen.getByText('Reset Socket Order')
      resetButton.focus()
      await user.keyboard('{Enter}')
      // Should not throw any errors
    })
  })
})
