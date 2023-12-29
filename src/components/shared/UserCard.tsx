import { Models } from "appwrite";

import { Button } from "../ui/button";

interface UserCardProps {
  user: Models.Document;
}

const UserCard = ({ user } : UserCardProps) => {
  const { name, username, imageUrl} = user;

  return (
    <div className="flex flex-col items-center gap-4 py-10 rounded-3xl border-[3px] border-dark-3">
      <img src={imageUrl} alt="user" className="rounded-full w-14 h-14"/>
      <h3 className="md:h3-bold">{name}</h3>
      <p className="text-light-3">{`@${username}`}</p>
      <Button className="shad-button_primary w-28">Follow</Button>
    </div>
  )
}

export default UserCard
