import { FC } from "react";
import SingleSelect from "./SingleSelect";
import MultiSelect from "./MultiSelect";
import { User } from "../../models";
import { TypeAheadValue } from "../../containers/example";

type Props = {
  className?: string;
  data: User[];
  error: string;
  handleTypeAheadChange: (value: TypeAheadValue) => void;
  isFetching: boolean;
  multiselect: boolean;
}

/**
 * Type ahead component with possibility of multi selecting items from dropdown
 * with mouse or via keyboard
 * 
 * @param props             Props passed to the component
 * @param props.className   styled-components generated class name, needed for styling
 * @param props.data        Fetched data (array of users)
 * @param props.error       Error message if "fetching" data fails
 * @param props.handleTypeAheadChange
 * @param props.ifFetching  Fetching data in progress
 * @returns                 Component itself
 */
const TypeAhead: FC<Props> = ({ className, data, error, handleTypeAheadChange, isFetching, multiselect }) => {
  if (multiselect) {
    return <MultiSelect className={className} data={data} error={error} handleTypeAheadChange={handleTypeAheadChange} isFetching={isFetching} />
  }
  return <SingleSelect className={className} data={data} error={error} handleTypeAheadChange={handleTypeAheadChange} isFetching={isFetching} />
}

export default TypeAhead