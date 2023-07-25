import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

function HoverDrop(props) {
  const [open, setOpen] = useState(false)
  return(
    <div>
      <Menu as="div" className={`relative inline-block text-left w-full ${props.className}`}>
        <Menu.Button className={`py-0 px-0 font-medium flex justify-between items-center w-full`}  
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
        >
          {props.text}
          <ChevronRightIcon
            className="ml-2 -mr-1 h-3 w-3"
            aria-hidden="true"
          />
        </Menu.Button>
        <Transition
          show={open}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
          data-testid="hover-menu"
        >
          <Menu.Items className="absolute z-10 right-[-98%] top-[-12px] w-40 origin-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer"  onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            {props.subItems?.map((link, index) => (
              /* Use the `active` state to conditionally style the active item. */
              <Menu.Item key={index} as={Fragment}>
                {({ active }) => (
                  <div className={`py-3 px-5 font-medium first:rounded-t-md last:rounded-b-md
                  ${
                    active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                  }`}
                  >
                    {link}
                  </div>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default function SearchDrop(props) {
  return (
    <Menu as="div" className={`relative inline-block text-left ${props.className}`}>
      <Menu.Button className='inline-flex items-center text-[16px] font-medium bg-blue-600 px-5 py-1 text-white rounded-[5px] hover:bg-blue-800 shadow-md'>
        {props.text}
        <ChevronDownIcon
          className="ml-2 -mr-1 h-3 w-3 text-violet-200 hover:text-violet-100"
          aria-hidden="true"
        />
      </Menu.Button>
      <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
        <Menu.Items className="absolute z-10 left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
          {props.items.map((link, index) => (
            /* Use the `active` state to conditionally style the active item. */
            <Menu.Item key={index} as={Fragment}>
              {({ active }) => (
                <div className={`px-5 py-3 font-medium first:rounded-t-md last:rounded-b-md
                ${
                  active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }`}
                >
                  {link.subItems == undefined ? link.label : <HoverDrop text={link.label} subItems={link.subItems}/>}
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
