import { useState, useMemo } from 'react'
import { useTable, useRowSelect } from "react-table";
import { useRowSelectColumn } from '@lineup-lite/hooks';
import { customersData } from '../Config/constant'
import PayoutPrice from '../Components/PayoutPrice'
import PayoutsDialog from '../Components/PayoutsDialog'

function Toplayer() {
  const data = useMemo(() => customersData(), []);
  const columns = useMemo(() => [
    {
      Header: "Affiliate Name",
      accessor: "affiliate",
    },
    {
      Header: "Most Recent Referral",
      accessor: "referral",
    },
    {
      Header: "Revenue Generated",
      accessor: "revenue",
    },
    {
      Header: "Paid Payouts",
      accessor: "paidpayouts",
    },
    {
      Header: "Unpaid Payouts",
      accessor: "unpaidpayouts",
    },
    {
      Header: "Ready Payouts",
      accessor: "readypayouts",
    },
    {
      Header: "Breakdown",
      accessor: "breakdown",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Actions",
    },
  ], []);
  let unpaidPayout = 0;
  let readyPayout = 0;
  data.forEach(column=>{
    unpaidPayout += column.unpaidpayouts;
    readyPayout += column.readypayouts;
  });
  const { rows } = useTable({ columns,  data }, useRowSelect, useRowSelectColumn);
  let [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }
  return(
    <div className="w-full">
      <div className="text-3xl font-bold" id='title'>
        Payouts Overview
      </div>
      <div className='flex flex-wrap'>
        <PayoutPrice title="Total Paid Payouts">
          <div className='py-3'>
            <div className='text-3xl font-bold'>$0.00</div>
          </div>
        </PayoutPrice>
        <PayoutPrice title="Total Unpaid Payouts">
          <div className='py-3'>
            <div className='text-3xl font-bold' data-testid="unpaid-payout">${unpaidPayout}</div>
          </div>
        </PayoutPrice>
        <PayoutPrice title="Total Ready Payouts">
          <div className='py-3 flex justify-between items-center'>
            <div className='text-3xl font-bold text-green-500' data-testid="ready-payout">${readyPayout}</div>
            <button className='text-[14px] font-medium bg-blue-600 px-5 py-1 text-white rounded-[5px] hover:bg-blue-800 shadow-md' onClick={()=>openModal()}>Pay All</button>
          </div>
        </PayoutPrice>
      </div>
      <PayoutsDialog isOpen={isOpen} closeModal={closeModal} paymentData={ isOpen ? rows : []}/>
    </div>
  )
}

export default Toplayer