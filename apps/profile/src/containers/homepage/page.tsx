'use client';

import { MenuBar } from '@/components/menu-bar';
import { ProjectCard } from '@/components/project-card';
import { ResumeCard } from '@/components/resume-card';
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
      {/* Work Experience */}
      <section id="work" className="mt-10">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? 'Present'}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Education */}

      <section id="education" className="mt-10">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
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
      <section id="projects" className="mt-10">
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
      {/* Contact */}
      <section id="contact">
        <div className="grid w-full items-center justify-center gap-4 px-4 py-12 text-center md:px-6">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="bg-foreground text-background inline-block rounded-lg px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="text-muted-foreground mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a question or idea? Send me an email at{' '}
                <Link
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=vietducdtu@gmail.com&su=Hello&body=Hi"
                  className="text-blue-500 hover:underline"
                >
                  vietducdtu@gmail.com
                </Link>{' '}
                and I’ll get back to you as soon as possible. Please, no
                solicitations.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto mb-4 flex w-full max-w-2xl justify-center px-4">
        <MenuBar />
      </div>
    </div>
  );
};
