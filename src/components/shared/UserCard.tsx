import { Models } from "appwrite";
// COMPONENTS
import { Button } from "../ui/button";

interface UserCardProps {
  user: Models.Document;
}

const UserCard = ({ user } : UserCardProps) => {
  const { name, username, imageUrl} = user;

  return (
    <div className="flex flex-col items-center gap-4 py-8 px-5 rounded-3xl border-[2px] border-dark-3">
      <img src={imageUrl} alt="user" className="rounded-full w-14 h-14"/>
      <h3 className="md:h3-bold">{name}</h3>
      <p className="text-light-3">{`@${username}`}</p>
      <Button className="shad-button_primary w-28">Follow</Button>
    </div>
  )
}

export default UserCard
