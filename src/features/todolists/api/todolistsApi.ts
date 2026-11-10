import { instance } from "@/common/instance"
import type {
  CreateTodolistRequest,
  Todolist,
  UpdateTodolistRequest,
} from "@/features/todolists/api/todolistsApi.types.ts"
import type { BaseResponse } from "@/common/types"

export const todolistsApi = {
  getTodolists() {
    return instance.get<BaseResponse<Todolist[]>>("/boards/my")
  },
  // changeTodolistTitle(id: string, title: string) {
  //   return instance.put<BaseResponse>(`/boards/${id}`, { title, isImportant: false })
  // },
  changeTodolistTitle(id: string, title: string) {
    const payload: UpdateTodolistRequest = {
      data: {
        type: "boards",
        attributes: {
          title,
          description: "",
          isImportant: false,
        },
      },
    }

    return instance.put<BaseResponse>(`/boards/${id}`, payload)
  },
  // createTodolist(title: string) {
  //   return instance.post<BaseResponse<{ item: Todolist }>>("/boards", { title, description: '' })
  // },
  createTodolist(title: string, description?: string) {
    const payload: CreateTodolistRequest = {
      data: {
        type: "boards",
        attributes: {
          title,
          description,
        },
      },
    }

    return instance.post<BaseResponse>("/boards", payload)
  },
  deleteTodolist(id: string) {
    return instance.delete(`/boards/${id}`)
  },
}
