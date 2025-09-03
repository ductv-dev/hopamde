'use client';

import type React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { cn } from '@workspace/ui/lib/utils';

export type TourStep = {
  content: React.ReactNode;
  selectorId: string;
  width?: number;
  height?: number;
  onClickWithinArea?: () => void;
  position?: 'top' | 'bottom' | 'left' | 'right';
};

type TourContextType = {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  previousStep: () => void;
  endTour: () => void;
  isActive: boolean;
  startTour: () => void;
  setSteps: (steps: TourStep[]) => void;
  steps: TourStep[];
  isTourCompleted: boolean;
  setIsTourCompleted: (completed: boolean) => void;
};

type TourProviderProps = {
  children: React.ReactNode;
  onComplete?: () => void;
  className?: string;
  isTourCompleted?: boolean;
  storageKey?: string;
};

const TourContext = createContext<TourContextType | null>(null);

const PADDING = 16;
const CONTENT_WIDTH = 300;
const CONTENT_HEIGHT = 200;

function getElementPosition(id: string) {
  const element = document.getElementById(id);
  if (!element) return null;
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

function calculateContentPosition(
  elementPos: { top: number; left: number; width: number; height: number },
  position: 'top' | 'bottom' | 'left' | 'right' = 'bottom',
) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let left = elementPos.left;
  let top = elementPos.top;

  switch (position) {
    case 'top':
      top = elementPos.top - CONTENT_HEIGHT - PADDING;
      left = elementPos.left + elementPos.width / 2 - CONTENT_WIDTH / 2;
      break;
    case 'bottom':
      top = elementPos.top + elementPos.height + PADDING;
      left = elementPos.left + elementPos.width / 2 - CONTENT_WIDTH / 2;
      break;
    case 'left':
      left = elementPos.left - CONTENT_WIDTH - PADDING;
      top = elementPos.top + elementPos.height / 2 - CONTENT_HEIGHT / 2;
      break;
    case 'right':
      left = elementPos.left + elementPos.width + PADDING;
      top = elementPos.top + elementPos.height / 2 - CONTENT_HEIGHT / 2;
      break;
  }

  return {
    top: Math.max(
      PADDING,
      Math.min(top, viewportHeight - CONTENT_HEIGHT - PADDING),
    ),
    left: Math.max(
      PADDING,
      Math.min(left, viewportWidth - CONTENT_WIDTH - PADDING),
    ),
    width: CONTENT_WIDTH,
    height: CONTENT_HEIGHT,
  };
}

