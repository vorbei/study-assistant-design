import React, { useEffect, useRef, useState } from 'react';

interface MasonryProps {
  columns?: number;
  gap?: number;
  children: React.ReactNode[];
}

export const Masonry: React.FC<MasonryProps> = ({ 
  columns = 3, 
  gap = 16, 
  children 
}) => {
  const [columnHeights, setColumnHeights] = useState<number[]>(new Array(columns).fill(0));
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const getShortestColumn = () => {
    return columnHeights.indexOf(Math.min(...columnHeights));
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Reset heights
    setColumnHeights(new Array(columns).fill(0));
    
    // Create column arrays
    const columnItems: React.ReactNode[][] = Array.from({ length: columns }, () => []);
    
    // Distribute items to columns
    children.forEach((child, index) => {
      const shortestColumn = getShortestColumn();
      columnItems[shortestColumn].push(
        <div
          key={index}
          ref={el => itemsRef.current[index] = el}
          style={{ marginBottom: gap }}
        >
          {child}
        </div>
      );
      
      // Update column height
      if (itemsRef.current[index]) {
        const height = itemsRef.current[index]?.offsetHeight || 0;
        columnHeights[shortestColumn] += height + gap;
        setColumnHeights([...columnHeights]);
      }
    });

    // Force a reflow to ensure all items are measured
    containerRef.current.style.height = Math.max(...columnHeights) + 'px';
  }, [children, columns, gap]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: Math.max(...columnHeights),
      }}
    >
      {Array.from({ length: columns }, (_, columnIndex) => (
        <div
          key={columnIndex}
          style={{
            position: 'absolute',
            top: 0,
            left: `${(columnIndex * (100 / columns))}%`,
            width: `${100 / columns}%`,
            paddingLeft: columnIndex === 0 ? 0 : gap / 2,
            paddingRight: columnIndex === columns - 1 ? 0 : gap / 2,
          }}
        >
          {children.filter((_, index) => index % columns === columnIndex)}
        </div>
      ))}
    </div>
  );
};
