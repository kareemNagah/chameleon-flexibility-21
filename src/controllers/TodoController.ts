
import { Todo, CreateTodoInput, UpdateTodoInput } from '../models/Todo';

// This controller would interface with your FastAPI backend
// For now, we'll use local storage as a placeholder
export class TodoController {
  private static STORAGE_KEY = 'todos';

  // Get all todos
  static async getTodos(): Promise<Todo[]> {
    try {
      const storedTodos = localStorage.getItem(this.STORAGE_KEY);
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      return [];
    }
  }

  // Create a new todo
  static async createTodo(todoInput: CreateTodoInput): Promise<Todo> {
    try {
      const todos = await this.getTodos();
      const newTodo: Todo = {
        ...todoInput,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      
      const updatedTodos = [...todos, newTodo];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedTodos));
      
      return newTodo;
    } catch (error) {
      console.error('Failed to create todo:', error);
      throw error;
    }
  }

  // Update an existing todo
  static async updateTodo(id: string, todoInput: UpdateTodoInput): Promise<Todo | null> {
    try {
      const todos = await this.getTodos();
      const todoIndex = todos.findIndex(todo => todo.id === id);
      
      if (todoIndex === -1) return null;
      
      const updatedTodo = {
        ...todos[todoIndex],
        ...todoInput
      };
      
      todos[todoIndex] = updatedTodo;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
      
      return updatedTodo;
    } catch (error) {
      console.error('Failed to update todo:', error);
      throw error;
    }
  }

  // Delete a todo
  static async deleteTodo(id: string): Promise<boolean> {
    try {
      const todos = await this.getTodos();
      const filteredTodos = todos.filter(todo => todo.id !== id);
      
      if (filteredTodos.length === todos.length) return false;
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredTodos));
      return true;
    } catch (error) {
      console.error('Failed to delete todo:', error);
      throw error;
    }
  }
}
