import { memo } from 'react';
import { cn } from '@/lib/utils';

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton = memo(({ active, onClick, children }: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 text-xs font-light tracking-wider transition-colors duration-200',
        active
          ? 'text-red border-b border-red'
          : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {children}
    </button>
  );
});

FilterButton.displayName = 'FilterButton';

export default FilterButton;
