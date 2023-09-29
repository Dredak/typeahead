import { ChangeEvent, KeyboardEvent, FC } from 'react'

import * as Styled from './styled'

type Props = {
    className?: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleFocus: () => void;
    handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    placeholder: string;
    value: string;
};

/**
 * Custom input component
 *
 * @param props                The props passed to the component
 * @param props.className      styled-components generated class name, needed for styling
 * @param props.handleChange   Handles blur event on the list
 * @param props.handleFocus    Handles click event on list item when selection of multiple values is possible
 * @param props.handleKeyDown  Handles different keys being pressed
 * @param props.isRequired     Is input filed required
 * @param props.placeholder    Input placeholder
 * @param props.value           Handles click event on list item only when single value selection is possible
 * @returns                    The component itself
 */
const CustomInput: FC<Props> = ({
    className,
    handleChange,
    handleFocus,
    handleKeyDown,
    isRequired = false,
    placeholder,
    value
}) => {
    return (
        <Styled.Input
            aria-haspopup={'listbox'}
            className={className}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            value={value}
            placeholder={placeholder}
            required={isRequired}
        />
    )
}

export default CustomInput