const tasks = [
    { id: 1, assignedTo: 'User 1', status: 'Completed', dueDate: '2024-10-12', priority: 'Low', comments: 'This task is good' },
    { id: 2, assignedTo: 'User 2', status: 'In Progress', dueDate: '2024-09-14', priority: 'High', comments: 'This task is important' },
    { id: 3, assignedTo: 'User 3', status: 'Not Started', dueDate: '2024-08-18', priority: 'Low', comments: 'This task is new' },
    { id: 4, assignedTo: 'User 4', status: 'In Progress', dueDate: '2024-06-12', priority: 'Normal', comments: 'This task needs review' },
  ];
  
  class TaskService {
    getTasks() {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ data: tasks }), 500);
      });
    }
  
    createTask(task) {
      task.id = tasks.length + 1;
      tasks.push(task);
      return Promise.resolve();
    }
  
    updateTask(updatedTask) {
      const index = tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        tasks[index] = updatedTask;
      }
      return Promise.resolve();
    }
  
    deleteTask(id) {
      const index = tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        tasks.splice(index, 1);
      }
      return Promise.resolve();
    }
  }
  
  export default new TaskService();
  