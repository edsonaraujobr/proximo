import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';

export function TabNav({itens, contents}) {
  const [activeTab, setActiveTab] = useState(itens[0]);

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={handleTabChange}
      className="flex flex-col w-full"
    >
      <Tabs.List className="flex bg-gray-900 justify-start items-center gap-1 rounded-t-md">
        {itens.map((item) => (
          <Tabs.Trigger
            key={item}
            value={item}
            className={` text-white text-sm p-2 ${
              activeTab === item? 'bg-slate-600' : 'bg-gray-900'
            }`}
          >
           {item}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content value={itens[0]} className="p-4 bg-gray-700 rounded-b-md h-full">
        Account content goes here.
      </Tabs.Content>

      <Tabs.Content value="documents" className="p-4 bg-gray-700 rounded-b-md h-full">
        Documents content goes here.
      </Tabs.Content>



    </Tabs.Root>
  );
}
