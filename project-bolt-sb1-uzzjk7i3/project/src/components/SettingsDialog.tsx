import React from 'react';
import { X, User, Info, Settings as SettingsIcon } from 'lucide-react';

interface SettingsDialogProps {
  onClose: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ onClose }) => {
  return (
    <dialog id="settings-dialog" className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-0 w-full max-w-lg mx-auto">
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <SettingsIcon className="h-5 w-5 mr-2" />
          Settings
        </h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Profile</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="ml-3 text-gray-700 dark:text-gray-300">Account Settings</span>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm">
                  Manage
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <Info className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="ml-3 text-gray-700 dark:text-gray-300">About TaskMaster</span>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm">
                  View
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Preferences</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-gray-700 dark:text-gray-300">Default View</label>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1">
                  <option value="all">All Items</option>
                  <option value="tasks">Tasks</option>
                  <option value="projects">Projects</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-gray-700 dark:text-gray-300">Sort Items By</label>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1">
                  <option value="priority">Priority</option>
                  <option value="dueDate">Due Date</option>
                  <option value="created">Created Date</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-gray-700 dark:text-gray-300">Show Completed Items</label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input type="checkbox" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white dark:bg-gray-300 border-4 appearance-none cursor-pointer" />
                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer"></label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Version 1.0.0
        </div>
      </div>
    </dialog>
  );
};

export default SettingsDialog;