import React, {useMemo, useEffect, useState} from 'react'
import { useTable, useRowSelect } from "react-table";
import { useRowSelectColumn } from '@lineup-lite/hooks';
import { PaperAirplaneIcon, ArrowRightIcon, GiftIcon } from '@heroicons/react/24/solid'
import { customersData } from '../Config/constant';
import PayoutsDialog from '../Components/PayoutsDialog';

function SendPayment({ value, selectedFlatRows, row }) {
  let [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }
  const paymentData = selectedFlatRows.length == 0 ? [row] : [...selectedFlatRows.filter(selectedrow=>selectedrow.original.customerID != row.original.customerID), row];

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
        >
          Send Payment
          <PaperAirplaneIcon
            className="ml-2 -mr-1 h-3 w-3"
            aria-hidden="true"
          />
        </button>
      </div>
      <PayoutsDialog isOpen={isOpen} closeModal={closeModal} paymentData={ isOpen ? paymentData : []}/>
    </>
  )
}

function Affiliate({value}) {
  return(
    <span className='float-left text-blue-600'>
      {value}
    </span>
  )
}

function Revenue({value}) {
  return(
    <span className='text-green-600'>
      {value}
    </span>
  )
}

function ReadyPayouts({value}) {
  return(
    <span className='text-red-600'>
      ${value.toFixed(2)}
    </span>
  )
}

function UnpaidPayouts({value}) {
  return(
    <span className='text-gray-600'>
      ${value.toFixed(2)}
    </span>
  )
}

function Breakdown({value}) {
  return(
    <span className='flex justify-center items-center text-blue-600 cursor-pointer'>
      View
      <ArrowRightIcon
        className="ml-2 -mr-1 h-3 w-3"
        aria-hidden="true"
      />
    </span>
  )
}

function Type({value}) {
  return(
    <span className='text-gray-600'>
       <GiftIcon
        className="ml-2 -mr-1 h-5 w-5"
        aria-hidden="true"
      />
    </span>
  )
}

const DataTable = () => {
  const data = useMemo(() => customersData(), []);
  const columns = useMemo(() => [
    {
      Header: "Affiliate Name",
      accessor: "affiliate",
      Cell: Affiliate,
    },
    {
      Header: "Most Recent Referral",
      accessor: "referral",
    },
    {
      Header: "Revenue Generated",
      accessor: "revenue",
      Cell: Revenue,
    },
    {
      Header: "Paid Payouts",
      accessor: "paidpayouts",
    },
    {
      Header: "Unpaid Payouts",
      accessor: "unpaidpayouts",
      Cell: UnpaidPayouts,
    },
    {
      Header: "Ready Payouts",
      accessor: "readypayouts",
      Cell: ReadyPayouts,
    },
    {
      Header: "Breakdown",
      accessor: "breakdown",
      Cell: Breakdown,
    },
    {
      Header: "Type",
      accessor: "type",
      Cell: Type,
    },
    {
      Header: "Actions",
      Cell: SendPayment,
    },
  ], []);

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({ columns,  data }, useRowSelect, useRowSelectColumn);

  return (
    <div>
        <div className="mt-2 flex flex-col" data-testid="data-table">
          <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div  className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()} className="datatable-header">
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps()}
                          className="whitespace-nowrap px-6 py-5 text-left text-[16px] font-medium text-gray-400 rounded-sm tracking-wider"
                          >
                            {column.render("Header")}
                            {column.id === 'selection' && column.render('Summary')}
                          </th>
                        ))}
                      </tr>
                      ))}
                  </thead>
                  <tbody {...getTableBodyProps()}
                    className="bg-white divide-y divide-gray-200">
                    {rows?.map((row, i) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()} className="datatable-body">
                          {row.cells.map((cell) => {
                            return <td {...cell.getCellProps()} className="px-6 py-6 whitespace-nowrap text-[16px] font-medium text-center text-gray-600">{cell.render("Cell")}</td>
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default DataTable