export function TourProvider({
  children,
  onComplete,
  className,
  isTourCompleted = false,
  storageKey = 'tour-completed',
}: TourProviderProps) {
  const [steps, setSteps] = useState<TourStep[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [elementPosition, setElementPosition] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const [isCompleted, setIsCompleted] = useState(isTourCompleted);

  useEffect(() => {
    try {
      const persisted = localStorage.getItem(storageKey);
      if (persisted === 'true') {
        setIsCompleted(true);
      }
    } catch {
      // ignore error
    }
  }, [storageKey]);

  // Auto-scroll the target element into view when step changes
  useEffect(() => {
    if (currentStep < 0 || currentStep >= steps.length) return;

    const targetId = steps[currentStep]?.selectorId ?? '';
    if (!targetId) return;

    const element = document.getElementById(targetId);
    if (!element) return;

    const rect = element.getBoundingClientRect();

    const isInViewport =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);

    // if not in viewport, scroll to the element
    if (!isInViewport) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  }, [currentStep, steps]);

  const updateElementPosition = useCallback(() => {
    if (currentStep >= 0 && currentStep < steps.length) {
      const position = getElementPosition(steps[currentStep]?.selectorId ?? '');
      if (position) {
        setElementPosition(position);
      }
    }
  }, [currentStep, steps]);

  useEffect(() => {
    updateElementPosition();
    window.addEventListener('resize', updateElementPosition);
    window.addEventListener('scroll', updateElementPosition);

    return () => {
      window.removeEventListener('resize', updateElementPosition);
      window.removeEventListener('scroll', updateElementPosition);
    };
  }, [updateElementPosition]);

  const nextStep = useCallback(async () => {
    setCurrentStep((prev) => {
      if (prev >= steps.length - 1) {
        return -1;
      }
      return prev + 1;
    });

    if (currentStep === steps.length - 1) {
      setIsTourCompleted(true);
      onComplete?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length, onComplete, currentStep]);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const endTour = useCallback(() => {
    setCurrentStep(-1);
  }, []);

  const startTour = useCallback(() => {
    if (isCompleted) {
      return;
    }
    setCurrentStep(0);
  }, [isCompleted]);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (
        currentStep >= 0 &&
        elementPosition &&
        steps[currentStep]?.onClickWithinArea
      ) {
        const clickX = e.clientX;
        const clickY = e.clientY;

        const isWithinBounds =
          clickX >= elementPosition.left &&
          clickX <=
            elementPosition.left +
              (steps[currentStep]?.width || elementPosition.width) &&
          clickY >= elementPosition.top &&
          clickY <=
            elementPosition.top +
              (steps[currentStep]?.height || elementPosition.height);

        if (isWithinBounds) {
          steps[currentStep].onClickWithinArea?.();
        }
      }
    },
    [currentStep, elementPosition, steps],
  );

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  const setIsTourCompleted = useCallback(
    (completed: boolean) => {
      setIsCompleted(completed);
      try {
        if (completed) {
          localStorage.setItem(storageKey, 'true');
        } else {
          localStorage.removeItem(storageKey);
        }
      } catch {
        // ignore storage access errors
      }
    },
    [storageKey],
  );

  return (
    <TourContext.Provider
      value={{
        currentStep,
        totalSteps: steps.length,
        nextStep,
        previousStep,
        endTour,
        isActive: currentStep >= 0,
        startTour,
        setSteps,
        steps,
        isTourCompleted: isCompleted,
        setIsTourCompleted,
      }}
    >
      {children}
      <AnimatePresence>
        {currentStep >= 0 && elementPosition && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50"
              style={{
                clipPath: `polygon(
                  0% 0%,                                                                          /* top-left */
                  0% 100%,                                                                        /* bottom-left */
                  100% 100%,                                                                      /* bottom-right */
                  100% 0%,                                                                        /* top-right */
                  
                  /* Create rectangular hole */
                  ${elementPosition.left}px 0%,                                                   /* top edge start */
                  ${elementPosition.left}px ${elementPosition.top}px,                             /* hole top-left */
                  ${elementPosition.left + (steps[currentStep]?.width || elementPosition.width)}px ${elementPosition.top}px,  /* hole top-right */
                  ${elementPosition.left + (steps[currentStep]?.width || elementPosition.width)}px ${elementPosition.top + (steps[currentStep]?.height || elementPosition.height)}px,  /* hole bottom-right */
                  ${elementPosition.left}px ${elementPosition.top + (steps[currentStep]?.height || elementPosition.height)}px,  /* hole bottom-left */
                  ${elementPosition.left}px 0%                                                    /* back to top edge */
                )`,
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                position: 'fixed',
                top: elementPosition.top,
                left: elementPosition.left,
                width: steps[currentStep]?.width || elementPosition.width,
                height: steps[currentStep]?.height || elementPosition.height,
              }}
              className={cn(
                'border-muted-foreground z-[100] border-2',
                className,
              )}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                top: calculateContentPosition(
                  elementPosition,
                  steps[currentStep]?.position,
                ).top,
                left: calculateContentPosition(
                  elementPosition,
                  steps[currentStep]?.position,
                ).left,
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                opacity: { duration: 0.4 },
              }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                position: 'fixed',
                width: calculateContentPosition(
                  elementPosition,
                  steps[currentStep]?.position,
                ).width,
              }}
              className="bg-background relative z-[100] rounded-lg border p-4 shadow-lg"
            >
              <div className="text-muted-foreground absolute right-4 top-4 text-xs">
                {currentStep + 1} / {steps.length}
              </div>
              <AnimatePresence mode="wait">
                <div>
                  <motion.div
                    key={`tour-content-${currentStep}`}
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                    className="overflow-hidden"
                    transition={{
                      duration: 0.2,
                      height: {
                        duration: 0.4,
                      },
                    }}
                  >
                    {steps[currentStep]?.content}
                  </motion.div>
                  <div className="mt-4 flex items-center justify-between">
                    {currentStep > 0 && (
                      <button
                        onClick={previousStep}
                        disabled={currentStep === 0}
                        className="text-muted-foreground hover:text-foreground cursor-pointer text-sm"
                      >
                        Quay lại
                      </button>
                    )}
                    <button
                      onClick={nextStep}
                      className="text-primary hover:text-primary/90 ml-auto cursor-pointer text-sm font-medium"
                    >
                      {currentStep === steps.length - 1
                        ? 'Hoàn thành'
                        : 'Tiếp theo'}
                    </button>
                  </div>
                </div>
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </TourContext.Provider>
  );
}

export function useTour() {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
}
