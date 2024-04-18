import PostForm from "@/components/forms/PostForm"
import { Loader } from "@/components/shared";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { useParams } from "react-router-dom"

const EditPost = () => {
  const {id} = useParams();
  const { data: post, isPending } = useGetPostById(id || '');

  if (isPending) return 
  (
    <div className="justify-center items-center">
      <Loader />
    </div>
  );
  return (
    <div className="flex flex-1">
      <div className='common-container'>
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>
        <PostForm post={post} action="Update"/>
      </div>
    </div>
  )
}

export default EditPost
