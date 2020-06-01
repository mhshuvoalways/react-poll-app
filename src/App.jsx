import React from 'react';
import shortid from 'shortid'
import { Container, Row, Col } from 'reactstrap'
import POLLS from './data/polls'
import MainContent from './components/main-content/index'
import Sidebar from './components/sidebar/index'

class App extends React.Component {
  state = {
    polls: [],
    selectedPoll: {},
    searchTerm: ''
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
    this.setState({ polls: this.state.polls.concat(poll) })
  }

  updatePoll = updatePoll => {
    const polls = [...this.state.polls]
    const poll = polls.find(pol => pol.id === updatePoll.id)

    poll.title = updatePoll.title
    poll.description = updatePoll.description
    poll.options = updatePoll.options

    this.setState({ polls })
  }

  deletePoll = pollId => {
    const polls = this.state.polls.filter(poll => poll.id !== pollId)
    this.setState({
      polls,
      selectedPoll: {}
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
      id: shortid.generate(),
      name: response.name,
      selectedOption: response.selectedOption
    }

    poll.opinions.push(opinion)
    this.setState({ polls })
  }

  render() {
    console.log(this.state);

    return (
      <Container className='my-5'>
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
      </Container>
    )
  }

}
export default App