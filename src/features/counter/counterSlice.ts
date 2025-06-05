import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
    value: number;
    status: "idle" | "loading" | "succeeded" | "failed"; // To track async operation status
    error: string | null; // To store potential errors
}

const initialState: CounterState = {
    value: 0,
    status: "idle",
    error: null,
};

// 1. Define the async thunk
// It takes two generic type arguments:
// - The return type of the payload creator (what your async logic returns)
// - The argument type of the payload creator (what you pass to the thunk)
// - Optional: {dispatch, getState, extra} for accessing store, etc.
export const incrementAsync = createAsyncThunk<number, number>(
    "counter/incrementAsync", // Action type prefix for the thunk
    async (delay: number) => {
        console.log(`incrementAsync called with delay: ${delay}ms`);
        // Simulate an asynchronous operation (e.g., an API call)
        return new Promise((resolve) => {
            setTimeout(() => {
                const incrementAmount = 1; // Or any value you want to return
                console.log(`Simulating async increment after ${delay}ms`);
                resolve(incrementAmount);
            }, delay);
        });
    },
);

export const increment = createAction("counter/increment");
export const incrementHandler = (state: CounterState) => {
    state.value += 1;
};

export const decrement = createAction("counter/decrement");
export const decrementHandler = (state: CounterState) => {
    state.value -= 1;
};

const handleIncrementAsyncFulfilled = (
    state: CounterState,
    action: PayloadAction<number>,
) => {
    state.status = "succeeded";
    state.value += action.payload; // Use the payload returned by the thunk
    state.error = null; // Clear any previous errors
};

const handleIncrementAsyncRejected = (state: CounterState, action: any) => {
    // 'any' for action here due to complex error type
    state.status = "failed";
    // action.error.message contains the error message from the thunk rejection
    state.error = action.error.message || "Something went wrong";
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(increment, incrementHandler)
            .addCase(decrement, decrementHandler);

        builder
            .addCase(incrementAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(incrementAsync.fulfilled, handleIncrementAsyncFulfilled)
            .addCase(incrementAsync.rejected, handleIncrementAsyncRejected);
    },
});

// Action creators are generated for each case reducer function
export const { incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
