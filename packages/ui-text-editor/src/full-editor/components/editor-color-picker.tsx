import { EraserIcon, PlusIcon } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover';
import { Separator } from '@workspace/ui/components/separator';
import { Toggle } from '@workspace/ui/components/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@workspace/ui/components/tooltip';

type Props = {
  openColorPicker: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectColor: (color: string) => void;
  onResetColor: () => void;
  triggerNode: React.ReactNode;
  tooltipContent: string;
};

export const EditorColorPicker: React.FC<Props> = ({
  openColorPicker,
  onOpenChange,
  onSelectColor,
  onResetColor,
  triggerNode,
  tooltipContent,
}) => {
  return (
    <Popover open={openColorPicker} onOpenChange={onOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <PopoverTrigger asChild>{triggerNode}</PopoverTrigger>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
      <PopoverContent className="w-fit p-0">
        <div className="flex flex-col">
          <div className="pt-2">
            <div className="px-2 py-1.5 text-xs font-medium">Custom Colors</div>

            <div className="flex items-center justify-between px-2 pb-2">
              <div className="flex w-fit gap-1">
                {moreColors.map((color) => (
                  <Tooltip key={color?.code}>
                    <TooltipTrigger asChild>
                      <div
                        onClick={() => {
                          onSelectColor(color?.code);
                        }}
                        className="col-span-1 size-6 cursor-pointer rounded-full"
                        style={{ backgroundColor: color?.code }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{color?.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
              <input
                type="color"
                id="colorPicker"
                name="colorPicker"
                className="invisible"
                onChange={(e) => {
                  onSelectColor(e.target.value);
                }}
              />

              <Button
                variant={'outline'}
                className="size-8 cursor-pointer rounded-full p-0"
              >
                <label htmlFor="colorPicker" className="p-4">
                  <PlusIcon />
                </label>
              </Button>
            </div>
          </div>

          <Separator className="mt-1" />
          <div className="p-1">
            <div className="px-2 py-1.5 text-xs font-medium">
              Default Colors
            </div>
            <div
              className="grid gap-1 px-2 pb-2"
              style={{
                gridTemplateColumns: 'repeat(10, 1fr)',
              }}
            >
              {defaultColors.map((color) => (
                <Tooltip key={color?.code}>
                  <TooltipTrigger asChild>
                    <div
                      onClick={() => {
                        onSelectColor(color?.code);
                      }}
                      className="col-span-1 size-6 cursor-pointer rounded-full"
                      style={{ backgroundColor: color?.code }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{color?.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          <Separator className="my-1" />
          <Toggle
            className="mx-2 mb-1 cursor-pointer justify-start"
            size="sm"
            onPressedChange={() => onResetColor()}
          >
            <EraserIcon />
            Clear
          </Toggle>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const moreColors = [
  { name: 'Brown2', code: '#783F04' },
  { name: 'DarkGray2', code: '#666666' },
  { name: 'Gray1', code: '#999999' },
  { name: 'Blue3', code: '#6C9EEB' },
  { name: 'Pink4', code: '#4C1130' },
];

const defaultColors = [
  { name: 'Black', code: '#000000' },
  { name: 'DarkGray1', code: '#434343' },
  { name: 'DarkGray2', code: '#666666' },
  { name: 'Gray1', code: '#999999' },
  { name: 'Gray2', code: '#B7B7B7' },
  { name: 'LightGray1', code: '#CCCCCC' },
  { name: 'LightGray2', code: '#D9D9D9' },
  { name: 'LightGray3', code: '#EFEFEF' },
  { name: 'LightGray4', code: '#F3F3F3' },
  { name: 'White', code: '#FFFFFF' },
  { name: 'DarkRed1', code: '#980100' },
  { name: 'Red1', code: '#FE0000' },
  { name: 'Orange1', code: '#FE9900' },
  { name: 'Yellow1', code: '#FEFF00' },
  { name: 'Green1', code: '#00FF00' },
  { name: 'Cyan1', code: '#00FFFF' },
  { name: 'Blue1', code: '#4B85E8' },
  { name: 'Blue2', code: '#1300FF' },
  { name: 'Purple1', code: '#9900FF' },
  { name: 'Magenta1', code: '#FF00FF' },
  { name: 'LightCoral1', code: '#E6B8AF' },
  { name: 'LightCoral2', code: '#F4CCCC' },
  { name: 'LightYellow1', code: '#FCE4CD' },
  { name: 'LightYellow2', code: '#FFF2CC' },
  { name: 'LightGreen1', code: '#D9EAD3' },
  { name: 'LightCyan1', code: '#D0DFE3' },
  { name: 'LightBlue1', code: '#C9DAF8' },
  { name: 'LightBlue2', code: '#CFE1F3' },
  { name: 'LightPurple1', code: '#D9D2E9' },
  { name: 'LightPink1', code: '#EAD1DB' },
  { name: 'Coral1', code: '#DC7E6B' },
  { name: 'LightRed1', code: '#EA9999' },
  { name: 'LightOrange1', code: '#F9CB9C' },
  { name: 'LightYellow3', code: '#FFE598' },
  { name: 'LightGreen2', code: '#B7D6A8' },
  { name: 'LightCyan2', code: '#A1C4C9' },
  { name: 'LightBlue3', code: '#A4C2F4' },
  { name: 'LightBlue4', code: '#9FC5E8' },
  { name: 'LightPurple2', code: '#B5A7D5' },
  { name: 'LightPink2', code: '#D5A6BD' },
  { name: 'Red2', code: '#CC4125' },
  { name: 'LightRed2', code: '#E06666' },
  { name: 'Orange2', code: '#F6B26B' },
  { name: 'Yellow2', code: '#FFD966' },
  { name: 'Green2', code: '#93C47D' },
  { name: 'Cyan2', code: '#76A5AE' },
  { name: 'Blue3', code: '#6C9EEB' },
  { name: 'Blue4', code: '#6FA8DC' },
  { name: 'Purple2', code: '#8D7CC3' },
  { name: 'Pink1', code: '#C27BA0' },
  { name: 'DarkRed2', code: '#A61B00' },
  { name: 'Red3', code: '#CC0000' },
  { name: 'Orange3', code: '#E59138' },
  { name: 'Yellow3', code: '#F1C231' },
  { name: 'Green3', code: '#6AA74F' },
  { name: 'Cyan3', code: '#45818E' },
  { name: 'Blue5', code: '#3B78D8' },
  { name: 'Blue6', code: '#3E84C6' },
  { name: 'Purple3', code: '#664EA6' },
  { name: 'Pink2', code: '#A64D78' },
  { name: 'DarkRed3', code: '#84200D' },
  { name: 'DarkRed4', code: '#990001' },
  { name: 'Brown1', code: '#B45F05' },
  { name: 'Yellow4', code: '#BF9002' },
  { name: 'Green4', code: '#38761D' },
  { name: 'Cyan4', code: '#124F5C' },
  { name: 'Blue7', code: '#1155CB' },
  { name: 'Blue8', code: '#0C5394' },
  { name: 'Purple4', code: '#351C75' },
  { name: 'Pink3', code: '#741B47' },
  { name: 'DarkRed5', code: '#5B0F00' },
  { name: 'DarkRed6', code: '#660000' },
  { name: 'Brown2', code: '#783F04' },
  { name: 'Brown3', code: '#7E6000' },
  { name: 'Green5', code: '#274E12' },
  { name: 'Cyan5', code: '#0D343D' },
  { name: 'Blue9', code: '#1B4487' },
  { name: 'Blue10', code: '#083763' },
  { name: 'Purple5', code: '#1F124D' },
  { name: 'Pink4', code: '#4C1130' },
];
