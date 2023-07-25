import React, {useMemo} from 'react';
import { render, fireEvent, cleanup, screen, within, waitFor, act } from '@testing-library/react';
import DataTable from './DataTable'
import { customersData } from '../Config/constant'

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

describe('DataTable test', () => {

  it('DataTable render', async () => {
    await act(async () => {
      render(
        <DataTable />
      )
    })
    expect(screen.getByTestId('data-table')).toBeTruthy();
  })

  it('rows in data table count test', async () => {
    await act(async () => {
      render(
        <DataTable />
      )
    })
    const data = customersData();
  
    expect(document.getElementsByClassName('datatable-header')).toHaveLength(1);
    expect(document.getElementsByClassName('datatable-body')).toHaveLength(data.length);
  })

  it('AutoComplete for open modal', async () => {
    await act(async () => {
      render(
        <DataTable />
      )
    })
    const [firstBtn] = screen.getAllByText(/Send Payment/i, { selector: 'button' });
    fireEvent.click(firstBtn);
    expect(screen.getByTestId('payout-dialog')).toHaveTextContent('The following affiliates will be sent payouts')
  });

  it('selected data on payout dialog', async () => {
    await act(async () => {
      render(
        <DataTable />
      )
    })
    const [firstBtn] = screen.getAllByText(/Send Payment/i, { selector: 'button' });
    fireEvent.click(firstBtn);
    expect(document.getElementsByClassName('dialog-data')).toHaveLength(1);
  });

  it('total price on payout dialog', async () => {
    await act(async () => {
      render(
        <DataTable />
      )
    })
    const [firstBtn] = screen.getAllByText(/Send Payment/i, { selector: 'button' });
    fireEvent.click(firstBtn);
    const data = customersData();
    let unpaidPayout = data[0].unpaidpayouts;
    expect(screen.getByTestId('total-price')).toHaveTextContent(
      unpaidPayout,
    );
  });

  it('credit price or tremendous price on payout dialog', async () => {
    await act(async () => {
      render(
        <DataTable />
      )
    })
    const [firstBtn] = screen.getAllByText(/Send Payment/i, { selector: 'button' });
    fireEvent.click(firstBtn);
    const data = customersData();
    let creditPayout = 0,  tremendous = 0; 
    if(data[0].payment == "Store Credit"){
      creditPayout = data[0].unpaidpayouts
    } else {
      tremendous = data[0].unpaidpayouts
    }
    expect(screen.getByTestId('credit-price')).toHaveTextContent(
      creditPayout,
    );

    expect(screen.getByTestId('tremendous-price')).toHaveTextContent(
      tremendous,
    );

  });

})