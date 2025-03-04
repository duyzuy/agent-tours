"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center">
      <div className="px-3 py-2">
        <h2>Co loi xay ra</h2>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Vui long thu lai
        </button>
      </div>
    </div>
  );
}
