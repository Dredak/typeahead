
import { useState } from 'react';
import useFakeFetch from '../../hooks/useFakeFetch'
import { User } from '../../models';
import * as Styled from './styled'

export type TypeAheadValue = User | User[] | null

const Example = () => {
    const { data, isFetching, error } = useFakeFetch();
    const [value, setValue] = useState<TypeAheadValue>(null)

    const handleChange = (value: TypeAheadValue) => {
        setValue(value)
    }

    return (
        <>
            <Styled.Form onSubmit={(event) => {
                event.preventDefault()
                const isValid = Array.isArray(value) ? value.length !== 0 : event.currentTarget.checkValidity()

                if (isValid) {
                    console.log('Chosen items:', value)
                }
            }}>
                <Styled.TypeAhead
                    data={data ?? []}
                    error={error}
                    handleTypeAheadChange={handleChange}
                    isFetching={isFetching}
                    multiselect={true}
                />
                <Styled.Button>Submit</Styled.Button>
            </Styled.Form>
        </>

    )
}

export default Example