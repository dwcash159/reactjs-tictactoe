import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';

const Navigation = () => {
  return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand href="#home">TicTacToe</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto" style={{'textAlign':'left'}}>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/home">Stats</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
  );
}

export default Navigation;

function Square(props) {
  return (

      <div className="square-wrapper">
        <div className="square-placeholder"> </div>
        <div className="square-outer">
          <button className="square" onClick={props.onClick}>
            {props.value}
          </button>
        </div>
      </div>

  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
          className="square"
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (

        <Container fluid className="button-spacing">
          <Row className="board-row">
            <Col>
              {this.renderSquare(0)}
            </Col>
            <Col>
              {this.renderSquare(1)}
            </Col>
            <Col>
              {this.renderSquare(2)}

            </Col>

          </Row>
          <Row className="board-row">
            <Col>
              {this.renderSquare(3)}
            </Col>
            <Col>
              {this.renderSquare(4)}
            </Col>
            <Col>
              {this.renderSquare(5)}
            </Col>

          </Row>
          <Row className="board-row">
            <Col>
              {this.renderSquare(6)}
            </Col>
            <Col>
              {this.renderSquare(7)}
            </Col>
            <Col>
              {this.renderSquare(8)}
            </Col>
          </Row>
        </Container>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      const first = ( move === 0) ? 'primary' : 'secondary';
      return (
        <ListGroupItem key={move}>
          <Button variant={first} onClick={() => this.jumpTo(move)}>{desc}</Button>
        </ListGroupItem>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (

        <div className="game">
          <Navigation/>
          <h2 className="mt-1">{status}</h2>
          <Container fluid>
            <Row className="pt-3">
              <Col sm>
                <div className="game-board">
                  <Board
                      squares={current.squares}
                      onClick={(i) => this.handleClick(i)}
                  />
                </div>
                </Col>
                <Col sm>
                <div className="game-info">
                  <ListGroup>{moves}</ListGroup>
                </div>
              </Col>
            </Row>
          </Container>

        </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
