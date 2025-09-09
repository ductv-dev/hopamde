'use client';

import { Clock, Code, GraduationCap } from 'lucide-react';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardContent } from '@workspace/ui/components/card';

export function Timeline() {
  return (
    <div className="w-full">
      <h2 className="mb-10 text-center text-3xl font-bold text-gray-800 dark:text-white">
        About Me
      </h2>
      <div className="relative border-l-2 border-gray-200 dark:border-gray-700">
        {/* Education */}
        <div className="mb-12 ml-6">
          <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white ring-4 ring-white dark:ring-gray-900">
            <GraduationCap size={14} />
          </span>

          <Badge className="mb-3 bg-blue-100 text-blue-800">Education</Badge>
          <Card className="shadow-md">
            <CardContent>
              <h3 className="text-lg font-semibold">Duy Tan University</h3>
              <time className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={14} /> <span>2021 - 2025</span>
              </time>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Software Engineering
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Skills */}
        <div className="mb-12 ml-6">
          <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white ring-4 ring-white dark:ring-gray-900">
            <Code size={14} />
          </span>

          <Badge className="mb-3 bg-green-100 text-green-800">Skills</Badge>
          <Card className="shadow-md">
            <CardContent>
              <h3 className="text-lg font-semibold">Frontend Developer</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                <b>Frontend:</b> ReactJS, NextJS, VueJS, Tailwind, ShadCN
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <b>Backend:</b> Laravel
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <b>Database:</b> MySQL
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <b>Tools:</b> Git, Postman, VSCode, Vercel
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
