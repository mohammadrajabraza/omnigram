import { useEffect } from "react"
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"
// COMPONENTS
import { Button } from "../ui/button"
// CONSTANTS
import { sidebarLinks } from "@/constants"
// CONTEXTS
import { useUserContext } from "@/context/AuthContext"
// QUERIES & MUTATIONS
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations/auth"
// TYPES
import { INavLink } from "@/types"

const LeftSideBar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount()
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess])

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">

        {/* --------------- Profile details start --------------- */}
        <Link to="/" className="flex gap-3 items-center">
          <img 
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
              src={user.imageUrl || '/assets/images/profile.png'}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
        </Link>
        {/* --------------- Profile details end --------------- */}

        {/* --------------- Menu Links start --------------- */}
        <ul className="flex flex-col gap-6">
          {
            sidebarLinks.map((link: INavLink)=> {
              const isActive = pathname === link.route;
              return (
                <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                  <NavLink 
                    to={link.route}
                    className="flex gap-4 items-center p-4"
                  >
                    <img 
                      src={link.imgURL}
                      alt={link.label}
                      className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                    />
                    {link.label}
                  </NavLink>

                </li>
              )
            })
          }
        </ul>
        {/* --------------- Menu Links end --------------- */}
      </div>

      {/* --------------- Logout Button start --------------- */}
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => signOut()}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
      {/* --------------- Logout Button end --------------- */}
    </nav>
  )
}

export default LeftSideBar
