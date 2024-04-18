import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
}

const SearchResults = ({isSearchFetching, searchedPosts }: SearchResultsProps) => {
  
  if (isSearchFetching){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  if (searchedPosts && searchedPosts.length > 0){
    return (
      <GridPostList posts={searchedPosts}/>
    )
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No result found</p>
  )
}

export default SearchResults
