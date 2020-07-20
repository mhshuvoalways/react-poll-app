import React from 'react'
import { Button, ButtonGroup, ListGroup, ListGroupItem } from 'reactstrap'

class MainOpinion extends React.Component {
    state = {
        opis: []
    }

    componentDidMount() {
        if (Object.keys(this.props.poll).length > 0) {
            return this.setState({ opis: this.props.poll.opinions.map(opi => opi.selectedOption) })
        }
    }

    handleOpinion = (opId) => {
        const polid = this.state.opis.find(opi => opi.selectedOption === opId)
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
                    {console.log(this.state.opis)}
                </ListGroup>
            </div>
        )
    }
}

export default MainOpinion