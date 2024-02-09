import { Injectable, NotFoundException } from '@nestjs/common';
import { type Task, TaskStatus } from './task.model';
// import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getAllTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let foundedTasks = this.getAllTasks();

    if (status) {
      foundedTasks = foundedTasks.filter((task) => task.status === status);
    }

    if (search) {
      foundedTasks = foundedTasks.filter((task) => {
        return task.title.includes(search) || task.description.includes(search);
      });
    }

    return foundedTasks;
  }

  createTask(dto: CreateTaskDto): Task {
    const { title, description } = dto;

    const newTask: Task = {
      // id: uuidv4(),
      // for more comfortable checking id's
      id: String(this.tasks.length + 1),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  getTaskById(id: string): Task {
    const foundTask = this.tasks.find((task) => task.id === id);

    if (!foundTask) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
    return foundTask;
  }

  deleteTaskById(id: string): { msg: string } {
    const found = this.getTaskById(id);

    this.tasks = this.tasks.filter((task) => task.id !== found.id);
    return { msg: 'Task deleted' };
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
