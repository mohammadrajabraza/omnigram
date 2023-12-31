import { Link, useNavigate, useParams } from "react-router-dom"
// COMPONENTS
import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
// CONTEXTS
import { useUserContext } from "@/context/AuthContext";
// QUERIES & MUTATIONS
import { useDeletePost, useGetPostById } from "@/lib/react-query/queriesAndMutations/posts"
// UTILS
import { multiFormatDateString } from "@/lib/utils";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();

  
  const { data: post, isPending } = useGetPostById(id || '')
  const { mutate: deletePost } = useDeletePost()
  const isUserCreator = user.id === post?.creator.$id;


  // Delete post
  const handleDeletePost = () => {
    deletePost({postId: id!, imageId: post?.imageId})
    navigate(-1);
  }

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
              <div className="flex-center">
                <Link to={`/update-post/${post?.$id}`} className={`${!isUserCreator && "hidden"}`}>
                  <img src="/assets/icons/edit.svg" alt="edit" width={24} height={24} />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ghost_details-delete_btn ${!isUserCreator && "hidden"}`}
                >
                  <img src="/assets/icons/delete.svg" alt="delete" width={24} height={24}/>
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex flex-wrap gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* ---------- Post Stats ---------- */}
            <div className="w-full">
                <PostStats post={post} userId={user.id}/>
            </div>

          </div>
        </div>
      }
    </div>
  )
}

export default PostDetails
