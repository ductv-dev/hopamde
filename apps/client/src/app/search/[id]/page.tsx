import { SearchSongPage } from '@/containers/search-page/page';

export default function SearchSong({ params }: { params: { id: string } }) {
  return <SearchSongPage id={params.id} />;
}
