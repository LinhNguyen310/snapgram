import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { SigninValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { useToast } from "@/components/ui/use-toast"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import {Link, useNavigate } from "react-router-dom"
import { useTheme } from "@/components/ui/theme-provider"

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { theme } = useTheme();
  const inputClass = `shad-input ${theme}`;
  const shadButtonClass = `shad-button_primary ${theme}`;
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Queries
  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();
  // Handler

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    try {
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });
      if (!session) {
        toast({ title: "Something went wrong. Please try again", });
        
        navigate("/sign-in");
      }

      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
        form.reset();

      } else {
        toast({ title: "Login failed. Please try again.", });
        
        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <Form {...form}>
      <div className="sm:w-420 flex-center flex-col pt-4">
        {/* <img 
          src="/assets/images/logo.svg" 
          alt="logo"
          width={100}/> */}

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-4">
          Login to your account
        </h2>
        <p className=" small-medium md:base-regular mt-2">
          Welcome to Snapgram !
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" className={inputClass} {...field} />
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
                  <Input type="password" className={inputClass} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <>
            {isSigningInUser || isUserLoading ? (<Button className={shadButtonClass} disabled> 
            <div role="status">
              <Loader />
            </div>
            </Button>) : (<Button className={shadButtonClass}>Sign in</Button>)}
          </>
          <p className="text-small-regular text-center mt-2">
            Don't have an account ?
            <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1"> Sign up</Link>
          </p>
        </form>
      </div>
      </Form>
    </>
  )
}

export default SigninForm