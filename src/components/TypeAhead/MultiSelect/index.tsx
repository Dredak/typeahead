import { useState, KeyboardEvent, MouseEvent, ChangeEvent, FC, useRef, useCallback } from "react"
import Dropdown from "../Dropdown"
import { getItemsToShow } from "../helpers"
import { handleBlur, handleKeyDown } from "./helpers"
import SelectedItems from "../SelectedItems"


import * as Styled from './styled'
import { User } from "../../../models"
import { TypeAheadValue } from "../../../containers/example"
import useClickOutside from "../../../hooks/useClickOutside"

type Props = {
    className?: string;
    data: User[];
    error: string;
    handleTypeAheadChange: (value: TypeAheadValue) => void;
    isFetching: boolean;
}
/**
 * Type ahead component with possibility of multi selecting items from dropdown
 * with mouse or via keyboard
 * 
 * @param props                        Props passed to the component
 * @param props.className              styled-components generated class name, needed for styling
 * @param props.data                   Fetched data (array of users)
 * @param props.error                  Error message if "fetching" data fails
 * @param props.handleTypeAheadChange  Gets called each time TypeAhead changes value
 * @param props.ifFetching             Fetching data in progress
 * @returns                            Component itself
 */
const MultiSelect: FC<Props> = ({ className, data, error, handleTypeAheadChange, isFetching }) => {
    const [open, setOpen] = useState(false)
    const [chosenItems, setChosenItems] = useState<User[]>([])
    const [inputValue, setInputValue] = useState('')
    const [head, setHead] = useState<number | null>(null)
    const [tail, setTail] = useState<number | null>(null)

    const itemsToShow = getItemsToShow(chosenItems, data, inputValue)

    const wrapperRef = useRef<HTMLDivElement>(null);

    useClickOutside({
        onClick: useCallback(() => {
            handleBlur({
                chosenItems,
                handleTypeAheadChange,
                head,
                itemsToShow,
                setChosenItems,
                setHead,
                setOpen,
                setTail,
                tail,
            })
        }, []),
        ref: wrapperRef,
        stopExec: !open,
    });

    /**
     * Handles blur event on dropdown
     */
    const onBlur = () => {
        handleBlur({
            chosenItems,
            handleTypeAheadChange,
            head,
            itemsToShow,
            setChosenItems,
            setHead,
            setOpen,
            setTail,
            tail,
        })
    }

    /**
     * Handles key down event on dropdown
     * 
     * @param event Event that took place
     */
    const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
        handleKeyDown({
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
        })
    }

    /**
     * Handles click event on dropdown's item
     * 
     * @param event  Event that took place
     * @param index  Index of element on which event happened
     */
    const handleClick = (
        event: MouseEvent<HTMLElement>,
        index: number,
    ) => {
        if (event.shiftKey) {
            head === null ? setHead(index) : setTail(index)
            return
        }
        setHead(index)
        setTail(null)
    }

    /**
     * Handles change event on input element
     * 
     * @param event  Event that took place
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)

    /**
     * Handles focus event on input
     */
    const handleFocus = () => setOpen(true)

    /**
     * Handles click event on X inside selected item
     * (deletes item from chosenItems)
     * 
     * @param id  ID of user that will be removed
     */
    const handleSelectedItemClick = (id: User['id']) => {
        setChosenItems(chosenOnes => chosenOnes.filter(one => one.id !== id))
    }

    /**
    * Handles tab+shift
    */
    const handleTab = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Tab" && event.shiftKey) {
            setOpen(false)
        }
    }


    return <Styled.Wrapper className={className} ref={wrapperRef}>
        <SelectedItems handleClick={handleSelectedItemClick} selectedItems={chosenItems} />
        <Styled.Input
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleKeyDown={handleTab}
            placeholder='Multi Select'
            value={inputValue}
        />
        <Dropdown
            error={error}
            handleBlur={onBlur}
            handleKeyDown={onKeyDown}
            handleClickMulti={handleClick}
            head={head}
            isFetching={isFetching}
            isOpen={open}
            itemsToShow={itemsToShow}
            multiselect={true}
            tail={tail}
        />
    </Styled.Wrapper>
}

export default MultiSelect