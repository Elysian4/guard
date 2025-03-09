import { Shield, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';

interface SafetyStatusProps {
  status: 'safe' | 'at-risk';
}

export default function SafetyStatus({ status }: SafetyStatusProps) {
  return (
    <div className={cn(
      'rounded-lg p-4 flex items-center gap-3',
      status === 'safe' ? 'bg-green-50' : 'bg-red-50'
    )}>
      {status === 'safe' ? (
        <Shield className="h-6 w-6 text-green-600" />
      ) : (
        <ShieldAlert className="h-6 w-6 text-red-600" />
      )}
      <div>
        <h3 className={cn(
          'font-semibold',
          status === 'safe' ? 'text-green-800' : 'text-red-800'
        )}>
          Status: {status === 'safe' ? 'Safe' : 'At Risk'}
        </h3>
        <p className={cn(
          'text-sm',
          status === 'safe' ? 'text-green-600' : 'text-red-600'
        )}>
          {status === 'safe' 
            ? 'All systems normal. No threats detected.'
            : 'Warning: Potential safety risk detected.'}
        </p>
      </div>
    </div>
  );
}