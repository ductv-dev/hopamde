import axios from 'axios';
import queryString from 'query-string';
import { useQuery } from '@workspace/ui-providers';

type TGenresQuery = {
  name: string;
  offset: number;
  limit: number;
};

export const useFetchGenres = ({ name, offset, limit }: TGenresQuery) => {
  const query = queryString.stringify({
    name,
    offset,
    limit,
  });
  return useQuery({
    queryKey: ['dataGenres', name, offset],
    queryFn: async () => {
      const res = await axios.get(
        `https://chords-api.weebuild-io.workers.dev/genres?${query}`,
      );
      return res.data;
    },
  });
};
