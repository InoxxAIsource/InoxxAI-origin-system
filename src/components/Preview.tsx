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

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; padding: 1rem; }
            * { box-sizing: border-box; }
          </style>
        </head>
        <body>
          <div id="root">${activeComponent.preview}</div>
          <script>
            const root = document.getElementById('root');
            if (root) {
              root.addEventListener('click', (e) => {
                e.preventDefault();
                window.parent.postMessage({ type: 'elementClick', path: e.target.id }, '*');
              });
            }
          </script>
        </body>
      </html>
    `;

    doc.open();
    doc.write(htmlContent);
    doc.close();
  }, [activeComponent]);

  return (
    <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden relative">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Component Preview"
        sandbox="allow-scripts allow-same-origin"
      />
      {!activeComponent && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          Select or create a component to preview
        </div>
      )}
    </div>
  );
}