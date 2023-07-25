import { Tab } from '@headlessui/react'
import SearchBar from './SearchBar'
import DataTable from './DataTable'
import { classNames } from '../Config/utils';

function PayoutsTable() {
  return(
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="flex space-x-1 border-b-2">
          <Tab className={({ selected }) =>
                classNames(
                  'w-40 rounded-[3px] rounded-b-none border-2 border-b-0 text-base font-medium leading-5 text-gray-500 -mb-[2px] p-2',
                  'focus:outline-none',
                  selected
                    ? 'bg-white'
                    : 'text-blue-600 border-0 hover:bg-white/[0.12]'
                )}>
                Pending Payouts
          </Tab>
          <Tab className={({ selected }) =>
                classNames(
                  'w-40 rounded-[3px] rounded-b-none border-2 border-b-0 text-base font-medium leading-5 text-gray-500 -mb-[2px] p-2',
                  'focus:outline-none',
                  selected
                    ? 'bg-white'
                    : 'text-blue-600 border-0 hover:bg-white/[0.12]'
                )}>
                Paid Payouts
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className='ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none'>
            <SearchBar/>
            <DataTable />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default PayoutsTable