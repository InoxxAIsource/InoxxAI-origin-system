import React from 'react';
import { useAtom } from 'jotai';
import { Preview } from './components/Preview';
import { componentStateAtom, activeComponentAtom } from './lib/store';

function App() {
  const [components] = useAtom(componentStateAtom);
  const [activeId] = useAtom(activeComponentAtom);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Code Editor</h2>
            {activeId && (
              <pre className="bg-gray-100 p-4 rounded">
                {components.find(c => c.id === activeId)?.code}
              </pre>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Live Preview</h2>
            <div className="h-[600px]">
              <Preview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}