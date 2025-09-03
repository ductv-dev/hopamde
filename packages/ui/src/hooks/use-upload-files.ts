import { $api } from '@workspace/ui-utils';
import { useToast } from './use-toast';

export const useUploadFiles = () => {
  const { toastError } = useToast();
  const { mutateAsync: onFilesUploadUrl } = $api.useMutation(
    'post',
    '/files/upload-url',
  );

  const onUploadFiles = async ({
    file,
    callback,
  }: {
    file: File;
    callback?: (data: { postURL: string; key: string }) => void;
  }) => {
    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);

      // Get upload URL
      const rs = await onFilesUploadUrl({
        body: {
          key: `idealabs-${file.type}`,
          contentType: file.type,
        },
      });

      if (!rs?.postURL) {
        throw new Error('Failed to get upload URL');
      }

      // Upload to S3
      const uploadFormData = new FormData();
      Object.entries(rs?.formData).forEach(([key, value]) => {
        if (typeof value === 'string') {
          uploadFormData.append(key, value);
        }
      });
      uploadFormData.append('file', file);

      await fetch(rs?.postURL, {
        method: 'POST',
        body: uploadFormData,
      });
      callback?.({
        postURL: rs?.postURL,
        key: rs?.formData?.key as string,
      });
    } catch {
      toastError('Có lỗi xảy ra. Vui lòng thử lại');
    }
  };

  return {
    onUploadFiles,
  };
};
