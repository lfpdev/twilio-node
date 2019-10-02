/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */

import Page = require('../../../../../base/Page');
import Response = require('../../../../../http/response');
import V1 = require('../../../V1');
import { SerializableClass } from '../../../../../interfaces';

/**
 * Initialize the TaskQueueRealTimeStatisticsList
 *
 * @param version - Version of the resource
 * @param workspaceSid - The SID of the Workspace that contains the TaskQueue
 * @param taskQueueSid - The SID of the TaskQueue from which these statistics were calculated
 */
declare function TaskQueueRealTimeStatisticsList(version: V1, workspaceSid: string, taskQueueSid: string): TaskQueueRealTimeStatisticsListInstance;

/**
 * Options to pass to fetch
 *
 * @property taskChannel - The TaskChannel for which to fetch statistics
 */
interface TaskQueueRealTimeStatisticsInstanceFetchOptions {
  taskChannel?: string;
}

interface TaskQueueRealTimeStatisticsListInstance {
  /**
   * @param sid - sid of instance
   */
  (sid: string): TaskQueueRealTimeStatisticsContext;
  /**
   * Constructs a task_queue_real_time_statistics
   */
  get(): TaskQueueRealTimeStatisticsContext;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

interface TaskQueueRealTimeStatisticsPayload extends TaskQueueRealTimeStatisticsResource, Page.TwilioResponsePayload {
}

interface TaskQueueRealTimeStatisticsResource {
  account_sid: string;
  activity_statistics: object[];
  longest_task_waiting_age: number;
  longest_task_waiting_sid: string;
  task_queue_sid: string;
  tasks_by_priority: object;
  tasks_by_status: object;
  total_available_workers: number;
  total_eligible_workers: number;
  total_tasks: number;
  url: string;
  workspace_sid: string;
}

interface TaskQueueRealTimeStatisticsSolution {
  taskQueueSid?: string;
  workspaceSid?: string;
}


declare class TaskQueueRealTimeStatisticsContext {
  /**
   * Initialize the TaskQueueRealTimeStatisticsContext
   *
   * @param version - Version of the resource
   * @param workspaceSid - The SID of the Workspace with the TaskQueue to fetch
   * @param taskQueueSid - The SID of the TaskQueue for which to fetch statistics
   */
  constructor(version: V1, workspaceSid: string, taskQueueSid: string);

  /**
   * fetch a TaskQueueRealTimeStatisticsInstance
   *
   * @param opts - Options for request
   * @param callback - Callback to handle processed record
   */
  fetch(opts?: TaskQueueRealTimeStatisticsInstanceFetchOptions, callback?: (error: Error | null, items: TaskQueueRealTimeStatisticsInstance) => any): Promise<TaskQueueRealTimeStatisticsInstance>;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}


declare class TaskQueueRealTimeStatisticsInstance extends SerializableClass {
  /**
   * Initialize the TaskQueueRealTimeStatisticsContext
   *
   * @param version - Version of the resource
   * @param payload - The instance payload
   * @param workspaceSid - The SID of the Workspace that contains the TaskQueue
   * @param taskQueueSid - The SID of the TaskQueue from which these statistics were calculated
   */
  constructor(version: V1, payload: TaskQueueRealTimeStatisticsPayload, workspaceSid: string, taskQueueSid: string);

  private _proxy: TaskQueueRealTimeStatisticsContext;
  accountSid: string;
  activityStatistics: object[];
  /**
   * fetch a TaskQueueRealTimeStatisticsInstance
   *
   * @param opts - Options for request
   * @param callback - Callback to handle processed record
   */
  fetch(opts?: TaskQueueRealTimeStatisticsInstanceFetchOptions, callback?: (error: Error | null, items: TaskQueueRealTimeStatisticsInstance) => any): Promise<TaskQueueRealTimeStatisticsInstance>;
  longestTaskWaitingAge: number;
  longestTaskWaitingSid: string;
  taskQueueSid: string;
  tasksByPriority: object;
  tasksByStatus: object;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
  totalAvailableWorkers: number;
  totalEligibleWorkers: number;
  totalTasks: number;
  url: string;
  workspaceSid: string;
}


declare class TaskQueueRealTimeStatisticsPage extends Page<V1, TaskQueueRealTimeStatisticsPayload, TaskQueueRealTimeStatisticsResource, TaskQueueRealTimeStatisticsInstance> {
  /**
   * Initialize the TaskQueueRealTimeStatisticsPage
   *
   * @param version - Version of the resource
   * @param response - Response from the API
   * @param solution - Path solution
   */
  constructor(version: V1, response: Response<string>, solution: TaskQueueRealTimeStatisticsSolution);

  /**
   * Build an instance of TaskQueueRealTimeStatisticsInstance
   *
   * @param payload - Payload response from the API
   */
  getInstance(payload: TaskQueueRealTimeStatisticsPayload): TaskQueueRealTimeStatisticsInstance;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

export { TaskQueueRealTimeStatisticsContext, TaskQueueRealTimeStatisticsInstance, TaskQueueRealTimeStatisticsInstanceFetchOptions, TaskQueueRealTimeStatisticsList, TaskQueueRealTimeStatisticsListInstance, TaskQueueRealTimeStatisticsPage, TaskQueueRealTimeStatisticsPayload, TaskQueueRealTimeStatisticsResource, TaskQueueRealTimeStatisticsSolution }
