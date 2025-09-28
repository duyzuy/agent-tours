"use client";

import React, { useState } from "react";
import { createCache, extractStyle, StyleProvider, legacyLogicalPropertiesTransformer } from "@ant-design/cssinjs";
import type Entity from "@ant-design/cssinjs/es/Cache";
import { useServerInsertedHTML } from "next/navigation";

const AntStyleProvider = ({ children }: React.PropsWithChildren) => {
  const cache = React.useMemo<Entity>(() => createCache(), []);
  const isServerInserted = React.useRef<boolean>(false);

  useServerInsertedHTML(() => {
    if (isServerInserted.current) {
      return;
    }
    isServerInserted.current = true;

    return <style id="travel" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />;
  });
  return (
    <StyleProvider cache={cache} hashPriority="high" transformers={[legacyLogicalPropertiesTransformer]}>
      {children}
    </StyleProvider>
  );
};

export default AntStyleProvider;
