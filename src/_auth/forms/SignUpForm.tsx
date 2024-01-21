import { SyntheticEvent } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
// COMPONENTS
import SignInForm from "./SignInForm"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import Loader from "@/components/shared/Loader"
// CONTEXTS
import { useUserContext } from "@/context/AuthContext"
import { useDialog } from "@/context/DialogContext"
// QUERIES & MUTATIONS
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations/auth"
// VALIDATIONS
import { SignUpValidation } from "@/lib/validation"

const SignUpForm = () => {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const { state , dispatch } = useDialog();
  const navigate = useNavigate(); 

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount } = useSignInAccount();

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    const newUser = await createUserAccount(values)
    if (!newUser) {
      toast({title: 'Sign up failed. Please try again.', variant: 'destructive'})
    }

    const session = await signInAccount({
      email: values.email, 
      password: values.password
    })

    if (!session) {
      return toast({title: 'Sign in failed. Please try again.', variant: 'destructive'})
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn) {
      if (state.isOpen) {
        dispatch({ type: "CLOSE_DIALOG" })
      } else {
        form.reset();
        navigate('/');
      }
    } else {
      return toast({title: 'Sign up failed. Please try again.', variant: 'destructive'})
    }
  }

  const handleDialogLoginClick = (e: SyntheticEvent) => {
    e.preventDefault();
    if (state.isOpen) {
      dispatch({
        type: 'OPEN_DIALOG',
        payload: {
          children: <SignInForm/>,
        }
      })
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-col flex-center">
        <img src="/assets/images/logo.svg" alt="logo"/>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular">To use Omnigram, please enter your details</p>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            { isCreatingAccount 
              ? <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
              : 'Sign up'}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
              Already have an account?
              {
                state.isOpen ? (
                  <Button className="shad-button_link" onClick={handleDialogLoginClick}>Log in</Button>
                ) : (
                  <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
                )
              }
          </p>
        </form>
      </div>
      
    </Form>
  )
}

export default SignUpForm
