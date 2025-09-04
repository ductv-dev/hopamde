import { SongByGenres } from '@/containers/genres-page/song-by-genres/page';

export default async function SongByGenresPage({
  params,
}: {
  params: { id: string };
}) {
  const decoded = decodeURIComponent(params.id);
  return <SongByGenres id={decoded} />;
}
