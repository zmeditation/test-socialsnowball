import SearchDrop from "../Components/SearchDrop"

export default function SearchBar(){

  const sortbyItems = [
    { label: 'Revenue Generated', subItems: ["Highest first", "Lowest first"] },
    { label: 'Most Recent Referral', subItems: ["Newest first", "Oldest first"] },
  ]

  const filterbyItems = [
    { label: 'All pending payouts' },
    { label: 'Ready Payouts' },
    { label: 'No Leaks' },
  ]

  const actionItems = [
    { label: 'Mark as paid' },
    { label: 'Reject' },
    { label: 'Send payouts' },
  ]

  return(
    <div className="flex justify-between my-5 flex-col md:flex-row">
      <div className="my-1">
        <SearchDrop className="mr-1" text="Sort by" items={sortbyItems}/>
        <SearchDrop className="mr-1 my-1" text="Filter by" items={filterbyItems}/>
        <SearchDrop className="mr-1" text="Actions" items={actionItems}/>
        <div className="relative inline-block text-left mx-2">18 pending payouts</div>
      </div>
      <div className="my-1">
        <input type="text" className="inline-flex w-60 bg-white border border-gray-700 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-2.5 mx-2" placeholder="Affiliate's name or email"></input>
        <button className='inline-flex items-center text-[16px] font-medium bg-blue-600 m-1 px-5 py-1 text-white rounded-[5px] hover:bg-blue-800 shadow-md'>Search</button>
        <button className='inline-flex items-center text-[16px] font-medium bg-blue-600 m-1 px-5 py-1 text-white rounded-[5px] hover:bg-blue-800 shadow-md'>Export</button>
      </div>
    </div>
  )
}