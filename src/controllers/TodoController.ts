
import { Todo, CreateTodoInput, UpdateTodoInput } from '../models/Todo';
import { supabase } from '@/integrations/supabase/client';

export class TodoController {
  // Get all todos for the current user
  static async getTodos(): Promise<Todo[]> {
    try {
      const { data: todos, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching todos:', error);
        throw error;
      }
      
      return todos.map(todo => ({
        ...todo,
        id: todo.id,
        createdAt: new Date(todo.created_at)
      })) as Todo[];
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      return [];
    }
  }

  // Create a new todo
  static async createTodo(todoInput: CreateTodoInput): Promise<Todo> {
    try {
      // Get the current user's ID
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      const { data, error } = await supabase
        .from('todos')
        .insert([
          { 
            title: todoInput.title, 
            completed: todoInput.completed,
            user_id: user.id 
          }
        ])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating todo:', error);
        throw error;
      }
      
      return {
        id: data.id,
        title: data.title,
        completed: data.completed,
        createdAt: new Date(data.created_at)
      };
    } catch (error) {
      console.error('Failed to create todo:', error);
      throw error;
    }
  }

  // Update an existing todo
  static async updateTodo(id: string, todoInput: UpdateTodoInput): Promise<Todo | null> {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({ 
          title: todoInput.title, 
          completed: todoInput.completed,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating todo:', error);
        throw error;
      }
      
      return {
        id: data.id,
        title: data.title,
        completed: data.completed,
        createdAt: new Date(data.created_at)
      };
    } catch (error) {
      console.error('Failed to update todo:', error);
      throw error;
    }
  }

  // Delete a todo
  static async deleteTodo(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting todo:', error);
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error('Failed to delete todo:', error);
      throw error;
    }
  }
}
