import { useRef } from 'react';
import { Label } from '@workspace/ui/components/label';
import { useUploadFiles } from '@workspace/ui/hooks/use-upload-files';
import { cn } from '@workspace/ui/lib/utils';

type Props = {
  onSuccess: (data: { postURL: string; key: string }) => void;
  children: React.ReactNode;
  className?: string;
};

export const ButtonUploadImage: React.FC<Props> = ({
  onSuccess,
  children,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { onUploadFiles } = useUploadFiles();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onUploadFiles({
        file,
        callback: (res) => {
          onSuccess(res);
        },
      });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Label
        htmlFor="picture"
        className={cn(
          'hover:bg-accent flex h-full cursor-pointer items-center px-2 font-normal',
          className,
        )}
      >
        {children}
      </Label>
      <input
        id="picture"
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onInput={handleFileChange}
      />
    </>
  );
};
