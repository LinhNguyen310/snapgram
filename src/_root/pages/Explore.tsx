import { Loader } from '@/components/shared';
import GridPostList from '@/components/shared/GridPostList';
import SearchResults from '@/components/shared/SearchResults';
import { Input } from '@/components/ui/input'
import useDebounce from '@/hooks/useDebounce';
import { useGetPosts, useSearchPost } from '@/lib/react-query/queriesAndMutations';
import React, { useState } from 'react'

const Explore = () => {
  const {data: posts, fetchNextPage, hasNextPage} = useGetPosts();
  const [searchValue, setSearchValue] = useState('')
  const debounceValue = useDebounce(searchValue, 500); // 500 ms
  const {data: searchedPosts, isFetching: isSearchFetching} = useSearchPost(debounceValue);
  if (!posts) {
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    )
  }
  const shoudShowSearchResults = searchValue !== ''
  const shouldShowPosts = !shoudShowSearchResults && posts?.pages.every((item) => item.documents.length == 0)
  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <h2 className='h3-bold md:h2-bold w-full'> Search Post</h2>
        <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-4'>
          <img src='/assets/icons/search.svg' width={24} height={24} alt='search'></img>
          <Input type="text" placeholder='Search' className='explore-search' value={searchValue} onChange={(e)=> setSearchValue(e.target.value)}></Input>
        </div>
      </div>
      <div>
        <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
          <h2 className='body-bold md:h3-bold'> Popular Today</h2>
          <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
            <p className='small-medium md:base-medium text-light-2'> All</p>
            <img src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt='filter'></img>
          </div>
        </div>
        <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shoudShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPost ={ searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>
      </div>
    </div>
  )
}

export default Explore
