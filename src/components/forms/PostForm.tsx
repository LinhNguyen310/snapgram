import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea'
import FileUploader from '../shared/FileUploader'
import { useTheme } from '../ui/theme-provider'
import { PostValidation } from '@/lib/validation'
import { Models } from 'appwrite'
import { useUserContext } from '@/context/AuthContext'
import { useToast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { useCreatePost } from '@/lib/react-query/queriesAndMutations'
type PostFormProps = {
  post?: Models.Document;
}
const PostForm = ({post} :PostFormProps) => {
  const {mutateAsync: createPost, isPending: isLoadingCreate} = useCreatePost();
  const {user} = useUserContext();
  const {toast} = useToast();
  const navigate = useNavigate();
    // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : '',
      file: [],
      location: post ? post?.location : '',
      tags: post ? post?.tags.join(',') : '',
    },
  })
  const {theme} = useTheme();
  const shadButtonClass = `shad-button_primary ${theme}`;
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newPost = await createPost (
      {
        ...values,
        userId: user.id,
      }
    )

    if(!newPost){
      toast({
        variant: 'destructive',
        title: 'Please try again'
      })
    }
    // Created succesffully
    navigate('/');
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='sha-form_label'>Caption</FormLabel>
              <FormControl>
                <Textarea placeholder="shad-textarea custom-scrollbar"/>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage className='shad-form_message'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Photos</FormLabel>
              <FormControl>
                <FileUploader 
                fieldChange={field.onChange}
                mediaUrl ={post?.imageUrl}/>
              </FormControl>
              <FormMessage className='shad-form_message'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='sha-form_label'>Add Locations</FormLabel>
              <FormControl>
                <Input type="text" className='shad-input' {...field}/>
              </FormControl>
              <FormMessage className='shad-form_message'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='sha-form_label'>Add Tags (seperated by comma " , ")</FormLabel>
              <FormControl>
                <Input type="text" className='shad-form_input' placeholder='Art, Expression, Learn' {...field}/>
              </FormControl>
              <FormMessage className='shad-form_message'/>
            </FormItem>
          )}
        />
        <div className='flex gap-4 items-center justify-end'>
            <Button type="button" className="shad-button_dark_4">Cancel</Button>
            <Button type="submit" className={`${shadButtonClass} whitespace-nowrap`}>Submit</Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm
