import { useSelector, useDispatch } from "react-redux";
import {decrement, increment, incrementBy, reset } from "./counterSlice";
import {useState} from "react";

const Counter = () => {
    const count = useSelector(
        (state) => state.counter.count
    );
    const dispatch = useDispatch();
    const [ increaseBy, setIncreaseBy ] =  useState(0);

    const resetValues = () => {
        setIncreaseBy(0);
        dispatch(reset());
    }

    return (
        <section>
            <p>{count}</p>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <input
                type="number"
                value={increaseBy}
                onChange={(e) => setIncreaseBy(+e.target.value)} />
            <button onClick={() => dispatch(incrementBy(increaseBy))}>add</button>
            <button onClick={resetValues}>reset</button>
        </section>
    )
}

export default Counter;
