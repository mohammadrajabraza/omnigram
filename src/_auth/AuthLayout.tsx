import { Outlet, Navigate } from "react-router-dom"
// CONTEXTS
import { useUserContext } from "@/context/AuthContext";

const AuthLayout = () => {
  const { user } = useUserContext();
  const isAuthenticated = !!user.id;

  return (
    <>
      {
        isAuthenticated ? (
          <Navigate to="/" />
        ) : (
          <>
            <section className="flex flex-col flex-1 items-center justify-center py-10">
              <Outlet />
            </section>
            <img
              src="/assets/images/side-img.svg"
              alt="logo"
              className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
            />
          </>
        )
      }
    </>
  )
}

export default AuthLayout
