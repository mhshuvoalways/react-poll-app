import React from 'react'
import { Button, ButtonGroup, ListGroup, ListGroupItem } from 'reactstrap'

class MainOpinion extends React.Component {
    state = {
        name: []
    }

    handleOpinion = (opId) => {
        const polid = this.props.poll.opinions.filter(opi => opi.id === opId)
        console.log(polid)
        this.setState({ name: polid })
    }

    render() {
        if (Object.keys(this.props.poll).length === 0) {
            return (
                <div className='mt-5'>
                    <h3>Here you can see who are get the opinions</h3>
                </div>
            )
        }
        return (
            <div className='mt-5'>
                <h3>See Opinion</h3>
                <ButtonGroup>
                    {this.props.poll.options.map(opt => (
                        <Button
                            key={opt.id}
                            onClick={() => this.handleOpinion(opt.id)} >
                            {opt.value}
                        </Button>
                    ))}
                </ButtonGroup>
                <ListGroup>
                {this.state.name.map(na => (
                    <ListGroupItem>
                        {na.name}
                    </ListGroupItem>
                ))}
                </ListGroup>
            </div>
        )
    }
}

export default MainOpinion