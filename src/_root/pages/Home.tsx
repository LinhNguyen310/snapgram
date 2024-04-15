import {LazyLoader, PostCard} from "@/components/shared";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  const {data: posts, isPending: isPostLoading, isError: isErrorPosts} = useGetRecentPosts();
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h2-bold md:h3-bold text-left w-full">
            Home
            {isPostLoading && !posts ? 
            (<LazyLoader />) : (
              <ul className="flex flex-col flex-1 gap-9 w-full">
                {posts?.documents.map((post: Models.Document) => (
                  <PostCard key={post.$id} post={post} />
                ))
              }
              </ul>
            )}
          </h2>
        </div>
      </div>
      
    </div>
  )
}

export default Home
