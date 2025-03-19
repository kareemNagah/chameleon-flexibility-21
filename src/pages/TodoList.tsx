
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Circle, 
  Calendar, 
  Clock, 
  ArrowUp, 
  ArrowDown,
  XCircle,
  Plus,
  BookOpen
} from 'lucide-react';
import { Progress } from '../components/ui/progress';
import { Checkbox } from '../components/ui/checkbox';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '../components/ui/card';

// Task type definition
interface Task {
  id: string;
  title: string;
  category: 'Learning' | 'Health' | 'Productivity';
  dueDate: string;
  progress: number;
  completed: boolean;
  resources: {
    title: string;
    url: string;
  }[];
}

const TodoList = () => {
  // Mock tasks data - would be replaced with real data from an API
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete JavaScript course module',
      category: 'Learning',
      dueDate: '2023-10-25',
      progress: 65,
      completed: false,
      resources: [
        { title: 'JavaScript Basics', url: '#' },
        { title: 'MDN Documentation', url: '#' }
      ]
    },
    {
      id: '2',
      title: 'Morning yoga routine',
      category: 'Health',
      dueDate: '2023-10-24',
      progress: 30,
      completed: false,
      resources: [
        { title: 'Beginner Yoga Video', url: '#' },
        { title: 'Stretching Guide', url: '#' }
      ]
    },
    {
      id: '3',
      title: 'Organize weekly schedule',
      category: 'Productivity',
      dueDate: '2023-10-23',
      progress: 100,
      completed: true,
      resources: [
        { title: 'Time Management Tips', url: '#' }
      ]
    },
  ]);

  // For new task input
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<'Learning' | 'Health' | 'Productivity'>('Learning');

  // Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const streakDays = 5; // This would be calculated based on user history

  // Handle task completion toggle
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, progress: task.completed ? task.progress : 100 } 
        : task
    ));
  };

  // Handle task deletion
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Handle task reordering
  const moveTask = (taskId: string, direction: 'up' | 'down') => {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (
      (direction === 'up' && taskIndex === 0) || 
      (direction === 'down' && taskIndex === tasks.length - 1)
    ) {
      return;
    }

    const newTasks = [...tasks];
    const targetIndex = direction === 'up' ? taskIndex - 1 : taskIndex + 1;
    [newTasks[taskIndex], newTasks[targetIndex]] = [newTasks[targetIndex], newTasks[taskIndex]];
    setTasks(newTasks);
  };

  // Add new task
  const addNewTask = () => {
    if (newTaskTitle.trim() === '') return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      category: newTaskCategory,
      dueDate: new Date().toISOString().split('T')[0],
      progress: 0,
      completed: false,
      resources: []
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  // When a user completes a task, we want to give visual feedback
  const [mascotColor, setMascotColor] = useState('text-chameleon-green');
  
  useEffect(() => {
    // Change mascot color when tasks are completed
    if (completedTasks === totalTasks && totalTasks > 0) {
      setMascotColor('text-chameleon-orange');
    } else if (completedTasks > 0) {
      setMascotColor('text-chameleon-yellow');
    } else {
      setMascotColor('text-chameleon-green');
    }
  }, [completedTasks, totalTasks]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get category background color
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Learning':
        return 'bg-chameleon-green-light';
      case 'Health':
        return 'bg-chameleon-yellow-light';
      case 'Productivity':
        return 'bg-chameleon-orange-light';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-chameleon-gradient py-12 px-4 sm:px-6 lg:px-8 mb-6 rounded-b-3xl shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">My Tasks</h1>
          <p className="text-white/90 mb-6">
            Track your progress, build habits, and achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="stats-card">
                <h4 className="text-sm text-white/70">Total Tasks</h4>
                <p className="text-2xl font-bold text-white">{totalTasks}</p>
              </div>
              <div className="stats-card">
                <h4 className="text-sm text-white/70">Completed</h4>
                <p className="text-2xl font-bold text-white">{completedTasks}</p>
              </div>
              <div className="stats-card">
                <h4 className="text-sm text-white/70">Current Streak</h4>
                <p className="text-2xl font-bold text-white">{streakDays} days</p>
              </div>
            </div>
            
            {/* Chameleon Mascot - changes color based on completion */}
            <div className={`flex items-center ${mascotColor} transition-colors duration-500 text-2xl font-bold`}>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-3">
                {/* This is a placeholder for a chameleon icon/svg */}
                🦎
              </div>
              <span className="hidden sm:inline text-white">
                {completedTasks === 0 ? "Start your day!" : 
                 completedTasks < totalTasks ? "Making progress!" : 
                 "All done! Great job!"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Add New Task */}
        <Card className="mb-8 border-2 border-dashed border-gray-200 bg-white/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <h3 className="text-xl font-medium mb-4">Add New Task</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title..."
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-chameleon-green"
              />
              <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value as any)}
                className="sm:w-40 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-chameleon-green"
              >
                <option value="Learning">Learning</option>
                <option value="Health">Health</option>
                <option value="Productivity">Productivity</option>
              </select>
              <button
                onClick={addNewTask}
                className="cta-button flex items-center justify-center"
              >
                <Plus className="mr-1 w-5 h-5" />
                Add Task
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Task List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <Card 
              key={task.id} 
              className={`task-card transition-all duration-300 hover:shadow-md ${task.completed ? 'opacity-70' : 'opacity-100'}`}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <div className={`px-3 py-1 text-xs rounded-full ${getCategoryColor(task.category)} text-gray-800`}>
                    {task.category}
                  </div>
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => moveTask(task.id, 'up')}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => moveTask(task.id, 'down')}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="p-1 hover:bg-gray-100 rounded-full text-red-500"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-start mt-3">
                  <div className="mt-1 mr-3">
                    <Checkbox 
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                      className="h-5 w-5"
                    />
                  </div>
                  <CardTitle className={`text-xl ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </CardTitle>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Due: {task.dueDate}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </div>

                {task.resources.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      Resources
                    </h4>
                    <ul className="text-sm">
                      {task.resources.map((resource, index) => (
                        <li key={index} className="mb-1">
                          <a 
                            href={resource.url} 
                            className="text-chameleon-green hover:text-chameleon-green-dark underline"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            {resource.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {tasks.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No tasks yet</h3>
            <p className="text-gray-500 mb-6">Add your first task to get started!</p>
          </div>
        )}

        {/* Suggestions Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recommended Tasks</h2>
          <div className="bg-chameleon-light p-6 rounded-xl">
            <p className="text-lg mb-4">Based on your habits, you might want to try:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="suggestion-card hover:shadow-md transition-all duration-300">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Morning meditation</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Start your day with a 10-minute mindfulness practice.
                  </p>
                  <button 
                    onClick={() => {
                      setTasks([...tasks, {
                        id: Date.now().toString(),
                        title: 'Morning meditation',
                        category: 'Health',
                        dueDate: new Date().toISOString().split('T')[0],
                        progress: 0,
                        completed: false,
                        resources: [{ title: 'Beginner Meditation Guide', url: '#' }]
                      }]);
                    }}
                    className="text-sm text-chameleon-green hover:text-chameleon-green-dark font-medium"
                  >
                    + Add to my tasks
                  </button>
                </CardContent>
              </Card>
              
              <Card className="suggestion-card hover:shadow-md transition-all duration-300">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Read for 20 minutes</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Continue building your daily reading habit.
                  </p>
                  <button 
                    onClick={() => {
                      setTasks([...tasks, {
                        id: Date.now().toString(),
                        title: 'Read for 20 minutes',
                        category: 'Learning',
                        dueDate: new Date().toISOString().split('T')[0],
                        progress: 0,
                        completed: false,
                        resources: []
                      }]);
                    }}
                    className="text-sm text-chameleon-green hover:text-chameleon-green-dark font-medium"
                  >
                    + Add to my tasks
                  </button>
                </CardContent>
              </Card>
              
              <Card className="suggestion-card hover:shadow-md transition-all duration-300">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Plan tomorrow</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Spend 5 minutes organizing your tasks for tomorrow.
                  </p>
                  <button 
                    onClick={() => {
                      setTasks([...tasks, {
                        id: Date.now().toString(),
                        title: 'Plan tomorrow',
                        category: 'Productivity',
                        dueDate: new Date().toISOString().split('T')[0],
                        progress: 0,
                        completed: false,
                        resources: [{ title: 'Effective Planning Tips', url: '#' }]
                      }]);
                    }}
                    className="text-sm text-chameleon-green hover:text-chameleon-green-dark font-medium"
                  >
                    + Add to my tasks
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TodoList;
