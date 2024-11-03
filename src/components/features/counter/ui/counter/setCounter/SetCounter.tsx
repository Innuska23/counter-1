import { ChangeEvent, FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "../../../../../common/components/input/Input";
import { RootState } from "../../../../../app/redux/store/store";
import { setMaxValueAC, setStartValueAC } from "../../../model/counter-reducer";

import s from './SetCounter.module.css';

export const SetCounter: FC = () => {

    const dispatch = useDispatch();

    const { startValue, maxValue } = useSelector((state: RootState) => state.counter);

    const checkMaxValueError = (max: number, start: number) => {
        return max < start || max < 0 || max === start;
    };

    const checkStartValueError = (start: number, max: number) => {
        return start > max || start < 0 || start === max;
    };

    const maxValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newMaxValue = Number(e.currentTarget.value);
        dispatch(setMaxValueAC(newMaxValue));
    };

    const startValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newStartValue = Number(e.currentTarget.value);
        dispatch(setStartValueAC(newStartValue));
    };

    const maxValueError = checkMaxValueError(maxValue, startValue);
    const startValueError = checkStartValueError(startValue, maxValue);

    return (
        <div className={s.board}>
            <div className={s.setContainer}>
                <span>max value: </span>
                <Input
                    type="number"
                    value={maxValue}
                    onChange={maxValueChange}
                    error={maxValueError}
                />
            </div>

            <div className={s.setContainer}>
                <span>start value: </span>
                <Input
                    type="number"
                    value={startValue}
                    onChange={startValueChange}
                    error={startValueError}
                />
            </div>
        </div>
    );
};