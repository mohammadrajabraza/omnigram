import { Outlet, Navigate } from "react-router-dom"

const AuthLayout = () => {
  const isAuthenticated = false;

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
