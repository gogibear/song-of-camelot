import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useDojo } from '@/hooks/useDojo';
import { ELEMENTS, ELEMENT_COLORS, ELEMENT_HOVER_COLORS } from '@/utils/gameUtils';
import type { Element } from '@/types/game';

interface OnboardingViewProps {
  onPlayerCreated: () => void;
}

export function OnboardingView({ onPlayerCreated }: OnboardingViewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const { account, systemCalls } = useDojo();

  const handleElementSelect = async (element: Element) => {
    if (isLoading) return;
    
    setSelectedElement(element);
    setIsLoading(true);
    
    try {
      await systemCalls.spawn({ signer: account, primary_element: element });
      onPlayerCreated();
    } catch (error) {
      console.error('Failed to spawn player:', error);
    } finally {
      setIsLoading(false);
      setSelectedElement(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-8 bg-black/40 backdrop-blur-sm border-purple-500/20">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Song of Camelot
          </h1>
          <p className="text-2xl text-slate-300 mb-2">Choose Your Allegiance</p>
          <p className="text-slate-400">Select your primary element to begin your journey</p>
        </div>
        
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {ELEMENTS.map((element) => (
            <Button
              key={element}
              onClick={() => handleElementSelect(element)}
              disabled={isLoading}
              className={`
                h-24 text-lg font-semibold transition-all duration-300 transform
                ${ELEMENT_COLORS[element]} ${ELEMENT_HOVER_COLORS[element]}
                hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                ${selectedElement === element ? 'ring-4 ring-white/50 scale-105' : ''}
                ${isLoading && selectedElement !== element ? 'opacity-30' : ''}
              `}
              variant="secondary"
            >
              {isLoading && selectedElement === element ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Creating...</span>
                </div>
              ) : (
                element
              )}
            </Button>
          ))}
        </div>
        
        {isLoading && (
          <div className="text-center mt-8">
            <p className="text-slate-300">Forging your destiny...</p>
          </div>
        )}
      </Card>
    </div>
  );
}