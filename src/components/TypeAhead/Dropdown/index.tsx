import { FC, KeyboardEventHandler, MouseEvent } from 'react'
import { getSelectedItem } from './helpers';

import * as Styled from './styled'
import { User } from '../../../models';

type Props = {
    className?: string;
    currentIndex?: number | null;
    error: string;
    handleBlur: () => void;
    handleClickSingle?: (user: User) => void;
    handleClickMulti?: (event: MouseEvent<HTMLElement>, index: number) => void;
    handleKeyDown: KeyboardEventHandler;
    head?: number | null;
    isFetching: boolean;
    isOpen: boolean;
    itemsToShow: User[];
    multiselect: boolean;
    tail?: number | null;
}

/**
 * Sub component of TypeAhead, used to show list of results
 *
 * @param props                    The props passed to the component
 * @param props.className          styled-components generated class name, needed for styling
 * @param props.currentIndex       Index of currently selected item (in case multiselect is false)
 * @param props.error              Error message if "fetching" data fails
 * @param props.handleBlur         Handles blur event on the list
 * @param props.handleClickMulti   Handles click event on list item when selection of multiple values is possible
 * @param props.handleClickSingle  Handles click event on list item only when single value selection is possible
 * @param props.handleKeyDown      Handles key down event on the list
 * @param props.head               If multi selectable, presents the index of element from which selection starts
 * @param props.isFetching         Fetching data in progress
 * @param props.isOpen             Should show the dropdown
 * @param props.itemsToShow        Items to render inside dropdown list
 * @param props.multiselect        Is multi select enabled
 * @param props.tail               If multi selectable, presents the index of element on which selection ends
 * @returns                        The component itself
 */
const Dropdown: FC<Props> = ({
    className,
    currentIndex = null,
    error,
    handleBlur,
    handleClickMulti,
    handleClickSingle,
    handleKeyDown,
    head = null,
    isFetching,
    isOpen,
    itemsToShow,
    multiselect,
    tail = null
}) => {
    if (isOpen === false) {
        return null;
    }

    /**
     * Handles click event on list item by providing correct handling function
     * (in case user wants to select multiple values handleClickMulti will be applied,
     *  or handleClickSingle in case of selecting a single item is needed)
     *
     * @param event  If multi selectable, presents the index of element from which selection starts
     * @param index  Index of currently iterated item (user)
     * @param user   Currently iterated item (user)
     * @returns      Click handler
     */
    const clickHandler = (event: MouseEvent<HTMLElement>, index: number, user: User) => {
        if (handleClickSingle) {
            return handleClickSingle(user)
        }
        if (handleClickMulti) {
            return handleClickMulti(event, index)
        }
    }

    if (isFetching) {
        return <p> "Fancy loader/skeleton"</p>
    }
    if (error !== '') {
        return <p>{`${error}`}</p>
    }

    return (
        <Styled.List
            className={className}
            tabIndex={0}
            onBlur={handleBlur}
            onKeyDown={event => {
                handleKeyDown(event)
            }}>
            {itemsToShow.map((user, index) => {
                const { name, id } = user

                return <Styled.ListItem
                    aria-selected={
                        getSelectedItem(head, index, multiselect, currentIndex, tail)
                    }
                    data-value={id}
                    key={id}
                    onClick={(event) => clickHandler(event, index, user)}
                    role='option'
                >
                    {name}
                </Styled.ListItem>
            })}
        </Styled.List>
    )
}

export default Dropdown