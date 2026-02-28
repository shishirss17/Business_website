"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, Package, Rocket, Smile } from 'lucide-react';

const steps = [
  { name: 'Order Confirmed', icon: Check },
  { name: 'Packed', icon: Package },
  { name: 'Shipped', icon: Rocket },
  { name: 'Delivered', icon: Smile },
];

export function OrderTracker() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Simulate order progress
    const timers = [
      setTimeout(() => setCurrentStep(1), 2000), // Confirmed -> Packed in 2s
      setTimeout(() => setCurrentStep(2), 5000), // Packed -> Shipped in 3s more
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex justify-between items-center">
        <div className="absolute left-0 top-1/2 w-full h-1 bg-secondary -translate-y-1/2">
           <div
            className="absolute left-0 top-0 h-full bg-primary transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
        
        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          return (
            <div key={step.name} className="relative z-10 flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500',
                  isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                )}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <p className={cn(
                'mt-2 text-xs md:text-sm font-semibold text-center',
                 isActive ? 'text-foreground' : 'text-muted-foreground'
                )}>
                {step.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
