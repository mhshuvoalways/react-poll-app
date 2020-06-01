import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

const PollList = props => {
    if (props.polls.length === 0) {
        return <p>There is no Poll</p>
    }
    return (
        <ListGroup>
            {props.polls.map(pol => (
                <ListGroupItem
                    key={pol.id}
                    onClick={() => props.selectPoll(pol.id)}
                    style={{ cursor: 'pointer' }}>
                    {pol.title.length > 35
                        ? pol.title.substr(0, 35) + '...'
                        : pol.title}
                </ListGroupItem>
            ))}
        </ListGroup>
    )
}
export default PollList