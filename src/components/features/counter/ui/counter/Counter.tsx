import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCounter } from "../../../../app/store/counterStore";
import { incrementCounterAC, resetCounterAC, setCounterAC } from "../../model/counter-reducer";

import { Button } from "../../../../common/components/button/Button";
import { SetCounter } from "./setCounter/SetCounter";
import { BoardCounter } from "./boardCounter/BoardCounter";


export const Counter = memo(() => {

    const { startValue, maxValue, counter: currentCounter } = useSelector(selectCounter)

    const dispatch = useDispatch()

    const [isSet, setIsSet] = useState<boolean>(() => {
        const saved = localStorage.getItem('isSet')
        return saved ? JSON.parse(saved) : false
    })

    const isError = startValue < 0 || maxValue <= startValue

    const disabledIncBtn = !isSet || isError || currentCounter === maxValue
    const disabledResetBtn = !isSet || isError || currentCounter === startValue

    const valueBoard = !isSet
        ? "enter values and press 'set'"
        : currentCounter

    useEffect(() => {
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
        localStorage.setItem('startValue', JSON.stringify(startValue))
        localStorage.setItem('counter', JSON.stringify(currentCounter))
        localStorage.setItem('isSet', JSON.stringify(isSet))
    }, [maxValue, startValue, currentCounter, isSet])

    const incHandler = useCallback(() => dispatch(incrementCounterAC()), [dispatch]);

    const setHandler = useCallback(() => {
        dispatch(setCounterAC())
        setIsSet(true)
    }, [dispatch])

    const resetHandler = useCallback(() => {
        dispatch(resetCounterAC())
        setIsSet(false)
    }, [dispatch])

    return (
        <>
            <div className="Container">
                <SetCounter />
                <div className='ButtonContainer'>
                    <Button
                        onClick={setHandler}
                        disabled={isSet || isError}>
                        set
                    </Button>
                </div>
            </div>

            <div className="Container">
                <BoardCounter value={valueBoard} />

                <div className='ButtonContainer'>
                    <Button
                        onClick={incHandler}
                        disabled={disabledIncBtn}>
                        inc
                    </Button>

                    <Button
                        onClick={resetHandler}
                        disabled={disabledResetBtn}>
                        reset
                    </Button>
                </div>
            </div>
        </>
    )
})
