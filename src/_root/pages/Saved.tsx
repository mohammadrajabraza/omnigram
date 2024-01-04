import { useMemo } from "react"
import { Models } from "appwrite";
// COMPONENTS 
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
// QUERIES & MUTATIONS
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations/users";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  // Compute saved posts using useMemo
  const savedPosts = useMemo(() => {
    const tempPosts = currentUser?.save.map((data: Models.Document) => {
        return data.post
    })

    return tempPosts
  }, [currentUser?.save.length])

  if (!currentUser) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )
  }

  return (
    <div className="explore-container">
        <div className="w-full max-w-5xl flex-start justify-start gap-3">
          <img
            src="/assets/icons/save.svg"
            alt="users"
            width={36}
            height={36}
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
        </div>
      
      {/* Filters ---------- */}
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold pl-1">Posts</h3>

        <div className="flex-center gap-3 bf-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img src="/assets/icons/filter.svg" alt="filter" width={20} height={20} />
        </div>
      </div>

      {/* Saved Posts Grid ---------- */}
      <div >
        {
          <GridPostList posts={savedPosts} showStats={false} showUser={false}/>
        }
      </div>

      <p className="text-light-4 mt-10 text-center w-full">
        End of posts
      </p>
    </div>
  )
}

export default Saved
