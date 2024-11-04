import { FC, memo, useMemo } from "react"
import { useSelector } from "react-redux"
import { selectCounter } from "../../../../../app/store/counterStore"

import s from './BoardCounter.module.css'

type BoardCounterPropType = {
    value: number | string
}

export const BoardCounter: FC<BoardCounterPropType> = memo(({ value }) => {

    const { startValue, maxValue, counter } = useSelector(selectCounter)

    const hasError = useMemo(() =>
        maxValue < startValue || startValue < 0 || maxValue === startValue,
        [maxValue, startValue]
    )

    const isMaxValue = useMemo(() =>
        maxValue === counter && !hasError,
        [maxValue, counter, hasError]
    )

    const displayValue = useMemo(() =>
        hasError ? "Incorrect Value" : value,
        [hasError, value]
    )

    const styles = useMemo(() =>
        `${hasError ? s.error : ' '}
         ${typeof displayValue === 'number' ? s.number : s.text}
         ${isMaxValue ? s.error : ''}`,
        [hasError, displayValue, isMaxValue]
    )


    return (
        <div className={s.board}>
            <span className={styles}>
                {displayValue}
            </span>
        </div>
    )
})