import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import queryString from 'query-string';

type TGenresQuery = {
  offset: number;
  limit: number;
};

export const useFetchAuthors = ({ offset, limit }: TGenresQuery) => {
  const query = queryString.stringify({
    offset,
    limit,
  });
  return useQuery({
    queryKey: ['dataGenres', offset],
    queryFn: async () => {
      const res = await axios.get(
        `https://chords-api.weebuild-io.workers.dev/authors?${query}`,
      );
      return res.data;
    },
  });
};
