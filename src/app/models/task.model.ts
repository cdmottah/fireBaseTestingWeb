import { Timestamp } from "@angular/fire/firestore"

export interface taskFromDatabase {
  createdDate: Timestamp
  description: string,
  state: StateType
  title: string
  userId: String
}

export interface taskFromFront{
  createdDate: Date
  description: string,
  state: StateType
  title: string
  userId: String
}


export type StateType = 'backlog' | 'to-do' | 'WIP' | 'done'
