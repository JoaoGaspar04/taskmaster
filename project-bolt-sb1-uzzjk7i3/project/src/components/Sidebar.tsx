import React from 'react';
import { 
  CheckSquare, 
  Lightbulb, 
  FolderKanban, 
  FileText, 
  Tag, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { getCategories } from '../utils/storage';
import { Category } from '../types';

interface SidebarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeCategory, 
  setActiveCategory, 
  isCollapsed,
  setIsCollapsed,
  isDarkMode
}) => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  
  React.useEffect(() => {
    setCategories(getCategories());
  }, []);

  return (
    <aside className={`bg-white dark:bg-gray-800 shadow-lg fixed inset-y-0 left-0 z-20 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        <div className={`px-4 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
              <CheckSquare className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
              TaskMaster
            </h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
        
        <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
          {!isCollapsed && (
            <div className="px-4 mb-3">
              <h2 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Types</h2>
            </div>
          )}
          <ul>
            <li>
              <button
                className={`flex items-center ${isCollapsed ? 'px-4' : 'px-6'} py-2 w-full text-left ${
                  activeCategory === 'all' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory('all')}
                title={isCollapsed ? "All Items" : undefined}
              >
                <CheckSquare className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && <span>All Items</span>}
              </button>
            </li>
            <li>
              <button
                className={`flex items-center ${isCollapsed ? 'px-4' : 'px-6'} py-2 w-full text-left ${
                  activeCategory === 'task' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory('task')}
                title={isCollapsed ? "Tasks" : undefined}
              >
                <CheckSquare className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && <span>Tasks</span>}
              </button>
            </li>
            <li>
              <button
                className={`flex items-center ${isCollapsed ? 'px-4' : 'px-6'} py-2 w-full text-left ${
                  activeCategory === 'idea' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory('idea')}
                title={isCollapsed ? "Ideas" : undefined}
              >
                <Lightbulb className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && <span>Ideas</span>}
              </button>
            </li>
            <li>
              <button
                className={`flex items-center ${isCollapsed ? 'px-4' : 'px-6'} py-2 w-full text-left ${
                  activeCategory === 'project' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory('project')}
                title={isCollapsed ? "Projects" : undefined}
              >
                <FolderKanban className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && <span>Projects</span>}
              </button>
            </li>
            <li>
              <button
                className={`flex items-center ${isCollapsed ? 'px-4' : 'px-6'} py-2 w-full text-left ${
                  activeCategory === 'note' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory('note')}
                title={isCollapsed ? "Notes" : undefined}
              >
                <FileText className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && <span>Notes</span>}
              </button>
            </li>
          </ul>
          
          {!isCollapsed && (
            <div className="px-4 mt-6 mb-3">
              <h2 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Categories</h2>
            </div>
          )}
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  className={`flex items-center ${isCollapsed ? 'px-4' : 'px-6'} py-2 w-full text-left ${
                    activeCategory === `category-${category.id}` 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveCategory(`category-${category.id}`)}
                  title={isCollapsed ? category.name : undefined}
                >
                  <div 
                    className={`h-3 w-3 rounded-full ${isCollapsed ? '' : 'mr-3'}`} 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  {!isCollapsed && <span>{category.name}</span>}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`flex items-center ${isCollapsed ? 'px-4' : 'px-6'} py-2 w-full text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
                onClick={() => document.getElementById('manage-categories-dialog')?.showModal()}
                title={isCollapsed ? "Manage Categories" : undefined}
              >
                <Tag className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && <span>Manage Categories</span>}
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <button 
            className={`flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${isCollapsed ? 'justify-center' : ''}`}
            onClick={() => document.getElementById('settings-dialog')?.showModal()}
          >
            <Settings className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
            {!isCollapsed && <span>Settings</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;