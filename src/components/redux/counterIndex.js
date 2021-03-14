import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {increase, decrease} from './CounterSlice'


function CounterIndex(props) {
    const dispatch = useDispatch()
    const counter = useSelector( state => state.count)
    const handleincreaseClick = () => {
        const action = increase();
        dispatch(action)
    }

    const handledecreaseClick = () => {
        const action = decrease()
        dispatch(action)
    }
    return (
        <div style={{margin: 300}}>
            Counter: {counter}
            <button onClick={handleincreaseClick}>tang</button>
            <button onClick={handledecreaseClick}>giam</button>
        </div>
        
    )
}

CounterIndex.propTypes = {

}

export default CounterIndex

