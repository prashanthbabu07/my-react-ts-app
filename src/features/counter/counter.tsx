// import React from "react";
// import type { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementAsync } from "./counterSlice";
import type { AppDispatch, RootState } from "../../store";

export function Counter() {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch: AppDispatch = useDispatch();

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>

                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(incrementAsync(2000))}
                >
                    Increment
                </button>
            </div>
        </div>
    );
}
