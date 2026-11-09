import { instance } from "@/common/instance"
import type { GetTodolistsResponse, Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { BaseResponse } from "@/common/types"

export const todolistsApi = {
  getTodolists() {
    return instance.get<GetTodolistsResponse[]>("/boards/my")
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", { title })
  },
  changeTodolistTitle(id: string, title: string) {
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
}
