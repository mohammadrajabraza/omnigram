import { useEffect } from 'react';

interface InfiniteScrollProps {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  inView: boolean;
  searchValue?: string;
}

const useInfiniteScroll = ({ fetchNextPage, hasNextPage, inView, searchValue }: InfiniteScrollProps) => {

  useEffect(() => {

    if (inView && hasNextPage && !searchValue) {
      fetchNextPage();
    }

  }, [fetchNextPage, hasNextPage, inView, searchValue]);

};

export default useInfiniteScroll;
