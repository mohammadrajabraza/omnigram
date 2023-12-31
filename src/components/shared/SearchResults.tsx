import { Models } from "appwrite";
// COMPONENTS
import Loader from "./Loader";
import GridPostList from "./GridPostList";

interface SearchResultsProps {
  searchedPosts?: Models.DocumentList<Models.Document>;
  isSearchFetching: boolean;
}

const SearchResults = ({ isSearchFetching, searchedPosts}: SearchResultsProps) => {
  if (isSearchFetching) return <Loader />
  
  if (searchedPosts && searchedPosts.documents.length > 0) {
    return (
      <GridPostList posts={searchedPosts.documents}/>
    )
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No results found</p>
  )
}

export default SearchResults
