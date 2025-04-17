
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Shipment() {
  const [, setLocation] = useLocation();
  const token = localStorage.getItem('token');
  const [shipment, setShipment] = useState(null);

  useEffect(() => {
    if (!token) {
      setLocation('/signin');
      return;
    }

    // Fetch shipment details
    fetch('/api/shipments/latest', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(setShipment)
    .catch(console.error);
  }, []);

  if (!shipment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Shipment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Status: {shipment.status}</p>
            {/* Add more shipment details here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
