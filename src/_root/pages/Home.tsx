import {LazyLoader} from "@/components/shared";

const Home = () => {
  const isPostLoading = true;
  const posts = null;
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h2-bold md:h3-bold text-left w-full">
            Home
            {isPostLoading && !posts ? 
            (<LazyLoader />) : (
              <ul>

              </ul>
            )}
          </h2>
        </div>
      </div>
      
    </div>
  )
}

export default Home
