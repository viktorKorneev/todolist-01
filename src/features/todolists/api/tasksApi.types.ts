// Изображение вложения
import { TaskPriority, type TaskStatus } from "@/common/enums/enums.ts"

export type AttachmentImage = {
  type: string
  width: number
  height: number
  fileSize: number
  url: string
}

// Вложение задачи
export type TaskAttachment = {
  id: string
  url: string
  contentType: string
  originalName: string
  fileSize: number
  isImage: boolean
  addedAt: string
  images: AttachmentImage[]
}

// Связь задачи с доской
export type TaskRelationship = {
  board: {
    data: {
      id: string
      type: string
    }
  }
}

// Данные задачи
export type DomainTask = {
  id: string
  type: string
  attributes: {
    title: string
    addedAt: string
    order: number
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    updatedAt: string
    attachments: TaskAttachment[]
  }
  relationships: TaskRelationship
}

// Доска, которая приходит в included
export type IncludedBoard = {
  id: string
  type: string
  attributes: {
    title: string
  }
}

// Ответ API
export type GetTasksResponse = {
  data: DomainTask[]
  included: IncludedBoard[]
  meta: {
    page: number
    pageSize: number
    totalCount: number
    pagesCount: number
  }
}

export type CreateTaskModel = {
  data: {
    type: "tasks"
    attributes: {
      title: string
    }
  }
}

export type UpdateTaskModel = {
  data: {
    type: "tasks"
    attributes: {
      title: string
      description: string
      status: TaskStatus
      priority: TaskPriority
      startDate: string
      deadline: string
    }
  }
}

export type UpdateTaskTitleModel = {
  data: {
    type: "tasks"
    attributes: {
      title: string
    }
  }
}
