import { useQuery } from '@workspace/ui-providers';
import axios from 'axios';

type Song = {
  uid: string;
  song_name: string;
  author: string;
  original_tone: string;
  genre: string;
  lyrics: string;
  youtube_link: string;
};

export const useFetchChord = (id: string) => {
  return useQuery<Song>({
    queryKey: ['dataDetail', id],
    queryFn: async () => {
      const res = await axios.get<{ data: Song }>(
        `https://chords-api.weebuild-io.workers.dev/songs/${id}`,
      );
      return res.data.data;
    },
  });
};
