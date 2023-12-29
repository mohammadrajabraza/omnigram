import React, { useEffect, useState } from "react";
import { Models } from "appwrite";
// COMPONENTS
import Loader from "./Loader";
// QUERIES & MUTATIONS
import { useDeleteSavedPost, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations/posts";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations/users";
// UTILS
import { checkIsLiked } from "@/lib/utils";

interface PostStatsProps {
  post?: Models.Document;
  userId: string;
}

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id)

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find((record: 
    Models.Document) => record.post.$id === post?.$id);
  
  useEffect(() => {
    setIsSaved(!!savedPostRecord)
  }, [savedPostRecord])

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes]
    const hasLiked = checkIsLiked(newLikes, userId);

    // Unlike a post
    if(hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId)
    // Like a post
    } else {
      newLikes.push(userId)
    }

    setLikes(newLikes);
    likePost({postId: post?.$id || '', likesArray: newLikes})
  }

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      setIsSaved(true);
      savePost({postId: post?.$id || '', userId: userId})
    }
  }

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleLikePost}
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        {
          isSavingPost || isDeletingSavedPost 
          ? <Loader />
          : <img
            src={
              isSaved
              ? "/assets/icons/saved.svg"
              : "/assets/icons/save.svg"
            }
            alt="like"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={handleSavePost}
          />
        }
      </div>
    </div>
  );
};

export default PostStats;
