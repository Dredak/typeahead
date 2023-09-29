import { User } from '../../models';

/**
 * Calculates should item be marked as selected
 *
 * @param chosenItems Items that are chosen by the user
 * @param data        Array of User data
 * @param inputValue  Value typed in CustomInput
 * @returns           Items that will be rendered in dropdown
 */
export const getItemsToShow = (
  chosenItems: User[],
  data: User[],
  inputValue: string,
) =>
  data.filter(
    item =>
      !chosenItems.some(selectedItem => selectedItem.id === item.id) &&
      item.name.toLowerCase().includes(inputValue.toLowerCase()),
  );

/**
 * Whether the checkingValue is in given range
 *
 * @param checkingValue Value that we checking against the range
 * @param end           End of the range
 * @param start         Start of the range
 * @returns             Boolean (whether the checkingValue is in given range)
 */
export const getIsInRange = (
  checkingValue: number,
  end: number,
  start: number,
): boolean => {
  if (start < end) {
    return checkingValue >= start && checkingValue <= end;
  }
  if (start > end) {
    return checkingValue >= end && checkingValue <= start;
  }
  //In case start equals end, check against only one of them
  return checkingValue === start;
};
