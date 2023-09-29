import { KeyboardEvent, SetStateAction } from 'react';
import { User } from '../../../models';

type Args = {
  event: KeyboardEvent<HTMLUListElement>;
  chosenItem: User | null;
  currentIndex: number | null;
  itemsToShow: User[];
  setChosenItem: (value: User | null) => void;
  setCurrentIndex: (value: SetStateAction<number | null>) => void;
  setInputValue: (value: SetStateAction<string>) => void;
  setOpen: (value: SetStateAction<boolean>) => void;
};

/**
 * Handles pressing arrow down key
 *
 * @param args                  Arguments of function
 * @param args.currentIndex     Index of currently selected item
 * @param args.itemsToShow      Items to render inside dropdown list
 * @param args.setCurrentIndex  Setter function for currentIndex
 * @returns                     Void
 */
const handleArrowDown = ({
  currentIndex,
  itemsToShow,
  setCurrentIndex,
}: Pick<Args, 'currentIndex' | 'itemsToShow' | 'setCurrentIndex'>) => {
  if (currentIndex === null) {
    setCurrentIndex(0);
    return;
  }
  if (currentIndex === itemsToShow.length - 1) {
    setCurrentIndex(0);
    return;
  }
  setCurrentIndex(prevState => Number(prevState) + 1);
};

/**
 * Handles pressing arrow up key
 *
 * @param args                  Arguments of function
 * @param args.currentIndex     Index of currently selected item
 * @param args.itemsToShow      Items to render inside dropdown list
 * @param args.setCurrentIndex  Setter function for currentIndex
 * @returns                     Void
 */
const handleArrowUp = ({
  currentIndex,
  itemsToShow,
  setCurrentIndex,
}: Pick<Args, 'currentIndex' | 'itemsToShow' | 'setCurrentIndex'>) => {
  if (currentIndex === null) {
    setCurrentIndex(0);
    return;
  }
  if (currentIndex === 0) {
    setCurrentIndex(itemsToShow.length - 1);
    return;
  }
  setCurrentIndex(prevState => Number(prevState) - 1);
};

/**
 * Handles blur on dropdown
 *
 * @param args                  Arguments of function
 * @param args.chosenItem
 * @param args.currentIndex     Index of currently selected item
 * @param args.itemsToShow      Items to render inside dropdown list
 * @param args.setChosenItem
 * @param args.setCurrentIndex  Setter function for currentIndex
 * @param args.setInputValue    Setter function for input value
 * @param args.setOpen          Setter function for open/close for dropdown
 * @returns                     Void
 */
export const handleBlur = ({
  chosenItem,
  currentIndex,
  itemsToShow,
  setChosenItem,
  setCurrentIndex,
  setInputValue,
  setOpen,
}: Omit<Args, 'event'>) => {
  if (currentIndex !== null) {
    setInputValue(itemsToShow[currentIndex].name);
    setChosenItem(itemsToShow[currentIndex]);
  }
  if (chosenItem) {
    setInputValue(chosenItem.name);
  }
  setCurrentIndex(null);
  setOpen(false);
};

/**
 * Handles pressing escape key
 *
 * @param args                 Arguments of function
 * @param args.setOpen         (in this case) Closes the dropdown
 * @returns                    Void
 */
const handleEscape = ({ setOpen }: Pick<Args, 'setOpen'>) => {
  setOpen(false);
};

const mapping = new Map<
  KeyboardEvent<HTMLUListElement>['key'],
  (args: Args) => void
>([
  ['ArrowDown', handleArrowDown],
  ['ArrowUp', handleArrowUp],
  ['Enter', handleBlur],
  ['Escape', handleEscape],
]);

/**
 * Handles pressing different keyboard keys
 *
 * @param args                  Arguments of function
 * @param args.event            Event that took place
 * @param args.chosenItem
 * @param args.currentIndex     Index of currently selected item
 * @param args.itemsToShow      Items to render inside dropdown list
 * @param args.setChosenItem
 * @param args.setCurrentIndex  Setter function for currentIndex
 * @param args.setInputValue    Setter function for input value
 * @param args.setOpen          Setter function for open/close for dropdown
 * @returns                     Void
 */
export const handleKeyDown = ({
  event,
  chosenItem,
  currentIndex,
  itemsToShow,
  setChosenItem,
  setCurrentIndex,
  setInputValue,
  setOpen,
}: Args) => {
  const callback = mapping.get(event.key);
  if (callback) {
    callback({
      event,
      chosenItem,
      currentIndex,
      itemsToShow,
      setChosenItem,
      setCurrentIndex,
      setInputValue,
      setOpen,
    });
  }
};
