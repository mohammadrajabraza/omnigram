import { useNavigate } from "react-router-dom"
import { Models } from "appwrite"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
// COMPONENTS
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
import { Textarea } from "../ui/textarea"
import { useToast } from "../ui/use-toast"
import FileUploader from "../shared/FileUploader"
// CONTEXTS
import { useUserContext } from "@/context/AuthContext"
// QUERIES & MUTATIONS
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations/posts"
// VALIDATIONS
import { PostValidation } from "@/lib/validation"

interface PostFormProps {
  post?: Models.Document;
  action: 'Create' | 'Update';
}

const PostForm = ({ post, action }: PostFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutateAsync:  createPost, isPending: isLoadingCreate } = useCreatePost();
  const { mutateAsync:  updatePost, isPending: isLoadingUpdate } = useUpdatePost();
  
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(',') : "",
    },
  })
     
  async function onSubmit(values: z.infer<typeof PostValidation>) {

    if (post && action === 'Update') {
      const updatedPost = await updatePost({
        ...values,
        tags: values.tags === "" ? undefined : values.tags,
        postId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl
      })

      if(!updatedPost) {
        toast({ title: 'Please try again' })
      } else {
        navigate(`/posts/${post.$id}`)
      }
    } else {
      const newPost = await createPost({
        ...values,
        tags: values.tags === "" ? undefined : values.tags,
        userId: user.id,
      })
  
      if (!newPost) {
        console.log('Failed request')
        toast({
          title: 'Please try again!'
        })
      } else {
        navigate('/');
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos </FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location </FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Tags (separated by comma " , ") </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="JS, React, NextJS"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button
              type="button"
              className="shad-button_dark_4"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {
              isLoadingCreate || isLoadingUpdate 
              ? 'Loading...'
              : `${action} Post`
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm
