import { instance } from "@/common/instance"
import type {
  CreateTodolistRequest,
  CreateTodolistResponse,
  GetTodolistsResponse,
  Todolist,
  UpdateTodolistRequest,
  UpdateTodolistResponse,
} from "@/features/todolists/api/todolistsApi.types.ts"
import { BaseResponse } from "@/common/types"

export const todolistsApi = {
  getTodolists() {
    return instance.get<GetTodolistsResponse>("/boards/my")
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

    return instance.put<UpdateTodolistResponse>(`/boards/${id}`, payload)
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

    return instance.post<CreateTodolistResponse>("/boards", payload)
  },
  deleteTodolist(id: string) {
    return instance.delete(`/boards/${id}`)
  },
}
