import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ChevronLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useEffect } from 'react'

export default function PayoutsDialog(props) {
  const [selected, setSelected] = useState([]);
  const handleClose = () => {
    setSelected([])
    props.closeModal()
  }

  const handleCheckBox = (customId) => {
    if(selected.includes(customId)){
      setSelected(
        selected.filter(data =>
          data != customId
        )
      );
    } else {
      setSelected(
       [...selected, customId]
      );
    }
  }

  useEffect(()=>{
    const arr = [];
    props.paymentData.forEach(data => {
      if(!selected.includes(data.original.customerID)){
        arr.push(data.original.customerID);
      }
    });
    setSelected(arr);
  },[props.isOpen])

  let credit = 0;
  let total = 0;
  let tremendous = 0;
  props.paymentData.forEach(data => {
    if(selected.includes(data.original.customerID) && data.original.payment == "Store Credit"){
      credit += data.original.unpaidpayouts;
      total += data.original.unpaidpayouts;
    } else {
      tremendous += data.original.unpaidpayouts;
      total += data.original.unpaidpayouts;
    }
  });

  return(
    <Transition appear show={props.isOpen}>
      <Dialog as="div" className="relative z-10" onClose={()=>handleClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-center align-middle shadow-xl transition-all">
                <div className='relative'>
                  <div className='sm:absolute flex items-center p-6 font-bold text-blue-500 hover:text-blue-700 cursor-pointer' onClick={()=>handleClose()}>
                    <ChevronLeftIcon
                      className="mx-2 h-3 w-3"
                      aria-hidden="true"
                    />
                    Back
                  </div>
                  <div className='w-full p-6 text-[20px] font-bold text-gray-400'>Confirm Payouts</div>
                  <div className='p-4 m-6 border-2 border-blue-600 rounded-md'>
                    <div className='p-3 font-medium text-[18px]' data-testid="payout-dialog">
                      The following affiliates will be sent payouts
                    </div>
                    <div className='overflow-auto max-h-96'>
                      <table className='w-full'>
                        <thead>
                            <tr className='border-y-2'>
                                <th className='py-2 text-[20px]'>Affiliate</th>
                                <th className='py-2 text-[20px]'>Commission</th>
                                <th className='py-2 text-[20px]'>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                            props.paymentData.map((data, index)=>(
                              <tr className='border-t-2 dialog-data' key={index}>
                                  <td className='py-2 text-[20px]'>
                                    <input className='m-2' type="checkbox" onChange={()=>handleCheckBox(data.original.customerID)} checked={selected.includes(data.original.customerID)} value={"zack"}></input>
                                    {data.original.affiliate}
                                  </td>
                                  <td className='py-2 text-[20px] font-bold'>${data.original.unpaidpayouts.toFixed(2)}</td>
                                  <td className='py-2 text-[20px]'>{data.original.payment}</td>
                              </tr>
                            ))
                          }
                          <tr className='border-t-2'>
                              <td className='py-2 text-[20px] font-bold'>
                                Store Credit:
                              </td>
                              <td className='py-2 text-[20px] font-bold'></td>
                              <td className='py-2 text-[20px] font-bold' data-testid="credit-price">${(Math.round(credit*100)/100).toFixed(2)}</td>
                          </tr>
                          <tr className='border-t-2'>
                              <td className='py-2 text-[20px] font-bold'>
                                Tremendous:
                              </td>
                              <td className='py-2 text-[20px] font-bold'></td>
                              <td className='py-2 text-[20px] font-bold' data-testid="tremendous-price">${(Math.round(tremendous*100)/100).toFixed(2)}</td>
                          </tr>
                          <tr className='border-t-2'>
                              <td className='py-2 text-[20px] font-bold'>
                                Total:
                              </td>
                              <td className='py-2 text-[20px] font-bold'></td>
                              <td className='py-2 text-[20px] font-bold' data-testid="total-price">${(Math.round(total*100)/100).toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <button type='button' className='bg-blue-600 hover:bg-blue-700 p-3 w-full flex justify-center items-center text-[20px] font-bold text-white'>
                      Send Payouts
                      <PaperAirplaneIcon
                        className="ml-2 -mr-1 h-3 w-3"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}