import { Models } from "appwrite";
import { cva, type VariantProps } from "class-variance-authority"
// COMPONENTS
import { Button } from "../ui/button";
// UTILS
import { cn } from "@/lib/utils"

const userCardVariants = cva(
  "flex-center flex-col",
  {
    variants: {
      size: {
        default: "gap-5 py-10 border-[3px] border-dark-3 rounded-[30px]",
        sm: "gap-2.5 py-6 border border-dark-3 rounded-[20px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface UserCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof userCardVariants> {
  user: Models.Document;
}

const UserCard = ({ user, size, className } : UserCardProps) => {
  const { name, username, imageUrl} = user;
  const isSmallVariant = size === "sm";

  return (
    <div className={cn(userCardVariants({ size, className }))}>
      <img src={imageUrl} alt="user" className={`rounded-full ${isSmallVariant ? "w-[54px] h-[54px]" : "w-[90px] h-[90px]"}`}/>
        <div className="flex-center flex-col">
          <h3 className={`text-light-1 ${isSmallVariant ? "small-semibold" : "h3-bold"}`}>{name}</h3>
          <p className={`text-light-3 ${isSmallVariant ? "tiny-medium" : "body-medium mt-2"}`}>{`@${username}`}</p>
        </div>
      <Button className={`shad-button_primary ${isSmallVariant ? "h-7.5 py-1.5 px-4 subtle-semibold" : "px-5 py2.5"}`} size={size}>Follow</Button>
    </div>
  )
}

export default UserCard
