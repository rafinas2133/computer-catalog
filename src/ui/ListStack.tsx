'use client';

import { useState } from 'react';

export function ListStack({ items }: { items: string[] | null | undefined }) {
  const [showFull, setShowFull] = useState(false);

  const isEmpty = !items || items.length === 0;
  const fullList = items ?? [];
  const flatList = fullList.join(', ');
  const clippedText = flatList.length > 10 ? flatList.slice(0, 10) + '...' : flatList || 'N/A';

  return (
    <div
      className="relative group cursor-default z-50"
      onMouseEnter={() => setShowFull(true)}
      onMouseLeave={() => setShowFull(false)}
    >
      <div className="h-6 w-max rounded bg-gray-100 text-center px-2 text-sm">
        {clippedText}
      </div>
      {showFull && !isEmpty && (
        <div className="absolute z-10 mt-1 w-max max-w-xs rounded bg-white p-2 text-sm shadow-md border border-gray-300 whitespace-pre-wrap">
          <ul className="list-disc list-inside">
            {fullList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
