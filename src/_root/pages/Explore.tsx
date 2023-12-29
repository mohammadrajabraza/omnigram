import { useState } from "react"
import { useInView } from "react-intersection-observer"
// COMPONENTS 
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
// QUERIES & MUTATIONS
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queriesAndMutations/posts";
// UTILS
import useDebounce from "@/hooks/useDebounce";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 800);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedValue);
  useInfiniteScroll({ fetchNextPage, hasNextPage, inView, searchValue })

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )
  }

  const shouldShowSearchResult = searchValue !== '';
  const shouldShowEndNote = !shouldShowSearchResult && 
    posts?.pages.every((item) => item?.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 md:gap-3 px-4 w-full rounded-lg bg-dark-4">
          <img src="/assets/icons/search.svg" alt="search" width={24} height={24} />
          <Input 
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      
      {/* ---------- Filter and Popular */}
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bf-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img src="/assets/icons/filter.svg" alt="filter" width={20} height={20} />
        </div>
      </div>

      <div >
        {
          shouldShowSearchResult ? (
            <SearchResults
              isSearchFetching={isSearchFetching}
              searchedPosts={searchedPosts}
            />
          ) : posts?.pages.map((item, index) => (
            <GridPostList key={`key-${index}`} posts={item!.documents}/>
          ))
        }
      </div>

      {/* Add loader for infinite scroll */}
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}

      {((!hasNextPage || shouldShowEndNote) && !searchValue) && (
        <p className="text-light-4 mt-10 text-center w-full">
          End of posts
        </p>
      )}
    </div>
  )
}

export default Explore
