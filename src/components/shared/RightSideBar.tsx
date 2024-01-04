// COMPONENTS
import Loader from "./Loader";
import UserCard from "./UserCard";
// QUERIES & MUTATIONS
import { useGetUsers } from "@/lib/react-query/queriesAndMutations/users"

const RightSideBar = () => {
  const { data: users } = useGetUsers(10);

  return (
    <div className="hidden xl:flex flex-col py-12 px-6 gap-10 overflow-scroll custom-scrollbar min-w-[252px] 2xl:min-w-[465px]">
      {
        !users ? (
          <Loader />
        ) : (
          <>
            <h2 className="h3-bold">Top Creators</h2>
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
              {
                users.documents.map((user) => (
                  <UserCard user={user} size={"sm"} key={user.username}/>
                ))
              }
            </div>
          </>
        )
      }
    </div>
  )
}

export default RightSideBar
