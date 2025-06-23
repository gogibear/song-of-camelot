import React from 'react';
import { useConnect } from '@starknet-react/core';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function LoginView() {
  const { connect, connectors } = useConnect();

  const handleLogin = () => {
    // Connect with the first available connector, which will be the Cartridge Controller
    if (connectors.length > 0) {
      connect({ connector: connectors[0] });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Song of Camelot</CardTitle>
          <CardDescription>Enter the world and shape its destiny.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleLogin} className="w-full">
            Begin Quest
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 