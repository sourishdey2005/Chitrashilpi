
import React from 'react';

interface ImageWorkspaceProps {
  originalImageUrl: string | null;
  processedImageUrl: string | null;
  error: string | null;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const ImagePlaceholder: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="w-full h-full bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-lg flex flex-col justify-center items-center text-center p-4">
    <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
    <p className="text-sm text-gray-500">{subtitle}</p>
  </div>
);

export const ImageWorkspace: React.FC<ImageWorkspaceProps> = ({ originalImageUrl, processedImageUrl, error }) => {
  const handleDownload = () => {
    if (!processedImageUrl) return;
    const link = document.createElement('a');
    link.href = processedImageUrl;
    link.download = `chitrashilpi_creation_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 md:p-6 h-full flex flex-col border border-gray-700/50">
        {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-md mb-4" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
            <div className="flex flex-col">
                <h2 className="text-lg font-bold text-center mb-2 text-gray-400">Original</h2>
                <div className="aspect-square flex-grow">
                    {originalImageUrl ? (
                        <img src={originalImageUrl} alt="Original" className="w-full h-full object-contain rounded-md" />
                    ) : (
                        <ImagePlaceholder title="Upload an Image" subtitle="Your original picture will appear here." />
                    )}
                </div>
            </div>
            <div className="flex flex-col">
                <h2 className="text-lg font-bold text-center mb-2 text-amber-400">Chitrashilpi's Creation</h2>
                <div className="aspect-square flex-grow relative">
                    {processedImageUrl ? (
                        <>
                            <img src={processedImageUrl} alt="Processed" className="w-full h-full object-contain rounded-md" />
                            <button
                                onClick={handleDownload}
                                className="absolute bottom-4 right-4 bg-gray-900/80 hover:bg-amber-500 hover:text-black text-white font-bold py-2 px-4 rounded-lg transition-all backdrop-blur-sm flex items-center"
                            >
                                <DownloadIcon />
                                Download
                            </button>
                        </>
                    ) : (
                        <ImagePlaceholder title="Your Creation" subtitle="The AI-processed image will appear here." />
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};
