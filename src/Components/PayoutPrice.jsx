import { CurrencyDollarIcon } from '@heroicons/react/24/solid'

export default function PayoutPrice(props) {
  return(
    <div className="w-80 rounded-[10px] border p-4 shadow bg-white mx-4 my-7">
      <div className="flex justify-start items-center">
        <span className="flex items-center mr-1">
          <CurrencyDollarIcon className="h-5 w-5 text-gray-700 dark:text-gray-300"
              aria-hidden="true"/>
        </span>
        <span className='font-medium'>{props.title}</span>
      </div>
      {props.children}
    </div>
  )
}