import { FC } from "react";

import * as Styled from './styled'
import { User } from "../../../models";

type Props = {
    handleClick: (item: User['id']) => void;
    selectedItems: User[];
}

/**
 * List of selected items
 * 
 * @param props                Props passed to the component
 * @param props.handleClick    styled-components generated class name, needed for styling
 * @param props.selectedItems  Fetched data (array of users)
 * @returns                    Component itself
 */
const SelectedItems: FC<Props> = ({ handleClick, selectedItems }) => {
    const items = selectedItems.map(({ name, id }) => {
        return (
            <Styled.Item key={id}>
                {name}
                <Styled.ItemDelete
                    onClick={() => handleClick(id)}
                    type="button">
                    +
                </Styled.ItemDelete>
            </Styled.Item>
        )
    }
    )
    return <Styled.ItemsContainer>{items}</Styled.ItemsContainer>
}

export default SelectedItems