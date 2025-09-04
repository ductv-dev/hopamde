import ChordDetail from '../../../components/chord-detail';

type PageProps = {
  params: { uid: string };
};

export default function ChordDetailsPage({ params }: PageProps) {
  return <ChordDetail id={params.uid} />;
}
