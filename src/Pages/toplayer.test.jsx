import React from 'react';
import { render, fireEvent, cleanup, screen, within, waitFor, act } from '@testing-library/react';
import Payouts from './Payouts';
import Toplayer from './Toplayer';
import { customersData } from '../Config/constant'
import PayoutsDialog from '../Components/PayoutsDialog'

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

beforeEach(async () => {
  await act(async () => {
    render(
      <Payouts>
        <Toplayer />
      </Payouts>
    )
  })
});

describe('Render Page', () => {

  it('Top Layer Render', async () => {
    expect(screen.getByText(/^Payouts/)).toHaveTextContent(
      'Payouts Overview',
    )
  });

  it('AutoComplete for showing payouts', () => {
    const data = customersData();
    let unpaidPayout = 0;
    let readyPayout = 0;
    data.forEach(column=>{
      unpaidPayout += column.unpaidpayouts;
      readyPayout += column.readypayouts;
    });
    expect(screen.getByTestId('unpaid-payout')).toHaveTextContent(
      unpaidPayout,
    );
    expect(screen.getByTestId('ready-payout')).toHaveTextContent(
      readyPayout,
    )
  });

  it('AutoComplete for open modal', async () => {
    fireEvent.click(screen.getByText(/Pay All/i, { selector: 'button' }));
    expect(screen.getByTestId('payout-dialog')).toHaveTextContent('The following affiliates will be sent payouts')
  });

  it('AutoComplete for close modal', () => {
    const handleClose = jest.fn()
    const {getByText} = render(
      <PayoutsDialog isOpen={true} closeModal={handleClose} paymentData={[]}/>
    )
    fireEvent.click(getByText(/Back/i));
    expect(handleClose).toHaveBeenCalledTimes(1);
  })
  
})
