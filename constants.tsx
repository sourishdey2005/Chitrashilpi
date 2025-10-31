
import React from 'react';
import type { ProcessingOption } from './types';

const PaintBrushIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

const WandIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5c-1.15 0-2.22.3-3.14.83a5.03 5.03 0 00-1.72 1.72c-.53.92-.83 2-.83 3.14v3.31h11.38v-3.31c0-1.15-.3-2.22-.83-3.14a5.03 5.03 0 00-1.72-1.72c-.92-.53-2-.83-3.14-.83zM12 10.5V3m0 7.5a7.5 7.5 0 017.5 7.5" />
    </svg>
);


const ColorSwatchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
);

const PhotographIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 12l-2 2 2.828 2.828a1 1 0 010 1.414L5 21m14-14l-2.293 2.293a1 1 0 000 1.414L14 12l2 2-2.828 2.828a1 1 0 000 1.414L19 21" />
    </svg>
);

const ChatAlt2Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V10a2 2 0 012-2h8z" />
    </svg>
);

export const PROCESSING_OPTIONS: ProcessingOption[] = [
  {
    id: 'artistic',
    name: 'Artistic Style',
    description: 'Transform the image into a specific art style.',
    prompt: 'Transform this image into a beautiful oil painting in the style of impressionism.',
    icon: <PaintBrushIcon />
  },
  {
    id: 'magical_enhance',
    name: 'Magical Enhance',
    description: 'Subtly improve lighting, color, and details.',
    prompt: 'Subtly enhance this image with better lighting, more vibrant colors, and sharper details, making it look magical and professional.',
    icon: <WandIcon />
  },
  {
    id: 'colorize',
    name: 'Colorize',
    description: 'Add realistic color to black and white photos.',
    prompt: 'Colorize this black and white photograph with realistic and historically appropriate colors.',
    icon: <ColorSwatchIcon />
  },
  {
    id: 'change_background',
    name: 'Change Background',
    description: 'Replace the background with a new scene.',
    prompt: 'Keep the main subject of the image, but change the background to a beautiful, serene tropical beach at sunset.',
    icon: <PhotographIcon />
  },
  {
    id: 'add_element',
    name: 'Add an Element',
    description: 'Introduce a new object into the scene.',
    prompt: 'Add a small, fluffy white cat sitting on the main surface in this image, making it look natural.',
    icon: <SparklesIcon />
  },
  {
    id: 'custom',
    name: 'Custom Prompt',
    description: 'Describe the exact change you want to make.',
    prompt: '',
    icon: <ChatAlt2Icon />,
  },
];
