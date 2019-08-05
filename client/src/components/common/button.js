import React from 'react'

export default function Button(props) {
    return (
        <button type={props.type} className="main-button">{props.text}</button>
    )
}
