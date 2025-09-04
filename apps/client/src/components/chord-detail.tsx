'use client';

import { useFetchChord } from '@/app/hooks/use-fetch-chord-detail';
import Image from 'next/image';
import React from 'react';
import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@workspace/ui/components/dialog';
import { Skeleton } from '@workspace/ui/components/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@workspace/ui/components/tooltip';

type Props = {
  id: string;
};

export default function ChordDetail({ id }: Props) {
  const { data, isLoading, isSuccess } = useFetchChord(id);
  const dataChord = [
    // C
    { name: 'C', image: '/chord/C' },
    { name: 'Cm', image: '/chord/Cm' },
    { name: 'C7', image: '/chord/C7' },
    { name: 'Cmaj7', image: '/chord/Cmaj7' },
    { name: 'Csus4', image: '/chord/Csus4' },
    { name: 'Cdim', image: '/chord/Cdim' },
    { name: 'Caug', image: '/chord/Caug' },
    { name: 'C5', image: '/chord/C5' },

    // C-sharp-
    { name: 'C-sharp', image: '/chord/C-sharp' },
    { name: 'C-sharpm', image: '/chord/C-sharpm' },
    { name: 'C-sharp7', image: '/chord/C-sharp7' },
    { name: 'C-sharpmaj7', image: '/chord/C-sharpmaj7' },
    { name: 'C-sharpsus4', image: '/chord/C-sharpsus4' },
    { name: 'C-sharpdim', image: '/chord/C-sharpdim' },
    { name: 'C-sharpaug', image: '/chord/C-sharpaug' },
    { name: 'C-sharp5', image: '/chord/C-sharp5' },

    // D
    { name: 'D', image: '/chord/D' },
    { name: 'Dm', image: '/chord/Dm' },
    { name: 'D7', image: '/chord/D7' },
    { name: 'Dmaj7', image: '/chord/Dmaj7' },
    { name: 'Dsus4', image: '/chord/Dsus4' },
    { name: 'Ddim', image: '/chord/Ddim' },
    { name: 'Daug', image: '/chord/Daug' },
    { name: 'D5', image: '/chord/D5' },

    // D-sharp
    { name: 'D-sharp', image: '/chord/D-sharp' },
    { name: 'D-sharpm', image: '/chord/D-sharpm' },
    { name: 'D-sharp7', image: '/chord/D-sharp7' },
    { name: 'D-sharpmaj7', image: '/chord/D-sharpmaj7' },
    { name: 'D-sharpsus4', image: '/chord/D-sharpsus4' },
    { name: 'D-sharpdim', image: '/chord/D-sharpdim' },
    { name: 'D-sharpaug', image: '/chord/D-sharpaug' },
    { name: 'D-sharp5', image: '/chord/D-sharp5' },

    // E
    { name: 'E', image: '/chord/E' },
    { name: 'Em', image: '/chord/Em' },
    { name: 'E7', image: '/chord/E7' },
    { name: 'Emaj7', image: '/chord/Emaj7' },
    { name: 'Esus4', image: '/chord/Esus4' },
    { name: 'Edim', image: '/chord/Edim' },
    { name: 'Eaug', image: '/chord/Eaug' },
    { name: 'E5', image: '/chord/E5' },

    // F
    { name: 'F', image: '/chord/F' },
    { name: 'Fm', image: '/chord/Fm' },
    { name: 'F7', image: '/chord/F7' },
    { name: 'Fmaj7', image: '/chord/Fmaj7' },
    { name: 'Fsus4', image: '/chord/Fsus4' },
    { name: 'Fdim', image: '/chord/Fdim' },
    { name: 'Faug', image: '/chord/Faug' },
    { name: 'F5', image: '/chord/F5' },

    // F-sharp
    { name: 'F-sharp', image: '/chord/F-sharp' },
    { name: 'F-sharpm', image: '/chord/F-sharpm' },
    { name: 'F-sharp7', image: '/chord/F-sharp7' },
    { name: 'F-sharpmaj7', image: '/chord/F-sharpmaj7' },
    { name: 'F-sharpsus4', image: '/chord/F-sharpsus4' },
    { name: 'F-sharpdim', image: '/chord/F-sharpdim' },
    { name: 'F-sharpaug', image: '/chord/F-sharpaug' },
    { name: 'F-sharp5', image: '/chord/F-sharp5' },

    // G
    { name: 'G', image: '/chord/G' },
    { name: 'Gm', image: '/chord/Gm' },
    { name: 'G7', image: '/chord/G7' },
    { name: 'Gmaj7', image: '/chord/Gmaj7' },
    { name: 'Gsus4', image: '/chord/Gsus4' },
    { name: 'Gdim', image: '/chord/Gdim' },
    { name: 'Gaug', image: '/chord/Gaug' },
    { name: 'G5', image: '/chord/G5' },

    // G-sharp
    { name: 'G-sharp', image: '/chord/G-sharp' },
    { name: 'G-sharpm', image: '/chord/G-sharpm' },
    { name: 'G-sharp7', image: '/chord/G-sharp7' },
    { name: 'G-sharpmaj7', image: '/chord/G-sharpmaj7' },
    { name: 'G-sharpsus4', image: '/chord/G-sharpsus4' },
    { name: 'G-sharpdim', image: '/chord/G-sharpdim' },
    { name: 'G-sharpaug', image: '/chord/G-sharpaug' },
    { name: 'G-sharp5', image: '/chord/G-sharp5' },

    // A
    { name: 'A', image: '/chord/A' },
    { name: 'Am', image: '/chord/Am' },
    { name: 'A7', image: '/chord/A7' },
    { name: 'Amaj7', image: '/chord/Amaj7' },
    { name: 'Asus4', image: '/chord/Asus4' },
    { name: 'Adim', image: '/chord/Adim' },
    { name: 'Aaug', image: '/chord/Aaug' },
    { name: 'A5', image: '/chord/A5' },

    // A-sharp-
    { name: 'A-sharp', image: '/chord/A-sharp' },
    { name: 'A-sharp-m', image: '/chord/A-sharp-m' },
    { name: 'A-sharp-7', image: '/chord/A-sharp-7' },
    { name: 'A-sharp-maj7', image: '/chord/A-sharp-maj7' },
    { name: 'A-sharp-sus4', image: '/chord/A-sharp-sus4' },
    { name: 'A-sharp-dim', image: '/chord/A-sharp-dim' },
    { name: 'A-sharp-aug', image: '/chord/A-sharp-aug' },
    { name: 'A-sharp-5', image: '/chord/A-sharp-5' },

    // B
    { name: 'B', image: '/chord/B' },
    { name: 'Bb', image: '/chord/Bb' },
    { name: 'Bm', image: '/chord/Bm' },
    { name: 'B7', image: '/chord/B7' },
    { name: 'Bmaj7', image: '/chord/Bmaj7' },
    { name: 'Bsus4', image: '/chord/Bsus4' },
    { name: 'Bdim', image: '/chord/Bdim' },
    { name: 'Baug', image: '/chord/Baug' },
    { name: 'B5', image: '/chord/B5' },
  ];
  const lyricArray = data?.lyrics
    ?.split(/(\[[^\]]+\])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const parsedLyrics = lyricArray?.map((item, i) => {
    if (item.startsWith('[') && item.endsWith(']')) {
      const chordName = item.slice(1, -1);
      const normalizedChordName = chordName.replace(/#/g, '-sharp').trim();

      const chord = dataChord.find((c) => c.name === normalizedChordName);

      if (chord) {
        return (
          <TooltipProvider key={i}>
            <Tooltip>
              {/* Desktop */}
              <TooltipTrigger asChild className="hidden sm:inline">
                <span className="cursor-pointer font-bold text-orange-700">
                  {item}
                </span>
              </TooltipTrigger>
              <TooltipContent className="hidden w-[300px] bg-white px-0 sm:block">
                <Card>
                  <CardContent className="flex flex-col items-center">
                    <span className="text-xl font-bold">{item}</span>
                    <Image
                      height={300}
                      width={250}
                      src={`${chord.image}.png`}
                      alt={chord.name}
                      className="w-[250px]"
                    />
                  </CardContent>
                </Card>
              </TooltipContent>

              {/* Mobile fallback */}
              <Dialog>
                <DialogTrigger asChild className="sm:hidden">
                  <span className="cursor-pointer font-bold text-orange-700">
                    {item}
                  </span>
                </DialogTrigger>
                <DialogContent className="w-fit">
                  <DialogHeader>
                    <DialogTitle className="text-center">{item}</DialogTitle>
                  </DialogHeader>
                  <div className="flex justify-center">
                    <Image
                      src={`${chord.image}.png`}
                      alt="Hợp âm đang cập nhật"
                      width={220}
                      height={220}
                      className="sm:h-[250px] sm:w-[250px]"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </Tooltip>
          </TooltipProvider>
        );
      }
      return item;
    }
    return item + ' ';
  });
  console.log('lyric', parsedLyrics);

  return (
    <div className="max-w-screen mt-14 min-h-screen bg-gray-200">
      <div className="mx-auto max-w-6xl p-4">
        {isLoading && (
          <div className="mt-[1rem]">
            <div className="flex flex-col gap-5">
              <Skeleton className="mx-auto h-10 w-2/3 rounded-md" />

              <div className="flex w-full justify-between gap-2 lg:justify-start">
                <Skeleton className="h-10 w-32 rounded-md" />
                <Skeleton className="h-10 w-28 rounded-md" />
              </div>

              <Card className="w-full">
                <CardHeader>
                  <Skeleton className="h-6 w-40 rounded-md" />
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                  <Skeleton className="h-[300px] w-full"></Skeleton>
                  <Skeleton className="h-[300px] w-full"></Skeleton>
                  <Skeleton className="h-[300px] w-full md:hidden lg:block"></Skeleton>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        {isSuccess && (
          <div className="mx-auto max-w-6xl bg-white/0 text-black">
            <h1 className="p-3 text-center text-4xl font-semibold">
              {data?.song_name}
            </h1>
            <Image
              src={'/chord/B7.png'}
              alt="Hợp âm đang cập nhật"
              width={220}
              height={220}
              className="sm:h-[250px] sm:w-[250px]"
            ></Image>
            <div className="my-4 flex justify-between gap-2 lg:justify-start">
              <Button className="w-fit rounded-md border border-white text-sm font-bold sm:text-base dark:bg-blue-600">
                Author: {data?.author}
              </Button>
              {data?.youtube_link && (
                <a
                  target="_blank"
                  href={data?.youtube_link}
                  rel="noopener noreferrer"
                >
                  <Button className="flex items-center gap-2 border border-red-500 bg-white/0 text-sm text-red-600 hover:bg-red-500 hover:text-white sm:text-base">
                    Youtube
                  </Button>
                </a>
              )}
            </div>

            <Card className="">
              <CardHeader>
                <CardTitle>Chi tiết hợp âm</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="mx-auto w-full max-w-5xl columns-1 gap-6 whitespace-pre-wrap break-words px-2 text-sm leading-7 sm:px-4 sm:text-base sm:leading-8 md:text-lg lg:columns-2 lg:leading-[2.2rem] xl:columns-3">
                  {parsedLyrics}
                </pre>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
