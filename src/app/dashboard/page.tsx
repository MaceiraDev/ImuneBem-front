import { LayoutDashboard } from "@/components/LayoutDashboard";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default function Dashboard() {

    const cookie = cookies();

    const token = cookie.get('@token')
    if (!token) {
        redirect('/login')
    }
    return (
        <LayoutDashboard
            token={token?.value}
        >
            <h1>Dashboard Saudeeeeee</h1>
        </LayoutDashboard>
    )
}
