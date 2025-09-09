'use client';

import { MenuBar } from '@/components/menu-bar';
import { ProjectCard } from '@/components/project-card';
import { DATA } from '@/data/resume';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Markdown from 'react-markdown';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardHeader } from '@workspace/ui/components/card';
import { BlurFade } from '@workspace/ui/components/magicui/blur-fade';
import { cn } from '@workspace/ui/lib/utils';

const BLUR_FADE_DELAY = 0.04;
export const HomePage = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-10">
      {/* Name */}
      <div className="mt-2 flex items-center justify-center gap-2">
        <div className="flex-1">
          <span className="block text-6xl font-bold text-gray-900 dark:text-white">
            Hi!!! I am Viet Duc
          </span>
          <p className="text-xl text-gray-600 dark:text-gray-50">
            Frontend developer with a passion for learning new things
          </p>
        </div>
        <Avatar className="h-[120px] w-[120px] ring-4 ring-gray-200">
          <AvatarImage
            src={'/avatarvd.JPG'}
            className="h-[120px] w-[120px] rounded-full object-cover"
          />
        </Avatar>
      </div>
      {/* About */}
      <section id="about" className="mt-10">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose text-muted-foreground dark:prose-invert max-w-full text-pretty font-sans text-sm">
            <Markdown>
              I am a frontend developer with experience in building web
              applications using ReactJS, NextJS, and VueJS. I have a strong
              understanding of web development principles and best practices. I
              am passionate about learning new technologies and improving my
              skills.
            </Markdown>
          </div>
        </BlurFade>
      </section>

      {/* Education */}

      <section id="educalion" className="mt-10">
        <div className="flex flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <Link
              target="_blank"
              href={'https://duytan.edu.vn/'}
              className="block cursor-pointer"
              // onClick={(e) => {
              //   e.preventDefault();
              //   setIsExpanded(!isExpanded);
              // }}
            >
              <Card className="flex border-0 bg-none shadow-none dark:bg-white/0">
                <div className="group ml-4 items-center">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-x-2 text-base">
                      <div className="w-16">
                        <Avatar className="bg-muted-background dark:bg-foreground m-auto size-12 border">
                          <AvatarImage
                            src={
                              'https://files02.duytan.edu.vn/svruploads/dtu-duytan/upload/images/logoDT-70.png'
                            }
                            alt={'DTU Logo'}
                            className="object-contain"
                          />
                          <AvatarFallback>DTU</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-grow items-center justify-between">
                        <div>
                          <h3 className="inline-flex items-center justify-center text-xs font-semibold leading-none sm:text-sm">
                            Duy Tan University
                            <ChevronRightIcon
                              className={cn(
                                'size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100',
                                isExpanded ? 'rotate-90' : 'rotate-0',
                              )}
                            />
                          </h3>
                          <div className="font-sans text-xs">
                            Software Engineering
                          </div>
                        </div>

                        <div className="text-muted-foreground text-right text-xs tabular-nums sm:text-sm">
                          2021-2025
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: isExpanded ? 1 : 0,

                      height: isExpanded ? 'auto' : 0,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mt-2 text-xs sm:text-sm"
                  >
                    description
                  </motion.div>
                </div>
              </Card>
            </Link>
          </BlurFade>
        </div>
      </section>
      {/* Skills */}
      <section id="skills" className="mt-10">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      {/* Projects */}
      <section id="projects">
        <div className="w-full space-y-12 py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="bg-foreground text-background inline-block rounded-lg px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-3 sm:grid-cols-2">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto mb-4 flex w-full max-w-2xl justify-center px-4">
        <MenuBar />
      </div>
    </div>
  );
};
