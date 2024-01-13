import { Fragment, useEffect } from "react"
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
  const location = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount()
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess])

  const handleSignInClick = () => {
    navigate("/sign-in", { state: { from: location }, replace: true })
  }

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
              <p className="body-bold">{user.name || 'Guest User'}</p>
              <p className="small-regular text-light-3">@{user.username || 'guest_user'}</p>
            </div>
        </Link>
        {/* --------------- Profile details end --------------- */}

        {/* --------------- Menu Links start --------------- */}
        <ul className="flex flex-col gap-6">
          {
            sidebarLinks.map((link: INavLink)=> {

              if (link.isProtected && !user.id) {
                return <Fragment></Fragment>;
              }

              const isActive = location.pathname === link.route;
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
      {
        user.id ? (
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
            <p className="small-medium lg:base-medium">Logout</p>
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={handleSignInClick}
          >
            <img src="/assets/icons/login.png" width={24} height={24} alt="sign-in" />
            <p className="small-medium lg:base-medium">Sign In</p>
          </Button>
        )
      }
      {/* --------------- Logout Button end --------------- */}
    </nav>
  )
}

export default LeftSideBar
