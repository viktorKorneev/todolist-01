export type Todolist = {
  id: string
  type: string
  attributes: {
    id: string
    title: string
    description: string
    addedAt: string
    updatedAt: string
    order: number
    isImportant: boolean
    images: {
      main: (string | null)[]
    }
  }
}

export type GetTodolistsResponse = {
  data: [Todolist]
}
