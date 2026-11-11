import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import type {
  CreateTaskModel,
  DomainTask,
  GetTasksResponse,
  UpdateTaskModel,
} from "@/features/todolists/api/tasksApi.types.ts"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/boards/${todolistId}/tasks`)
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload

    return instance.put<BaseResponse<DomainTask>>(`/boards/${todolistId}/tasks/${taskId}`, model)
  },
  createTask(payload: { todolistId: string; title: string; model: CreateTaskModel }) {
    const { todolistId, model } = payload
    return instance.post<BaseResponse<DomainTask>>(`/boards/${todolistId}/tasks`, model)
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete(`/boards/${todolistId}/tasks/${taskId}`)
  },
}
