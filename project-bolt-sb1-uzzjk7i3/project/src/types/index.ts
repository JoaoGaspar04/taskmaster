export type Priority = 'low' | 'medium' | 'high';
export type ItemType = 'task' | 'idea' | 'project' | 'note';

export interface Item {
  id: string;
  title: string;
  description: string;
  type: ItemType;
  priority: Priority;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  category?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}