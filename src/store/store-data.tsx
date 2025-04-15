import { atom } from "nanostores";

export const $isOpen = atom(false);

export function isOpenToggle() {
    $isOpen.set(!$isOpen.get());
}
