import Loader from "@/components/shared/Loader"
import UserCard from "@/components/shared/UserCard"
import { useGetUsers } from "@/lib/react-query/queriesAndMutations/users"

const AllUsers = () => {
  const { data: users, isFetching: isUsersFetching} = useGetUsers()

  if (isUsersFetching) {
    return (
      <Loader />
    )
  }

  return (
    <div className="common-container">
      <div className="user-container">
          <div className="w-full max-w-5xl flex-start justify-start gap-3">
            <img
              src="/assets/icons/people.svg"
              alt="users"
              width={36}
              height={36}
              className="invert-white"
            />
            <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
          </div>

          <ul className="user-grid">
            {
              users?.documents.map((user) => (
                <UserCard key={user.name} user={user}/>
              ))
            }
          </ul>
      </div>
    </div>
  )
}

export default AllUsers
