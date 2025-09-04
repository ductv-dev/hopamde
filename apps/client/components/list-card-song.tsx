'use client';

import { Clock, Music, User } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@workspace/ui/components/card';
import { Label } from '@workspace/ui/components/label';

type Props = {
  data: Song[];
};
type Song = {
  uid: string;
  song_name: string;
  author?: string;
  lyrics?: string;
};

export const ListSong: React.FC<Props> = ({ data }) => {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((item) => (
          <Link
            href={`/${item.uid}`}
            key={item.uid}
            className="group cursor-pointer"
          >
            <Card className="mx-auto w-full max-w-sm border-0 shadow-none">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-black">
                    <Music className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="line-clamp-1 w-full text-lg font-bold">
                      {item.song_name}
                    </h3>
                    <div className="mt-1 flex items-center gap-1">
                      <User className="h-3 w-3 text-gray-400" />
                      <Label>{item.author || 'Chưa rõ tác giả'}</Label>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {item.lyrics && (
                  <div className="relative">
                    <CardDescription className="line-clamp-4 whitespace-pre-line leading-relaxed text-black">
                      {item.lyrics.substring(0, 150)}
                      {item.lyrics.length > 150 && '...'}
                    </CardDescription>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="flex items-center gap-1 text-xs text-gray-400 group-hover:text-orange-700">
                    <Clock className="h-3 w-3" />
                    Xem toàn bộ
                  </span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full transition-colors group-hover:bg-blue-200">
                    <svg
                      className="h-3 w-3 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
