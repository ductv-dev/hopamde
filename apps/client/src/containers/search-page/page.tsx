'use client';

import { useFetchListSong } from '@/app/hooks/use-fetch-songs';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@workspace/ui/components/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@workspace/ui/components/pagination';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { ListSong } from '../../../components/list-card-song';

type Props = {
  id: string;
};

export const SearchSongPage: React.FC<Props> = ({ id }) => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const pageString = searchParams.get('page');
  const currentPage = Number(pageString);
  const key = decodeURIComponent(id);

  const { data, isLoading } = useFetchListSong({
    q: key,
    offset: (currentPage - 1) * 18,
    limit: 18,
  });
  const totalPage = Math.ceil(data?.pagination.total / data?.pagination.limit);

  const startPage = Math.max(1, currentPage - 3);
  const endPage = Math.min(totalPage, currentPage + 3);
  console.log('so', totalPage);

  return (
    <div className="mt-15 bg-gray-200">
      <h1 className="my-2 text-center text-[2rem] font-bold">
        Kết quả tìm kiếm
      </h1>
      <hr className="mx-auto mb-2 max-w-6xl" />
      {isLoading && (
        <div className="mx-auto max-w-6xl">
          <div className="grid min-h-screen gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Skeleton className="mb-2 h-5 w-3/4" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-3 rounded" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Lyrics preview (4 dòng giả) */}
                <div className="mt-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-11/12" />
                  <Skeleton className="h-4 w-10/12" />
                  <Skeleton className="h-4 w-8/12" />
                </div>

                {/* Footer row */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-3 rounded" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="h-6 w-6 overflow-hidden rounded-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Skeleton className="mb-2 h-5 w-3/4" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-3 rounded" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Lyrics preview (4 dòng giả) */}
                <div className="mt-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-11/12" />
                  <Skeleton className="h-4 w-10/12" />
                  <Skeleton className="h-4 w-8/12" />
                </div>

                {/* Footer row */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-3 rounded" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="h-6 w-6 overflow-hidden rounded-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Skeleton className="mb-2 h-5 w-3/4" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-3 rounded" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Lyrics preview (4 dòng giả) */}
                <div className="mt-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-11/12" />
                  <Skeleton className="h-4 w-10/12" />
                  <Skeleton className="h-4 w-8/12" />
                </div>

                {/* Footer row */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-3 rounded" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="h-6 w-6 overflow-hidden rounded-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <ListSong data={data?.data} />
      <div className="py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() =>
                  currentPage > 1 &&
                  route.push(`/search/${key}?page=${currentPage - 1}`)
                }
              />
            </PaginationItem>
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
              const page = startPage + i;
              return (
                <PaginationItem className="cursor-pointer" key={page}>
                  <PaginationLink
                    className={
                      page === currentPage
                        ? 'rounded-md bg-gray-300 text-black'
                        : ''
                    }
                    onClick={() => route.push(`/search/${key}?page=${page}`)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={() =>
                  currentPage < totalPage &&
                  route.push(`/search/${key}?page=${currentPage + 1}`)
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
