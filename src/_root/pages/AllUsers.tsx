import { useMemo } from "react"
import { useInView } from "react-intersection-observer"
import { Models } from "appwrite"
// COMPONENTS 
import Loader from "@/components/shared/Loader"
import UserCard from "@/components/shared/UserCard"
// QUERIES & MUTATIONS
import { useGetInfiniteUsers } from "@/lib/react-query/queriesAndMutations/users"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"

const AllUsers = () => {
  const { ref, inView } = useInView();
  const { data: usersData, fetchNextPage, hasNextPage } = useGetInfiniteUsers()
  useInfiniteScroll({ fetchNextPage, hasNextPage, inView });

  // Compute allUsers using useMemo
  const allUsers = useMemo(() => {
    const tempUsers: Array<Models.Document> = [];

    usersData?.pages.forEach((page) => {
      if (page?.documents && page.documents.length) {
        tempUsers.push(...page.documents)
      }
    })

    return tempUsers
  }, [usersData?.pages.length])

  // Show loader while users are being fetched
  if (!usersData) {
    return (
      <Loader />
    )
  }

  // Determine whether to show end note
  const shouldShowEndNote = usersData?.pages.every((page) => page?.documents.length === 0);

  return (
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

      {/* Show users in grid */}
      <ul className="user-grid">
        {
          allUsers.map((user) => (
            <UserCard key={user.name} user={user}/>
          ))
        }
      </ul>

      {/* Add loader for infinite scroll */}
      {hasNextPage && (
        <div ref={ref} className="mt-20">
          <Loader />
        </div>
      )}

      {(!hasNextPage || shouldShowEndNote) && (
        <p className="text-light-4 mt-10 text-center w-full">
          End of posts
        </p>
      )}
    </div>
  )
}

export default AllUsers
