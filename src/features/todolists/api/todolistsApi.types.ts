export type Todolist = {
  id: string
  type: "boards"
  attributes: {
    title: string
    description: string
    addedAt: string
    updatedAt: string
    order: number
    isImportant: boolean
    images: {
      main: {
        type: "original"
        width: number
        height: number
        fileSize: number
        url: string
      }[]
    }
  }
}

export type CreateTodolistRequest = {
  data: {
    type: "boards"
    attributes: {
      title: string
      description?: string
    }
  }
}

export type UpdateTodolistRequest = {
  data: {
    type: "boards"
    attributes: {
      title: string
      description: string
      isImportant: boolean
    }
  }
}
