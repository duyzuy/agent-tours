"use client"; // Error boundaries must be Client Components

import { Button } from "antd";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-3">Có lỗi xảy ra</h2>

        <p className="text-gray-600 mb-6">{error.message}</p>
        <div>{error.stack}</div>
        <Button type="primary" onClick={reset} className="w-[120px]">
          Thử lại
        </Button>
      </div>
    </div>
  );
}
