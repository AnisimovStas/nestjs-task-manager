import { Injectable, NotFoundException } from '@nestjs/common';
//import { v4 as uuidv4 } from 'uuid';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  // getAllTasks() {
  //   return this.tasks;
  // }
  //
  // getAllTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //
  //   let foundedTasks = this.getAllTasks();
  //
  //   if (status) {
  //     foundedTasks = foundedTasks.filter((task) => task.status === status);
  //   }
  //
  //   if (search) {
  //     foundedTasks = foundedTasks.filter((task) => {
  //       return task.title.includes(search) || task.description.includes(search);
  //     });
  //   }
  //
  //   return foundedTasks;
  // }
  //

  createTask(dto: CreateTaskDto): Promise<Task> {
    const newTask = this.tasksRepository.createTask(dto);

    return newTask;
  }
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
    return found;
  }

  // getTaskById(id: string): Task {
  //   const foundTask = this.tasks.find((task) => task.id === id);
  //
  //   if (!foundTask) {
  //     throw new NotFoundException(`Task with id "${id}" not found`);
  //   }
  //   return foundTask;
  // }
  //
  // deleteTaskById(id: string): { msg: string } {
  //   const found = this.getTaskById(id);
  //
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  //   return { msg: 'Task deleted' };
  // }
  //
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
