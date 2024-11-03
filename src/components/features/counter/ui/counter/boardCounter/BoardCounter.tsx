import { FC } from "react"
import { useSelector } from "react-redux"
import { selectCounter } from "../../../../../app/redux/store/counterStore"

import s from './BoardCounter.module.css'

type BoardCounterPropType = {
    value: number | string
}

export const BoardCounter: FC<BoardCounterPropType> = ({ value }) => {
    const { startValue, maxValue, counter } = useSelector(selectCounter)

    const hasError = maxValue < startValue || startValue < 0 || maxValue === startValue
    const isMaxValue = maxValue === counter && !hasError;

    const displayValue = hasError ? "Incorrect Value" : value;

    const styles = `${hasError ? s.error : ' '}
                    ${typeof displayValue === 'number' ? s.number : s.text}
                    ${isMaxValue ? s.error : ''}`

    return (
        <div className={s.board}>
            <span className={styles}>
                {displayValue}
            </span>
        </div>
    )
}