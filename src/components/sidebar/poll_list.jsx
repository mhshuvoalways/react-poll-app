import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const PollList = props => {

    const handleOnDragEnd = (e) => {
        if (!e.destination) return;

        const reorderedItem = props.polls.splice(e.source.index, 1);
        props.polls.splice(e.destination.index, 0, ...reorderedItem);

        props.dndHandler(props.polls)
    }

    if (props.polls.length === 0) {
        return <p>There is no Poll</p>
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='characters'>
                {(provided) => (
                    <ul className="characters"
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {props.polls.map((pol, index) => (
                            <Draggable
                                key={pol.id}
                                draggableId={pol.id}
                                index={index}>
                                {(provided => (
                                    <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onClick={() => props.selectPoll(pol.id)}
                                    >
                                        {pol.title.length > 35
                                            ? pol.title.substr(0, 35) + '...'
                                            : pol.title}
                                    </li>
                                ))}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}
export default PollList