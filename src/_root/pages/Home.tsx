import { useState } from "react";
import { Models } from "appwrite";
import { AlertCircle } from "lucide-react";
// COMPONENTS 
import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import RightSideBar from "@/components/shared/RightSideBar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
// CONTEXTS
import { useUserContext } from "@/context/AuthContext";
// QUERIES & MUTATIONS
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations/posts";
import { useRequestVerification } from "@/lib/react-query/queriesAndMutations/auth";

const Home = () => {
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const { user } = useUserContext();
  const {
    data: posts,
    isPending: isPostLoading,
  } = useGetRecentPosts();
  const { mutateAsync: requestVerification, isPending, error} = useRequestVerification();

  async function handleVerify () {
    const result = await requestVerification();

    if (result.userId) {
      setIsVerificationSent(true)
    } else {
      toast({ title: error?.name, description: error?.message })
    }
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">

        {
          !user.emailVerified && !isVerificationSent &&
          <Alert variant={"warning"}>
            <AlertCircle className="h-6 w-6 text-secondary-500" />
            
            <div className="flex items-center justify-between ml-2">
              <div>
                <AlertTitle className="text-secondary-500">Heads up!</AlertTitle>
                <AlertDescription className="text-[#ffe6b3]">
                  Verify your account to unlock all the features.
                </AlertDescription>
              </div>
              <Button 
                size={"sm"}
                className="bg-secondary-500 text-dark-3"
                onClick={handleVerify}
              >
                {
                  isPending ? (
                    'Sending email...'
                  ) : 'Verify'
                }
                </Button>
            </div>
          </Alert>
        }

        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard key={post.caption} post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>
      <RightSideBar />
    </div>
  );
};

export default Home;
