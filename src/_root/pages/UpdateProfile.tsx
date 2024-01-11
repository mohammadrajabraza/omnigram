// COMPONENTS
import UserForm from "@/components/forms/UserForm";
import Loader from "@/components/shared/Loader";
// QUERIES & MUTATIONS
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations/users";

const UpdateProfile = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser) {
    return (
      <Loader />
    )
  }

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/edit.svg"
            alt="add"
            width={36}
            height={36}
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>

        <UserForm user={currentUser} />
      </div>
    </div>
  )
}

export default UpdateProfile
