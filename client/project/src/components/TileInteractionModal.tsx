import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useDojo, usePlayer, useTiles } from '@/hooks/useDojo';
import { getDominantElement, ELEMENT_COLORS, getTileInfluenceScores, getPlayerTokenBalance, getPlayerElements } from '@/utils/gameUtils';
import type { Element } from '@/types/game';

interface TileInteractionModalProps {
  tileId: number;
  onClose: () => void;
}

export function TileInteractionModal({ tileId, onClose }: TileInteractionModalProps) {
  const [selectedElement, setSelectedElement] = useState<Element | ''>('');
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const { account, systemCalls } = useDojo();
  const player = usePlayer();
  const tiles = useTiles();

  const tile = tiles.find(t => t.tile_id === tileId);
  const dominantElement = tile ? getDominantElement(tile) : 'Fire';
  const tileInfluences = tile ? getTileInfluenceScores(tile) : {};
  const playerElements = player ? getPlayerElements(player) : [];

  const handleFortify = async () => {
    if (!selectedElement || !amount || !player) {
      setError('Please select an element and enter an amount');
      return;
    }

    const numAmount = parseInt(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    const availableBalance = getPlayerTokenBalance(player, selectedElement as Element);
    if (numAmount > availableBalance) {
      setError('Insufficient tokens');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await systemCalls.fortify({
        signer: account,
        tile_id: tileId,
        element: selectedElement as Element,
        amount: numAmount
      });
      onClose();
    } catch (error) {
      console.error('Fortify failed:', error);
      setError('Failed to fortify. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!player || !tile) {
    return null;
  }

  return (
    <Dialog open={true} onOpenChange={() => !isLoading && onClose()}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Fortify Tile {tileId}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Tile Info */}
          <div className="p-4 rounded-lg bg-slate-800/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Current Dominant Element:</span>
              <div className={`px-3 py-1 rounded text-white font-medium ${ELEMENT_COLORS[dominantElement]}`}>
                {dominantElement}
              </div>
            </div>
            <div className="text-sm text-slate-400">
              Influence: {tileInfluences[dominantElement]}
            </div>
            
            {/* Show all influences */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              {Object.entries(tileInfluences).map(([element, influence]) => (
                <div key={element} className="flex justify-between">
                  <span className="text-slate-400">{element}:</span>
                  <span className="text-white">{influence}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fortify Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="element" className="text-slate-300">
                Select Element
              </Label>
              <Select value={selectedElement} onValueChange={setSelectedElement}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue placeholder="Choose your element" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {playerElements.map((element) => {
                    const balance = getPlayerTokenBalance(player, element);
                    return (
                      <SelectItem key={element} value={element} className="text-white">
                        <div className="flex items-center justify-between w-full">
                          <span>{element}</span>
                          <span className="ml-2 text-slate-400">
                            ({balance} available)
                          </span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount" className="text-slate-300">
                Amount to Spend
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                min="1"
                max={selectedElement ? getPlayerTokenBalance(player, selectedElement as Element) : undefined}
                className="bg-slate-800 border-slate-600 text-white"
              />
              {selectedElement && (
                <div className="text-sm text-slate-400 mt-1">
                  Available: {getPlayerTokenBalance(player, selectedElement as Element)} tokens
                </div>
              )}
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-900/20 p-2 rounded">
                {error}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleFortify}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              disabled={isLoading || !selectedElement || !amount}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Fortifying...
                </>
              ) : (
                'Fortify'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}