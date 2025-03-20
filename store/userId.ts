import { atom} from 'nanostores';
import { remult } from "remult";

export const $userId = atom(remult.user?.id);

// export function increment(){
//     $counter.set(1 + $counter.get());
// }

// export function decrement(){
//     $counter.set(1 - $counter.get());
// }