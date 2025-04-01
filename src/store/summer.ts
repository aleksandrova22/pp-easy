import { atom} from 'nanostores';

export const $summer = atom(0);

export function increment(energy: number ){
   
    $summer.set(energy + $summer.get());
}

