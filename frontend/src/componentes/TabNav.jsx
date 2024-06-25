import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';

export function TabNav() {
  const [activeTab, setActiveTab] = useState('account');

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={handleTabChange}
      className="flex flex-col w-full"
    >
      <Tabs.List className="flex bg-gray-800 p-2 rounded-t-md">
        <Tabs.Trigger
          value="account"
          className={`px-4 py-2 text-white rounded-md ${
            activeTab === 'account' ? 'bg-green-700' : 'bg-gray-600'
          }`}
        >
          Account
        </Tabs.Trigger>
        <Tabs.Trigger
          value="documents"
          className={`ml-2 px-4 py-2 text-white rounded-md ${
            activeTab === 'documents' ? 'bg-green-700' : 'bg-gray-600'
          }`}
        >
          Documents
        </Tabs.Trigger>
        <Tabs.Trigger
          value="settings"
          className={`ml-2 px-4 py-2 text-white rounded-md ${
            activeTab === 'settings' ? 'bg-green-700' : 'bg-gray-600'
          }`}
        >
          Settings
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account" className="p-4 bg-gray-700 rounded-b-md">
        Account content goes here.
      </Tabs.Content>
      <Tabs.Content value="documents" className="p-4 bg-gray-700 rounded-b-md">
        Documents content goes here.
      </Tabs.Content>
      <Tabs.Content value="settings" className="p-4 bg-gray-700 rounded-b-md">
        Settings content goes here.
      </Tabs.Content>
    </Tabs.Root>
  );
}
