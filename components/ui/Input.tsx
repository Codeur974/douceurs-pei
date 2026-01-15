import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ className, label, error, ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block font-semibold text-sm">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}
