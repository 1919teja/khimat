import { useState } from 'react';
import { City, ShipmentFormData } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Hardcoded cities for autocomplete
const cities: City[] = [
  { name: "Mumbai", state: "Maharashtra" },
  { name: "Delhi", state: "Delhi" },
  { name: "Bangalore", state: "Karnataka" },
  { name: "Hyderabad", state: "Telangana" },
  { name: "Chennai", state: "Tamil Nadu" },
  { name: "Kolkata", state: "West Bengal" },
  { name: "Pune", state: "Maharashtra" },
  { name: "Ahmedabad", state: "Gujarat" },
  { name: "Jaipur", state: "Rajasthan" },
  { name: "Surat", state: "Gujarat" },
  { name: "Lucknow", state: "Uttar Pradesh" },
  { name: "Kanpur", state: "Uttar Pradesh" },
  { name: "Nagpur", state: "Maharashtra" },
  { name: "Indore", state: "Madhya Pradesh" },
  { name: "Thane", state: "Maharashtra" }
];

interface ShipmentFormProps {
  onCompare: (formData: ShipmentFormData) => void;
}

export default function ShipmentForm({ onCompare }: ShipmentFormProps) {
  const [origin, setOrigin] = useState('');
  const [originSuggestions, setOriginSuggestions] = useState<City[]>([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  
  const [destination, setDestination] = useState('');
  const [destinationSuggestions, setDestinationSuggestions] = useState<City[]>([]);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  
  const [serviceType, setServiceType] = useState('all');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  
  const [showDimensions, setShowDimensions] = useState(false);
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [dimensionUnit, setDimensionUnit] = useState('cm');

  const handleOriginChange = (value: string) => {
    setOrigin(value);
    if (value.length > 1) {
      const filtered = cities.filter(city => 
        city.name.toLowerCase().includes(value.toLowerCase()) || 
        city.state.toLowerCase().includes(value.toLowerCase())
      );
      setOriginSuggestions(filtered.slice(0, 5));
      setShowOriginSuggestions(true);
    } else {
      setShowOriginSuggestions(false);
    }
  };

  const handleDestinationChange = (value: string) => {
    setDestination(value);
    if (value.length > 1) {
      const filtered = cities.filter(city => 
        city.name.toLowerCase().includes(value.toLowerCase()) || 
        city.state.toLowerCase().includes(value.toLowerCase())
      );
      setDestinationSuggestions(filtered.slice(0, 5));
      setShowDestinationSuggestions(true);
    } else {
      setShowDestinationSuggestions(false);
    }
  };

  const handleCompare = () => {
    // Basic validation
    if (!origin) {
      alert('Please enter an origin');
      return;
    }
    if (!destination) {
      alert('Please enter a destination');
      return;
    }
    if (!weight || isNaN(Number(weight)) || Number(weight) <= 0) {
      alert('Please enter a valid weight');
      return;
    }

    const formData: ShipmentFormData = {
      origin,
      destination,
      serviceType,
      weight: Number(weight),
      weightUnit,
      dimensions: showDimensions ? {
        length: Number(length) || 0,
        width: Number(width) || 0,
        height: Number(height) || 0,
        unit: dimensionUnit
      } : null
    };

    onCompare(formData);
  };

  const toggleDimensions = () => {
    setShowDimensions(!showDimensions);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8" id="shipment-form">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipment Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Origin & Destination Fields */}
        <div className="space-y-4">
          <div>
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
            <div className="input-container relative">
              <Input 
                type="text" 
                id="origin" 
                placeholder="City or PIN Code" 
                value={origin}
                onChange={(e) => handleOriginChange(e.target.value)}
                onFocus={() => origin.length > 1 && setShowOriginSuggestions(true)}
                onBlur={() => setTimeout(() => setShowOriginSuggestions(false), 200)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {showOriginSuggestions && originSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
                  <ul className="py-1 text-sm text-gray-700">
                    {originSuggestions.map((city, index) => (
                      <li 
                        key={index} 
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setOrigin(`${city.name}, ${city.state}`);
                          setShowOriginSuggestions(false);
                        }}
                      >
                        {city.name}, {city.state}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <div className="input-container relative">
              <Input 
                type="text" 
                id="destination" 
                placeholder="City or PIN Code" 
                value={destination}
                onChange={(e) => handleDestinationChange(e.target.value)}
                onFocus={() => destination.length > 1 && setShowDestinationSuggestions(true)}
                onBlur={() => setTimeout(() => setShowDestinationSuggestions(false), 200)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {showDestinationSuggestions && destinationSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
                  <ul className="py-1 text-sm text-gray-700">
                    {destinationSuggestions.map((city, index) => (
                      <li 
                        key={index} 
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setDestination(`${city.name}, ${city.state}`);
                          setShowDestinationSuggestions(false);
                        }}
                      >
                        {city.name}, {city.state}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="service_type" className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
            <div className="input-container">
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="express">Express</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Weight & Dimensions Fields */}
        <div className="space-y-4">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Package Weight</label>
            <div className="flex space-x-2">
              <div className="input-container flex-grow">
                <Input 
                  type="number" 
                  id="weight" 
                  placeholder="Enter weight" 
                  min="0.1" 
                  step="0.1" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="input-container">
                <Select value={weightUnit} onValueChange={setWeightUnit}>
                  <SelectTrigger className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="g">g</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Package Dimensions</label>
              <button 
                type="button" 
                className="text-xs text-primary flex items-center"
                onClick={toggleDimensions}
              >
                <span>{showDimensions ? '- Hide dimensions' : '+ Add dimensions'}</span>
              </button>
            </div>
            
            {showDimensions && (
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div className="input-container">
                    <Input 
                      type="number" 
                      id="length" 
                      placeholder="Length" 
                      min="1" 
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="input-container">
                    <Input 
                      type="number" 
                      id="width" 
                      placeholder="Width" 
                      min="1" 
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="input-container">
                    <Input 
                      type="number" 
                      id="height" 
                      placeholder="Height" 
                      min="1" 
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Select value={dimensionUnit} onValueChange={setDimensionUnit}>
                    <SelectTrigger className="text-sm px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="in">inches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <div>
            <Button 
              onClick={handleCompare}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-4 rounded-lg transition duration-150 ease-in-out flex items-center justify-center"
            >
              <i className="fas fa-search mr-2"></i>
              Compare Shipping Options
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
