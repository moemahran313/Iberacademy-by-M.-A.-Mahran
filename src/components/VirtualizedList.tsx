import React from 'react';
import * as ReactWindow from 'react-window';

interface VirtualizedListProps {
  height: number;
  itemCount: number;
  itemSize: number;
  width?: string | number;
  className?: string;
  children: (props: { index: number; style: React.CSSProperties }) => React.ReactNode;
}

// Safely extract FixedSizeList across Vite dev mode CJS interop and Rollup prod build
const FixedSizeList =
  (ReactWindow as any).FixedSizeList ||
  (ReactWindow as any).default?.FixedSizeList ||
  (ReactWindow as any).default;

export const VirtualizedList: React.FC<VirtualizedListProps> = ({
  height,
  itemCount,
  itemSize,
  width = '100%',
  className = 'no-scrollbar',
  children
}) => {
  if (typeof FixedSizeList === 'function' || typeof FixedSizeList === 'object') {
    const Component = FixedSizeList;
    return (
      <Component
        height={height}
        itemCount={itemCount}
        itemSize={itemSize}
        width={width}
        className={className}
      >
        {children}
      </Component>
    );
  }

  // Fallback non-virtualized view if react-window fails runtime interop in browser
  return (
    <div style={{ maxHeight: height, overflowY: 'auto' }} className={className}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index}>
          {children({ index, style: { height: itemSize } })}
        </div>
      ))}
    </div>
  );
};
