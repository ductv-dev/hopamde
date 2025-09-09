import { DATA } from '@/data/resume';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { buttonVariants } from '@workspace/ui/components/button';
import { Dock, DockIcon } from '@workspace/ui/components/magicui/dock';
import { Separator } from '@workspace/ui/components/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@workspace/ui/components/tooltip';
import { ModeToggle } from './mode-toggle';

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-5 flex h-full max-h-16 origin-bottom">
      {/* Backdrop blur + gradient */}
      <div className="bg-background/0 dark:bg-background/40 fixed inset-x-0 bottom-0 h-16 w-full border-t border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:border-white/20"></div>

      <Dock className="bg-background/0 dark:bg-background/50 pointer-events-auto relative z-50 mx-auto flex h-full min-h-full transform-gpu items-center rounded-2xl border border-white/10 px-2 pb-2 shadow-lg backdrop-blur-md dark:border-white/20">
        {/* Navbar links */}
        {DATA.navbar.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'size-12',
                  )}
                >
                  <item.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}

        <Separator orientation="vertical" className="mx-1 h-full" />

        {/* Social icons */}
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'icon' }),
                      'size-12',
                    )}
                  >
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

        <Separator orientation="vertical" className="mx-1 h-full py-2" />

        {/* Theme toggle */}
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
