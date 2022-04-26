import { IEvent } from '../../../models/IEvent'
import { IUser } from '../../../models/IUser'

export interface EventState {
  guests: IUser[]
  events: IEvent[]
}

export enum EventActionEnum {
  SET_USERS = 'SET_USERS',
  SET_EVENTS = 'SET_EVENTS',
}

export interface SetGuestsAction {
  type: EventActionEnum.SET_USERS
  payload: IUser[]
}

export interface SetEventsAction {
  type: EventActionEnum.SET_EVENTS
  payload: IEvent[]
}

export type EventActions = SetEventsAction | SetGuestsAction
