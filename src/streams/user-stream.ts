import { BehaviorSubject } from 'rxjs';
import User from '../classes/users';

const userStream = new BehaviorSubject<User | null>(null);

export const $currentUser = userStream.asObservable();

export function updateCurrentUser(currentUser: User | null) {
   userStream.next(currentUser);
}