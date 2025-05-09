import { CalendarDashboard } from "../../components/calenderDashboard";
import { DashboardLayout } from "../../components/dashboardLayout";
export default function DashboardPage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <DashboardLayout children={<CalendarDashboard/>} />
    </div>
  )
}

