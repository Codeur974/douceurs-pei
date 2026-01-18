import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export function Select({ className, label, error, options, placeholder, ...props }: SelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block font-semibold text-sm">
          {label}
        </label>
      )}
      <select
        className={cn(
          'w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary',
          error && 'border-red-500',
          className
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}
