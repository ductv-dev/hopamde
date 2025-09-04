'use client';

import { useFetchGenres } from '@/app/hooks/use-fetch-genres';
import { Music } from 'lucide-react';
import Link from 'next/link';
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

type TGenre = {
  genre: string;
  count: number;
};

export const SearchGenre = () => {
  const searchParams = useSearchParams();
  const pageString = searchParams.get('page');
  const currentPage = Number(pageString) || 1;
  const { data: dataGenres, isLoading: isLoadingGenres } = useFetchGenres({
    name: '',
    offset: (currentPage - 1) * 24,
    limit: 24,
  });
  const route = useRouter();

  const totalPage = Math.ceil(
    dataGenres?.pagination.total / dataGenres?.pagination.limit,
  );

  const startPage = Math.max(1, currentPage - 3);
  const endPage = Math.min(totalPage, currentPage + 3);

  return (
    <div className="mt-15 min-h-screen bg-gray-200 py-4">
      <div className="mx-auto max-w-6xl">
        <div className="py-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Music className="hidden h-8 w-8 text-blue-600 lg:block" />
            <h1 className="bg-gradient-to-r from-blue-900 to-purple-700 bg-clip-text text-4xl font-bold text-transparent">
              Thể loại
            </h1>
          </div>
          <p className="mx-auto max-w-2xl text-gray-600">
            Gần {dataGenres?.pagination?.total} thể loại nhạc
          </p>
        </div>
        {isLoadingGenres && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Card
                key={idx}
                className="border-1 h-full border-white/50 bg-white/20 shadow-md shadow-white backdrop-blur-sm"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-lg">
                      <Skeleton className="h-full w-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Skeleton className="mb-2 h-5 w-3/4" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="mb-2 h-4 w-3/4" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dataGenres?.data?.map((item: TGenre) => (
            <Link
              href={`/genres/${item.genre}`}
              key={item.genre}
              className="group cursor-pointer"
            >
              <Card className="mx-3 h-full">
                <CardHeader className="">
                  <div className="grid grid-cols-3">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-gray-800">
                      <Music className="h-6 w-6" />
                    </div>

                    <div className="col-span-2">
                      <h3 className="line-clamp-1 text-lg font-bold transition-colors">
                        {item.genre}
                      </h3>
                      <span>{item.count} bài hát</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() =>
                    currentPage > 1 &&
                    route.push(`/genres?page=${currentPage - 1}`)
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
                      onClick={() => route.push(`/genres?page=${page}`)}
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
                    route.push(`/genres?page=${currentPage + 1}`)
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* Empty state */}
        {dataGenres?.data?.length === 0 && (
          <div className="py-16 text-center">
            <Music className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2 text-lg font-semibold text-gray-600">
              Không tìm thấy thể loại nào
            </h3>
            <p className="text-gray-500">
              Thử tìm kiếm với từ khóa khác hoặc khám phá những thể loại phổ
              biến
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
