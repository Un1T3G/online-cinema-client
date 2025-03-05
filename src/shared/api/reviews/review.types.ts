import { UserResponse } from '../users'

export interface ReviewLeaveDto {
  rating: number
  text: string
}

export interface ReviewResponse {
  id: string
  text: string
  rating: number
  user: UserResponse
  createdAt: string
}
