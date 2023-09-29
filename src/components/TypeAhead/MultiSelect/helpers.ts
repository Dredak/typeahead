import { KeyboardEvent, SetStateAction } from 'react';
import { getIsInRange } from '../helpers';
import { User } from '../../../models';
import { TypeAheadValue } from '../../../containers/example';

type Args = {
  chosenItems: User[];
  event: KeyboardEvent<HTMLUListElement>;
  handleTypeAheadChange: (value: TypeAheadValue) => void;
  head: number | null;
  itemsToShow: User[];
  setChosenItems: (value: SetStateAction<User[]>) => void;
  setHead: (value: SetStateAction<number | null>) => void;
  setOpen: (value: SetStateAction<boolean>) => void;
  setTail: (value: SetStateAction<number | null>) => void;
  tail: number | null;
};

/**
 * Handles pressing arrow down key
 *
 * @param args              Arguments of function
 * @param args.event        Event that took place
 * @param args.head         Index of element from which selection starts
 * @param args.itemsToShow  Items to render inside dropdown list
 * @param args.setHead      Setter function for head
 * @param args.tail         Index of element on which selection ends
 * @param args.setTail      Setter function for tail
 * @returns                 Void
 */
const handleArrowDown = ({
  event,
  head,
  itemsToShow,
  setHead,
  tail,
  setTail,
}: Omit<Args, 'setOpen' | 'setChosenItems'>): void => {
  if (event.shiftKey) {
    if (head === null) {
      setHead(0);
      return;
    }
    setTail(prevState => {
      if (prevState === null) {
        return Number(head) + 1;
      }
      if (tail === itemsToShow.length - 1) {
        return prevState;
      }
      return prevState + 1;
    });
    return;
  }
  if (head === null) {
    setHead(0);
    return;
  }
  if (head === itemsToShow.length - 1) {
    setHead(0);
    setTail(null);
    return;
  }
  setHead(prevState => Number(prevState) + 1);
  setTail(null);
};

/**
 * Handles pressing arrow up key
 *
 * @param args              Arguments of function
 * @param args.event        Event that took place
 * @param args.head         Index of element from which selection starts
 * @param args.itemsToShow  Items to render inside dropdown list
 * @param args.setHead      Setter function for head
 * @param args.setTail      Setter function for tail
 * @returns                 Void
 */
const handleArrowUp = ({
  event,
  head,
  itemsToShow,
  setHead,
  setTail,
}: Omit<Args, 'setChosenItems' | 'setOpen' | 'tail'>): void => {
  if (event.shiftKey) {
    if (head === null) {
      setHead(itemsToShow.length - 1);
      return;
    }
    setTail(prevState => {
      if (prevState === null) {
        return Number(head) - 1;
      }
      if (prevState === 0) {
        return prevState;
      }
      return prevState - 1;
    });
    return;
  }
  if (head === null) {
    setHead(0);
    return;
  }
  if (head === 0) {
    setHead(itemsToShow.length - 1);
    setTail(null);
    return;
  }
  setHead(prevState => Number(prevState) - 1);
  setTail(null);
};

/**
 * Handles blur on dropdown
 *
 * @param args                        Arguments of function
 * @param args.chosenItems            Items that are selected by user
 * @param args.handleTypeAheadChange  Gets called each time TypeAhead changes value
 * @param args.head                   Index of element from which selection starts
 * @param args.itemsToShow            Items to render inside dropdown list
 * @param args.setChosenItems         Setter for chosen items
 * @param args.setHead                Setter function for head
 * @param args.setOpen                Open/closes the dropdown
 * @param args.setTail                Setter function for tail
 * @param args.tail                   Index of element on which selection ends
 * @returns                           Void
 */
export const handleBlur = ({
  chosenItems,
  handleTypeAheadChange,
  head,
  itemsToShow,
  setChosenItems,
  setHead,
  setOpen,
  setTail,
  tail,
}: Omit<Args, 'event'>): void => {
  if (head !== null && tail !== null) {
    handleTypeAheadChange([
      ...chosenItems,
      ...itemsToShow.filter((item, index) => getIsInRange(index, tail, head)),
    ]);
    setChosenItems(prevState => [
      ...prevState,
      ...itemsToShow.filter((item, index) => getIsInRange(index, tail, head)),
    ]);
  } else if (head !== null) {
    handleTypeAheadChange([...chosenItems, itemsToShow[head]]);
    setChosenItems(prevState => [...prevState, itemsToShow[head]]);
  }
  setHead(null);
  setTail(null);
  setOpen(false);
};

/**
 * Handles pressing escape key
 *
 * @param args                 Arguments of function
 * @param args.setHead         Setter function for head
 * @param args.setOpen         (in this case) Closes the dropdown
 * @param args.setTail         Setter function for tail
 * @returns                    Void
 */
const handleEscape = ({
  setHead,
  setTail,
  setOpen,
}: Pick<Args, 'setHead' | 'setOpen' | 'setTail'>): void => {
  setHead(null);
  setTail(null);
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
 * @param args                        Arguments of function
 * @param args.chosenItems            Items that are selected by user
 * @param args.event                  Event that took place
 * @param args.handleTypeAheadChange  Gets called each time TypeAhead changes value
 * @param args.head                   Index of element from which selection starts
 * @param args.itemsToShow            Items to render inside dropdown list
 * @param args.setChosenItems         Setter for chosen items
 * @param args.setHead                Setter function for head
 * @param args.setOpen                Open/closes the dropdown
 * @param args.setTail                Setter function for tail
 * @param args.tail                   Index of element on which selection ends
 * @returns                           Void
 */
export const handleKeyDown = ({
  chosenItems,
  event,
  handleTypeAheadChange,
  head,
  itemsToShow,
  setChosenItems,
  setHead,
  setOpen,
  setTail,
  tail,
}: Args): void => {
  const callback = mapping.get(event.key);
  if (callback) {
    callback({
      chosenItems,
      event,
      handleTypeAheadChange,
      head,
      itemsToShow,
      setChosenItems,
      setHead,
      setOpen,
      setTail,
      tail,
    });
  }
};
