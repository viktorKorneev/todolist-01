import { type TaskPriority, TaskStatus } from "@/common/enums"
import type { ApiResource, BaseResponse } from "@/common/types"

export type TaskAttributes = {
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
  order: number
  addedAt: string
  updatedAt: string
}

export type DomainTask = { id: string; todolistId: string } & TaskAttributes

export type GetTasksResponse = BaseResponse<ApiResource<TaskAttributes>[]>

export type UpdateTaskModel = {
  title?: string
  description?: string | null
  status?: TaskStatus
  priority?: TaskPriority
  startDate?: string | null
  deadline?: string | null
}
