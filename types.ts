import type { ReactElement } from 'react';

export interface ImageFile {
  file: File;
  base64: string;
}

export interface ProcessingOption {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon: ReactElement;
}
