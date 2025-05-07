import React from 'react';
import { 
  CheckSquare, 
  Square, 
  Edit, 
  Trash, 
  Clock, 
  AlertCircle,
  Lightbulb,
  FolderKanban,
  FileText
} from 'lucide-react';
import { Item, Category } from '../types';
import { getCategories } from '../utils/storage';

interface ItemCardProps {
  item: Item;
  onToggleComplete: (id: string) => void;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ 
  item, 
  onToggleComplete, 
  onEdit, 
  onDelete 
}) => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  
  React.useEffect(() => {
    setCategories(getCategories());
  }, []);

  const getItemIcon = () => {
    switch (item.type) {
      case 'task':
        return <CheckSquare className="h-5 w-5 text-blue-600" />;
      case 'idea':
        return <Lightbulb className="h-5 w-5 text-purple-600" />;
      case 'project':
        return <FolderKanban className="h-5 w-5 text-orange-600" />;
      case 'note':
        return <FileText className="h-5 w-5 text-teal-600" />;
      default:
        return <CheckSquare className="h-5 w-5 text-blue-600" />;
    }
  };

  const getPriorityColor = () => {
    switch (item.priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategory = () => {
    if (!item.category) return null;
    return categories.find(cat => cat.id === item.category);
  };

  const category = getCategory();
  const isOverdue = item.dueDate && new Date(item.dueDate) < new Date() && !item.completed;
  
  // Format the due date
  const formatDueDate = () => {
    if (!item.dueDate) return null;
    
    const dueDate = new Date(item.dueDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (dueDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (dueDate.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return dueDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: dueDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-4 transition-all duration-200 ${item.completed ? 'opacity-70' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <button 
            onClick={() => onToggleComplete(item.id)}
            className="mr-3 focus:outline-none"
            aria-label={item.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {item.completed ? (
              <CheckSquare className="h-5 w-5 text-blue-600" />
            ) : (
              <Square className="h-5 w-5 text-gray-400" />
            )}
          </button>
          <div>
            <h3 className={`font-medium text-gray-900 ${item.completed ? 'line-through text-gray-500' : ''}`}>
              {item.title}
            </h3>
            <div className="flex items-center mt-1 space-x-2">
              <div className="flex items-center">
                {getItemIcon()}
                <span className="text-xs text-gray-600 ml-1 capitalize">
                  {item.type}
                </span>
              </div>
              
              {item.dueDate && (
                <div className={`flex items-center ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
                  <Clock className="h-3 w-3 mr-1" />
                  <span className="text-xs">{formatDueDate()}</span>
                  {isOverdue && <AlertCircle className="h-3 w-3 ml-1 text-red-600" />}
                </div>
              )}
              
              {category && (
                <div 
                  className="text-xs px-2 py-0.5 rounded-full" 
                  style={{ 
                    backgroundColor: `${category.color}20`,
                    color: category.color
                  }}
                >
                  {category.name}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-1">
          <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor()}`}>
            {item.priority}
          </span>
        </div>
      </div>
      
      {item.description && (
        <div className={`text-sm text-gray-600 ml-8 mb-3 ${item.completed ? 'line-through text-gray-400' : ''}`}>
          {item.description}
        </div>
      )}
      
      <div className="flex justify-end space-x-2 mt-2">
        <button
          onClick={() => onEdit(item)}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Edit"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Delete"
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ItemCard;