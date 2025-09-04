'use client';

import { useFetchListSong } from '@/app/hooks/use-fetch-songs';
import { Music } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardHeader } from '@workspace/ui/components/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@workspace/ui/components/pagination';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { ListSong } from '../../../../components/list-card-song';

type Props = {
  id: string;
};

export const SongByAuthors: React.FC<Props> = ({ id }) => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const pageString = searchParams.get('page');
  const currentPage = Number(pageString) || 1;
  console.log(id);

  const { data: dataSongByAuthor, isLoading: isLoadingSongbyAuthor } =
    useFetchListSong({
      q: '',
      author: id,
      limit: 18,
      offset: (currentPage - 1) * 18,
    });

  const totalPages = Math.ceil(
    dataSongByAuthor?.pagination.total / dataSongByAuthor?.pagination.limit,
  );
  const startPage = Math.max(1, currentPage - 3);
  const endPage = Math.min(totalPages, currentPage + 3);

  return (
    <div className="max-w-screen mt-15 min-h-screen bg-gray-200 px-[1rem]">
      <div className="mx-auto max-w-6xl">
        <div className="py-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Music className="hidden h-8 w-8 text-blue-600 lg:block" />
            <h1 className="bg-gradient-to-r from-blue-900 to-purple-700 bg-clip-text text-xl font-bold text-transparent">
              Tác giả : {id}
            </h1>
          </div>
          <p className="mx-auto max-w-2xl text-gray-600">
            Gồm {dataSongByAuthor?.pagination?.total} bài hát cho thể loại {id}
          </p>
        </div>

        {/* Loading skeleton */}
        {isLoadingSongbyAuthor && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card
                key={i}
                className="border-1 h-full border-white/50 bg-white/20 shadow-md shadow-white backdrop-blur-sm"
              >
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
              </Card>
            ))}
          </div>
        )}

        {/* Songs list */}
        <ListSong data={dataSongByAuthor?.data} />

        <div className="py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() =>
                    currentPage > 1 &&
                    route.push(`/genres/${id}?page=${currentPage - 1}`)
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
                      onClick={() => route.push(`/genres/${id}?page=${page}`)}
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
                    currentPage < totalPages &&
                    route.push(`/genres/${id}?page=${currentPage + 1}`)
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};
