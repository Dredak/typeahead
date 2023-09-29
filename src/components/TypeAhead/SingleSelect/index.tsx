import { useState, KeyboardEvent, FC, ChangeEvent, useEffect, useRef, useCallback } from "react"
import Dropdown from "../Dropdown";
import { User } from "../../../models";
import { handleBlur, handleKeyDown } from "./helpers";

import * as Styled from './styled'
import useClickOutside from "../../../hooks/useClickOutside";
import { TypeAheadValue } from "../../../containers/example";
import { tab } from "@testing-library/user-event/dist/tab";

type Props = {
    className?: string;
    data: User[];
    error: string;
    handleTypeAheadChange: (value: TypeAheadValue) => void;
    isFetching: boolean;
}

/**
 * Type ahead component with possibility of selecting items from dropdown
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
const SingleSelect: FC<Props> = ({ className, data, error, handleTypeAheadChange, isFetching }) => {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [currentIndex, setCurrentIndex] = useState<number | null>(null)
    const [chosenItem, setChosenItem] = useState<User | null>(null)

    const wrapperRef = useRef<HTMLDivElement>(null);

    useClickOutside({
        onClick: useCallback(() => {
            handleBlur({
                chosenItem,
                currentIndex,
                itemsToShow,
                setChosenItem: (user: User | null) => {
                    handleTypeAheadChange(user)
                    setChosenItem(user)
                },
                setCurrentIndex,
                setInputValue,
                setOpen,
            })
        }, []),
        ref: wrapperRef,
        stopExec: !open,
    });

    /**
     * Handles pressing different keyboard keys
     *
     * @param event  Event that took place
     * @returns      Void
     */
    const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
        handleKeyDown({
            event,
            chosenItem,
            currentIndex,
            itemsToShow,
            setChosenItem: (value: User | null) => {
                handleTypeAheadChange(value)
                setChosenItem(value)
            },
            setCurrentIndex,
            setInputValue,
            setOpen,
        })
    }

    /**
     * Handles blur event on dropdown
     */
    const onBlur = () => {
        handleBlur({
            chosenItem,
            currentIndex,
            itemsToShow,
            setChosenItem: (user: User | null) => {
                handleTypeAheadChange(user)
                setChosenItem(user)
            },
            setCurrentIndex,
            setInputValue,
            setOpen,
        })
    }

    const itemsToShow = data.filter(item => {

        return item.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    /**
     * Handles click event on dropdown's item
     * 
     * @param user  User on which is clicked in dropdown list
     */
    const handleClick = (user: User) => {
        handleTypeAheadChange(user)
        setChosenItem(user)
        setOpen(false)
        setInputValue(user.name)
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
     * Handles tab+shift
     */
    const handleTab = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Tab" && event.shiftKey) {
            setOpen(false)
        }
    }

    useEffect(() => {
        if (inputValue === '') {
            handleTypeAheadChange(null)
            setChosenItem(null)
        }
    }, [inputValue])

    return <Styled.Wrapper className={className} ref={wrapperRef}>
        <Styled.Input
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleKeyDown={handleTab}
            isRequired={true}
            placeholder='Select Single Item'
            value={inputValue}
        />
        <Dropdown
            currentIndex={currentIndex}
            error={error}
            handleBlur={onBlur}
            handleKeyDown={onKeyDown}
            handleClickSingle={handleClick}
            isFetching={isFetching}
            isOpen={open}
            itemsToShow={itemsToShow}
            multiselect={false}
        />
    </Styled.Wrapper>
}

export default SingleSelect