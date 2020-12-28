import './App.css';
import Header from './components/layouts/header/Header';
import PaginatedGrid from './components/layouts/paginatedGrid/PaginatedGrid';
import Card from './components/layouts/card/Card';
import TermCard from './components/cards/termCard/TermCard';




function App() {

  let cards = [];
  cards.push(<TermCard course={"COMPSCI 161"} />)
  cards.push(<TermCard course={"COMPSCI 171"} />)
  cards.push(<TermCard course={"I&C SCI 33"} />)
  for (let i = 0; i < 10; i++) {
    cards.push(<Card>{i}</Card>)
  }

  console.log(cards);


  return (
    <div className="App">
      <Header />
      <div style={{height: '90vh'}}>
        <PaginatedGrid paginationOffset={0}>{cards}</PaginatedGrid>
      </div>
    </div>
  );
}

export default App;
