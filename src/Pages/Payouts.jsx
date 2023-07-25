import Toplayer from "./Toplayer"
import PayoutsTable from "./PayoutsTable"

function Payouts() {
  return(
    <div className="App relative min-h-screen bg-indigo-50 px-6 py-20 w-full overflow-x-hidden">
      <div className="max-w-[1640px] mx-auto">
        <Toplayer />
        <PayoutsTable />
      </div>
    </div>
  )
}

export default Payouts