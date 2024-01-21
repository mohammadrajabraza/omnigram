import { SyntheticEvent } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
// COMPONENTS
import SignUpForm from "./SignUpForm"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import Loader from "@/components/shared/Loader"
// CONTEXTS
import { useUserContext } from "@/context/AuthContext"
import { useDialog } from "@/context/DialogContext"
// QUERIES & MUTATIONS
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations/auth"
// VALIDATIONS
import { SignInValidation } from "@/lib/validation"

const SignInForm = () => {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const { state , dispatch } = useDialog();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { mutateAsync: signInAccount, isPending: isSigningIn} = useSignInAccount();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })
 
  async function onSubmit(values: z.infer<typeof SignInValidation>) {

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
        navigate(from, { replace: true });
      }
    } else {
      return toast({title: 'Sign up failed. Please try again.', variant: 'destructive'})
    }
  }

  const handleDialogSignUpClick = (e: SyntheticEvent) => {
    e.preventDefault();
    if (state.isOpen) {
      dispatch({
        type: 'OPEN_DIALOG',
        payload: {
          children: <SignUpForm/>,
        }
      })
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-col flex-center">
        <img src="/assets/images/logo.svg" alt="logo"/>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log in to your account</h2>
        <p className="text-light-3 small-medium md:base-regular">Welcome back! Please enter your details</p>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
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
            { isSigningIn 
              ? <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
              : 'Sign in'}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
              Don't have an account?
              {
                state.isOpen ? (
                  <Button className="shad-button_link" onClick={handleDialogSignUpClick}>Sign up</Button>
                ) : (
                  <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign up</Link>
                )
              }
          </p>
        </form>
      </div>
      
    </Form>
  )
}

export default SignInForm
