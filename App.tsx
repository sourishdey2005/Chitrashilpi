import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ControlPanel } from './components/ControlPanel';
import { ImageWorkspace } from './components/ImageWorkspace';
import { Loader } from './components/Loader';
import { processImageWithGemini } from './services/geminiService';
import type { ImageFile, ProcessingOption } from './types';
import { PROCESSING_OPTIONS } from './constants';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<ProcessingOption | null>(PROCESSING_OPTIONS[0]);
  const [customPrompt, setCustomPrompt] = useState<string>('');

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage({
        file,
        base64: reader.result as string,
      });
      setProcessedImageUrl(null);
      setError(null);
    };
    reader.onerror = () => {
      setError('Failed to read the image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleProcessing = useCallback(async () => {
    if (!originalImage || !activeTool) {
      setError('Please upload an image and select a tool first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setProcessedImageUrl(null);

    try {
      let prompt = activeTool.prompt;
      if (activeTool.id === 'custom' && customPrompt) {
          prompt = customPrompt;
      } else if (activeTool.id === 'custom' && !customPrompt) {
          setError('Please enter a custom prompt.');
          setIsLoading(false);
          return;
      }

      // FIX: Handle the object returned from `processImageWithGemini` to construct a data URL with the correct mimeType.
      const result = await processImageWithGemini(originalImage.base64, prompt);
      if (result) {
        setProcessedImageUrl(`data:${result.mimeType};base64,${result.data}`);
      } else {
        throw new Error('The model did not return an image. Please try a different prompt.');
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Processing failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, activeTool, customPrompt]);

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImageUrl(null);
    setError(null);
    setIsLoading(false);
    setCustomPrompt('');
    setActiveTool(PROCESSING_OPTIONS[0]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 selection:bg-amber-500 selection:text-black">
      {isLoading && <Loader message="Chitrashilpi is creating..." />}
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          <div className="lg:col-span-4 xl:col-span-3">
            <ControlPanel
              onImageUpload={handleImageUpload}
              onProcessImage={handleProcessing}
              onReset={handleReset}
              isProcessing={isLoading}
              hasImage={!!originalImage}
              activeTool={activeTool}
              setActiveTool={setActiveTool}
              customPrompt={customPrompt}
              setCustomPrompt={setCustomPrompt}
            />
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            <ImageWorkspace
              originalImageUrl={originalImage?.base64 || null}
              processedImageUrl={processedImageUrl}
              error={error}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
