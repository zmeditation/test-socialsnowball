import React from 'react';
import { render, fireEvent, cleanup, screen, within, waitFor, act } from '@testing-library/react';
import PayoutsTable from './PayoutsTable';
import SearchDrop from "../Components/SearchDrop"

beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe('Search Bar Test', () => {

  it('Payouts Table Render', async () => {
    await act(async () => {
      render(
        <PayoutsTable />
      )
    })
    expect(screen.getByText(/^Pending/)).toHaveTextContent(
      'Pending Payouts',
    )
  });

  it('Filter by button test', () => {
    const filterbyItems = [
      { label: 'All pending payouts' },
      { label: 'Ready Payouts' },
      { label: 'No Leaks' },
    ]
    const {getByText} = render(
      <SearchDrop className="mr-1 my-1" text="Filter by" items={filterbyItems}/>
      )
    fireEvent.click(getByText(/Filter by/i));

    expect(screen.getByText(/All pending payouts/i)).toHaveTextContent(
      'All pending payouts'
    );
    expect(screen.getByText(/Ready Payouts/i)).toHaveTextContent(
      'Ready Payouts'
    );
    expect(screen.getByText(/No Leaks/i)).toHaveTextContent(
      'No Leaks'
    );
  })

  it('Sort by button hover menu test', () => {
    const sortbyItems = [
      { label: 'Revenue Generated', subItems: ["Highest first", "Lowest first"] },
      { label: 'Most Recent Referral', subItems: ["Newest first", "Oldest first"] },
    ]
    const {getByText} = render(
      <SearchDrop className="mr-1" text="Sort by" items={sortbyItems}/>
      )
    fireEvent.click(getByText(/Sort by/i));

    expect(screen.getByText(/Revenue/i)).toHaveTextContent(
      'Revenue Generated'
    );
    
    fireEvent.mouseEnter(getByText(/Revenue/i));
    expect(screen.getByTestId('hover-menu')).toBeTruthy();
  })

})