
import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { LogisticsProvider } from '@shared/schema';

interface ShipmentSelectionProps {
  provider: LogisticsProvider;
}

export default function ShipmentSelection({ provider }: ShipmentSelectionProps) {
  const [, setLocation] = useLocation();
  const token = localStorage.getItem('token');

  const handleSelect = () => {
    if (!token) {
      setLocation('/signin?redirect=/shipment');
      return;
    }
    
    // Create shipment
    fetch('/api/shipments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        providerId: provider.id,
        status: 'pending'
      })
    })
    .then(res => res.json())
    .then(() => {
      setLocation('/shipment');
    })
    .catch(err => {
      console.error('Error creating shipment:', err);
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <Button 
          onClick={handleSelect}
          className="w-full"
        >
          Select {provider.name}
        </Button>
      </CardContent>
    </Card>
  );
}
