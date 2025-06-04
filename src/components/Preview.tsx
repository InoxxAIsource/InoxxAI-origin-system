import React, { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { componentStateAtom, activeComponentAtom } from '../lib/store';

export function Preview() {
  const [components] = useAtom(componentStateAtom);
  const [activeId] = useAtom(activeComponentAtom);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeComponent = components.find(c => c.id === activeId);

  useEffect(() => {
    if (!activeComponent || !iframeRef.current) return;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; }
          </style>
        </head>
        <body>
          ${activeComponent.preview}
        </body>
      </html>
    `);
    doc.close();
  }, [activeComponent]);

  return (
    <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Component Preview"
        sandbox="allow-scripts"
      />
    </div>
  );
}