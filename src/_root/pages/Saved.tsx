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
    <div className="explore-container gap-10">
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
      <div className="flex-between w-full max-w-5xl cursor-pointer">
        <div className="flex">
          <div className="profile-tab">
            <img src="/assets/icons/gallery.svg" alt="gallery" width={20} height={20} />
            Posts
          </div>
          <div className="profile-tab">
          <img src="/assets/icons/reel.svg" alt="reel" width={20} height={20} />
            Reels
          </div>
          <div className="profile-tab">
          <img src="/assets/icons/tag.svg" alt="tag" width={20} height={20} />
            Collections
          </div>
        </div>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-3 cursor-pointer">
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
