import { Navigate, Outlet } from "react-router-dom"

import LeftSideBar from "@/components/shared/LeftSideBar"
import TopBar from "@/components/shared/TopBar"
import BottomBar from "@/components/shared/BottomBar"

import { useUserContext } from '../context/AuthContext'

const RootLayout = () => {
  const { user } = useUserContext();
  const isAuthenticated = !!user.id;

  return (
    isAuthenticated ? (
      <div className="w-full md:flex">
        <TopBar />
        <LeftSideBar />

        <section className="flex flex-1 h-full">
          <Outlet />
        </section>

        <BottomBar />
      </div>
    ) : (
      <Navigate to="/sign-in" />
    )
  )
}

export default RootLayout
