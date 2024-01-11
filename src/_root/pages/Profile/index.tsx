import { Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
// COMPONENTS
import CustomTabs from "@/components/shared/CustomTabs";
import GridPostList from "@/components/shared/GridPostList"
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
// CONFIG
import { tabsDetails } from "./config";
// CONTEXTS
import { useUserContext } from "@/context/AuthContext";
// QUERIES & MUTATIONS
import { useGetUserById } from "@/lib/react-query/queriesAndMutations/users";

const Profile = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { data: user, isFetching } = useGetUserById(id || "");

  const { user: loggedInUser } = useUserContext();
  const isLoggedInUser = loggedInUser.id === id;
  const activeTab = pathname.split(`/profile/${id}`)[1]
  
  const handleEditProfileClick = () => {
    navigate(`/update-profile/${loggedInUser.id}`)
  }

  if (!user || isFetching) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <img src={user.imageUrl} alt="user" className="w-[150px] h-[150px] rounded-full" />
        <div className="flex-col flex-center xl:items-start max-w-2xl">

          <div className="flex flex-col flex-center xl:flex-row xl:items-start gap-5 xl:gap-10">
            {/* ---------- Name & username ---------- */}
            <div>
              <h2 className="text-[36px] tracking-tighter leading-[140%]">{user.name}</h2>
              <p className="text-light-3 text-center xl:text-left">@{user.username}</p>
            </div>

            {/* ---------- Actions ---------- */}
            {
              isLoggedInUser ? (
                <Button 
                  className="shad-button_dark_4 py-1"
                  onClick={handleEditProfileClick}
                >
                  <img src="/assets/icons/profile-edit.svg" alt="edit" width={16} height={16} />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button className="shad-button_primary">Follow</Button>
                  <Button className="shad-button_light">Message</Button>
                </div>
              )
            }
          </div>

          {/*  ---------- User stats ---------- */}
          <div className="flex gap-10 mt-6">
            <div className="">
              <p className="text-primary-500 body-bold text-center xl:text-left">{user.posts.length}</p>
              <p className="text-light-2 body-medium">Posts</p>
            </div>

            <div className="">
              <p className="text-primary-500 body-bold text-center xl:text-left">147</p>
              <p className="text-light-2 body-medium">Followers</p>
            </div>

            <div className="">
              <p className="text-primary-500 body-bold text-center xl:text-left">151</p>
              <p className="text-light-2 body-medium">Following</p>
            </div>

          </div>

          {/* ---------- User Bio  ---------- */}
          {
            user.bio &&
            <div className="mt-6">
              <p className="text-center xl:text-left">{user.bio}</p>
            </div>
          }
        </div>
      </div>
      
      {/* ---------- Filters ---------- */}
      <div className="flex-between w-full max-w-5xl cursor-pointer">
        {/* Tabs */}
        <CustomTabs tabsDetails={tabsDetails} activeTab={activeTab}/>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-3 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img src="/assets/icons/filter.svg" alt="filter" width={20} height={20} />
        </div>
      </div>

      {/* ---------- Posts Grid ---------- */}
      <Routes>
        <Route index element={<GridPostList posts={user.posts} showStats={false} showUser={false}/>} />
        <Route path="/liked-posts" element={<GridPostList posts={user.liked} showStats={false} showUser={false}/>} />
      </Routes>

      {/* ---------- End Notes ---------- */}
      <p className="text-light-4 mt-10 text-center w-full">
        {
          user.posts.length === 0 ? (
            "No post yet!"
          ) : (
            "End of posts"
          )
        }
      </p>
    </div>
  )
}

export default Profile
