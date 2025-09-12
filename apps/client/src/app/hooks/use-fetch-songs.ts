'use client';

import axios from 'axios';
import queryString from 'query-string';
import { useQuery } from '@workspace/ui-providers';

type TQuery = {
  q: string;
  offset: number;
  genre?: string;
  limit: number;
  author?: string;
};
export function useFetchListSong({ q, offset, genre, limit, author }: TQuery) {
  const query = queryString.stringify({
    q,
    offset,
    limit,
    ...(genre && { genre }),
    ...(author && { author }),
  });

  return useQuery({
    queryKey: ['query-songs', q, offset, genre, author, limit],
    queryFn: async () => {
      const res = await axios.get(
        `https://chords-api.weebuild-io.workers.dev/songs?${query}`,
      );
      const newData = res.data;
      return newData;
    },
    staleTime: 0,
    refetchOnMount: true,
  });
}
