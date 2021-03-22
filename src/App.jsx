import React from 'react';
import shortid from 'shortid'
import { Container, Row, Col, Toast, ToastBody, ToastHeader } from 'reactstrap'
import POLLS from './data/polls'
import MainContent from './components/main-content/index'
import Sidebar from './components/sidebar/index'
import MainOpinion from './components/see-opinion/index'

class App extends React.Component {
  state = {
    polls: [],
    selectedPoll: {},
    searchTerm: '',
    toast: false
  }

  componentDidMount() {
    this.setState({ polls: POLLS })
  }

  addNewPoll = poll => {
    poll.id = shortid.generate()
    poll.created = new Date()
    poll.totalVote = 0
    poll.opinions = []

    // this.setState({ polls: [...this.state.polls, poll] })
    this.setState({
      polls: this.state.polls.concat(poll),
      toast: true
    })
  }

  updatePoll = updatePoll => {
    const polls = [...this.state.polls]
    const poll = polls.find(pol => pol.id === updatePoll.id)

    poll.title = updatePoll.title
    poll.description = updatePoll.description
    poll.options = updatePoll.options

    this.setState(
      {
        polls,
        toast: true
      }

    )
  }

  deletePoll = pollId => {
    const polls = this.state.polls.filter(poll => poll.id !== pollId)
    this.setState({
      polls,
      selectedPoll: {},
      toast: true
    })
  }

  selectPoll = pollId => {
    const poll = this.state.polls.find(poll => poll.id === pollId)
    this.setState({ selectedPoll: poll })
  }

  handleSearch = searchTerm => {
    this.setState({ searchTerm })
  }

  performSearch = () => {
    return this.state.polls.filter(poll =>
      poll.title
        .toLowerCase()
        .includes(this.state.searchTerm.toLowerCase())
    )
  }

  getOpinion = response => {
    const { polls } = this.state
    const poll = polls.find(p => p.id === response.pollId)
    const option = poll.options.find(o => o.id === response.selectedOption)

    poll.totalVote++
    option.vote++
    const opinion = {
      id: option.id,
      name: response.name,
      selectedOption: response.selectedOption
    }
    poll.opinions.push(opinion)
    this.setState({ polls, toast: true })
  }

  toggle = () => {
    this.setState({ toast: false })
  }

  render() {
    return (
      <Container className='my-5'>
        <div className='my-3'>
          <Toast isOpen={this.state.toast}>
            <ToastHeader toggle={this.toggle}>Message</ToastHeader>
            <ToastBody>Successfully Done</ToastBody>
          </Toast>
        </div>
        <Row>
          <Col md={4}>
            <Sidebar
              polls={this.performSearch()}
              selectPoll={this.selectPoll}
              handleSearch={this.handleSearch}
              searchTerm={this.state.searchTerm}
              addNewPoll={this.addNewPoll} />
          </Col>
          <Col md={8}>
            <MainContent
              poll={this.state.selectedPoll}
              getOpinion={this.getOpinion}
              deletePoll={this.deletePoll}
              updatePoll={this.updatePoll} />
          </Col>
        </Row>
        <Row>
          <Col>
            <MainOpinion
              poll={this.state.selectedPoll}
            />
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    )
  }

}
export default App