import { getIsInRange } from '../helpers';

/**
 * Calculates should item be marked as selected
 *
 * @param head         If multi selectable, presents the index of element from which selection starts
 * @param index        Index of currently iterated item (user)
 * @param multiselect  Is multiselect enabled
 * @param currentIndex Index of currently selected item (in case multiselect is false)
 * @param tail         If multi selectable, presents the index of element on which selection ends
 * @returns            Boolean
 */
export const getSelectedItem = (
  head: number | null,
  index: number,
  multiselect: boolean,
  currentIndex: number | null,
  tail: number | null,
): boolean => {
  if (multiselect === false) {
    return index === currentIndex;
  }
  if (head === null) {
    return false;
  }
  if (tail === null) {
    return head === index;
  }
  return getIsInRange(index, tail, head);
};
