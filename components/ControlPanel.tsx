
import React from 'react';
import type { ProcessingOption } from '../types';
import { PROCESSING_OPTIONS } from '../constants';

interface ControlPanelProps {
  onImageUpload: (file: File) => void;
  onProcessImage: () => void;
  onReset: () => void;
  isProcessing: boolean;
  hasImage: boolean;
  activeTool: ProcessingOption | null;
  setActiveTool: (tool: ProcessingOption) => void;
  customPrompt: string;
  setCustomPrompt: (prompt: string) => void;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const ResetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l16 16" />
    </svg>
);


export const ControlPanel: React.FC<ControlPanelProps> = ({
  onImageUpload,
  onProcessImage,
  onReset,
  isProcessing,
  hasImage,
  activeTool,
  setActiveTool,
  customPrompt,
  setCustomPrompt
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageUpload(event.target.files[0]);
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 space-y-6 h-full flex flex-col border border-gray-700/50">
      <div>
        <h2 className="text-xl font-bold text-amber-400 mb-2">1. Upload Image</h2>
        <label htmlFor="file-upload" className="w-full cursor-pointer bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-2 px-4 rounded-md inline-flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <UploadIcon />
            {hasImage ? 'Upload Another' : 'Choose an Image'}
        </label>
        <input id="file-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} disabled={isProcessing} />
        {hasImage && <button onClick={onReset} disabled={isProcessing} className="mt-2 w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/50 rounded-md transition-colors disabled:opacity-50">
            <ResetIcon />
            Start Over
        </button>}
      </div>

      <div className="flex-grow">
        <h2 className="text-xl font-bold text-amber-400 mb-4">2. Choose a Tool</h2>
        <div className="space-y-2">
          {PROCESSING_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveTool(option)}
              disabled={isProcessing}
              className={`w-full text-left p-3 rounded-md transition-all duration-200 flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed ${
                activeTool?.id === option.id
                  ? 'bg-amber-500/20 text-amber-300 ring-2 ring-amber-500'
                  : 'bg-gray-700/50 hover:bg-gray-700'
              }`}
            >
              <span className={activeTool?.id === option.id ? 'text-amber-400' : 'text-gray-400'}>{option.icon}</span>
              <div>
                <p className="font-semibold">{option.name}</p>
                <p className="text-xs text-gray-400">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {activeTool?.id === 'custom' && (
        <div className="mt-4">
            <h3 className="text-lg font-bold text-amber-400 mb-2">Custom Instructions</h3>
            <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g., 'Add a spaceship in the sky'"
                className="w-full h-24 p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none transition-shadow"
                disabled={isProcessing}
            />
        </div>
      )}

      <div>
        <button
          onClick={onProcessImage}
          disabled={!hasImage || isProcessing}
          className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed text-lg"
        >
          {isProcessing ? 'Creating...' : "Apply Chitra"}
        </button>
      </div>
    </div>
  );
};
