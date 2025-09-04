import { SongByAuthors } from '@/containers/authors-page/song-by-authors/page';

type PageProps = {
  params: { id: string };
};
export default function SongByGenresPage({ params }: PageProps) {
  const decoded = decodeURIComponent(params.id);

  return <SongByAuthors id={decoded} />;
}
