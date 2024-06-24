import { LayoutDashboard } from "@/components/LayoutDashboard";
import { cookies } from 'next/headers'

export default function Dashboard() {

  const cookie = cookies();

  const token = cookie.get('@token')
  if (!token) {
    window.location.href = '/';
  }
  return (
    <LayoutDashboard>
      <h1>Dashboard Saudeeeeee</h1>
    </LayoutDashboard>
  )
}
