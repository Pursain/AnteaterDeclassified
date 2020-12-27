import './App.css';
import Header from './components/layouts/header/Header';
import PaginatedGrid from './components/layouts/paginatedGrid/PaginatedGrid';
import Card from './components/layouts/card/Card';



function App() {

  let cards = [];
  for (let i = 0; i < 10; i++){
    cards.push(<Card>{i}</Card>)
  }

  console.log(cards);


  return (
    <div className="App">
      <Header/>
      <div style={{height: 800}}>
        <PaginatedGrid cards={cards} paginationOffset={1}/>
      </div>
    </div>
  );
}

export default App;
