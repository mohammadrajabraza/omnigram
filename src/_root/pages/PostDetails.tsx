import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations"
import { multiFormatDateString } from "@/lib/utils";
import { Link, useParams } from "react-router-dom"

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || '')
  const { user } = useUserContext();

  const isUserCreator = user.id === post?.creator.$id;

  return (
    <div className="post_details-container">      
      {
        isPending
        ? <Loader />
        : <div className="post_details-card">
          {/* ---------- Post Media ---------- */}
          <img 
            src={post?.imageUrl}
            alt="post"
            className="post_details-img"
          />

          {/* ---------- Other Details ---------- */}
          <div className="post_details-info">
            {/* ---------- User, Location and time details ---------- */}
            <div className="flex-between w-full">
              <Link 
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                />
              
                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex items-center gap-2 text-light-2">
                    <p className="subtle-semibold lg:small-regular">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    -<p className="subtle-semibold">{post?.location}</p>
                  </div>
                </div>
              </Link>
              
              {/* ---------- Post Actions ---------- */}
              <div className="flex-center gap-4">
                <Link 
                  to={`/update-post/${post?.$id}`}
                  className={`${!isUserCreator && "hidden"}`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
              </div>
          </div>
        </div>
      }
    </div>
  )
}

export default PostDetails
