import React from 'react';
import { useAtom } from 'jotai';
import Editor from '@monaco-editor/react';
import { Preview } from './components/Preview';
import { componentStateAtom, activeComponentAtom, createComponent } from './lib/store';

function App() {
  const [components, setComponents] = useAtom(componentStateAtom);
  const [activeId, setActiveId] = useAtom(activeComponentAtom);

  const activeComponent = components.find(c => c.id === activeId);

  const handleCodeChange = (value: string | undefined) => {
    if (!activeId || !value) return;
    
    setComponents(prev => prev.map(comp => 
      comp.id === activeId 
        ? { ...comp, code: value, preview: value } 
        : comp
    ));
  };

  const createNewComponent = () => {
    const component = createComponent(
      'New Component',
      '<div>Hello World</div>',
      '<div>Hello World</div>'
    );
    setComponents(prev => [...prev, component]);
    setActiveId(component.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">AI Builder</h1>
          <button
            onClick={createNewComponent}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            New Component
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Code Editor</h2>
            </div>
            <div className="h-[600px]">
              {activeComponent ? (
                <Editor
                  height="100%"
                  defaultLanguage="html"
                  value={activeComponent.code}
                  onChange={handleCodeChange}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                  }}
                  loading={<div className="h-full flex items-center justify-center">Loading editor...</div>}
                  beforeMount={(monaco) => {
                    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
                  }}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Select or create a component to edit
                </div>
              )}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Live Preview</h2>
            </div>
            <div className="h-[600px]">
              <Preview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;