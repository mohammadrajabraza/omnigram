import { Models } from "appwrite"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import * as z from "zod"
// COMPONENTS
import ProfilePictureUploader from "@/components/shared/ProfilePictureUploader"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
// QUERIES & MUTATIONS
import { useUpdateUserProfile } from "@/lib/react-query/queriesAndMutations/users"
// VALIDATIONS
import { UserProfileUpdate } from "@/lib/validation/user"

interface IUserFormProps {
  user: Models.Document;
}

type TUserInput = z.infer<typeof UserProfileUpdate>

const UserForm = ({ user }: IUserFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutateAsync:  updateUserProfile, isPending: isUpdating } = useUpdateUserProfile();
  
  const form = useForm<TUserInput>({
    resolver: zodResolver(UserProfileUpdate),
    defaultValues: {
      name: user ? user?.name : "",
      username: user ? user?.username : "",
      email: user ? user.email : "",
      bio: user ? user.bio : "",
      file: [],
    },
  })

  const handleCancel = () => {
    navigate(-1);
  }
     
  async function onSubmit(values: TUserInput) {
    const updatedUser = await updateUserProfile({
        ...values,
        id: user.$id,
        imageId: user.imageId,
        imageUrl: user.imageUrl,
    })

    if(!updatedUser) {
      toast({ title: 'Please try again' })
    } else {
      navigate(`/profile/${user.$id}`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="flex items-center gap-5 justify-center">
              <FormControl>
                <ProfilePictureUploader fieldChange={field.onChange} mediaUrl={user?.imageUrl} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          key="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          key="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          key="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Email</FormLabel>
              <FormControl>
                <Input readOnly type="email" className="shad-input cursor-not-allowed opacity-50" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Bio</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />

        {/* Container for buttons */}
        <div className="flex gap-4 items-center justify-end">
          <Button
              type="button"
              className="shad-button_dark_4"
              onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isUpdating}
          >
            {
              isUpdating 
              ? 'Updating...'
              : `Update Profile`
            }
          </Button>
        </div>

      </form>
    </Form>
  )
}

export default UserForm
