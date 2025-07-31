import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AlertGrid from './AlertGrid'
import { AlertFeature, AlertProperties } from '@/app/model/alert'

// Mock formatDateLocal for consistent output in tests
jest.mock('../../utils/utility', () => ({
  formatDateLocal: (date: string) => `formatted-${date}`,
}))

const alerts: AlertFeature[] = [
  {
    id: '1',
    type: "Feature",
    properties: {
      event: 'Event One',
      severity: 'Severe',
      areaDesc: 'Area Description One',
      effective: '2025-01-01T00:00:00Z',
      expires: '2025-01-02T00:00:00Z',
      headline: 'Headline One',
    } as AlertProperties
  },
  {
    id: '2',
    type: "Feature",
    properties: {
      event: 'Event Two',
      severity: 'Moderate',
      areaDesc: 'Area Description Two',
      effective: '2025-01-03T00:00:00Z',
      expires: '2025-01-04T00:00:00Z',
      headline: 'Headline Two',
    } as AlertProperties,
  },
]

describe('AlertGrid', () => {
  it('renders alert rows correctly', () => {
    render(<AlertGrid alerts={alerts} onSelectAlert={jest.fn()} />)

    // The header columns
    expect(screen.getByRole('columnheader', { name: /event/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /severity/i })).toBeInTheDocument()

    // Alert events should be rendered (react-window renders only visible items, so 2 here)
    expect(screen.getByText('Event One')).toBeInTheDocument()
    expect(screen.getByText('Event Two')).toBeInTheDocument()

    // Severity badges with correct text and class
    expect(screen.getByText('Severe')).toHaveClass('alert-grid-severity-severe')
    expect(screen.getByText('Moderate')).toHaveClass('alert-grid-severity-moderate')

    // Formatted dates from mock
    expect(screen.getAllByText(/^formatted-/).length).toBeGreaterThan(0)
  })

  it('calls onSelectAlert when a row is clicked', () => {
    const onSelectAlert = jest.fn()
    render(<AlertGrid alerts={alerts} onSelectAlert={onSelectAlert} />)

    // Click the first row (row role + aria-label)
    const firstRow = screen.getByRole('row', { name: /view details for event one/i })
    fireEvent.click(firstRow)
    expect(onSelectAlert).toHaveBeenCalledWith(alerts[0])
  })

  it('calls onSelectAlert when Enter or Space is pressed on a row', () => {
    const onSelectAlert = jest.fn()
    render(<AlertGrid alerts={alerts} onSelectAlert={onSelectAlert} />)

    const firstRow = screen.getByRole('row', { name: /view details for event one/i })

    fireEvent.keyDown(firstRow, { key: 'Enter', code: 'Enter', charCode: 13 })
    expect(onSelectAlert).toHaveBeenCalledWith(alerts[0])

    fireEvent.keyDown(firstRow, { key: ' ', code: 'Space', charCode: 32 })
    expect(onSelectAlert).toHaveBeenCalledTimes(2)
  })
})
