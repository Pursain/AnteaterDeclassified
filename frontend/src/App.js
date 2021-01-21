import './App.css';
import Header from './components/layouts/header/Header';
import PaginatedGrid from './components/layouts/paginatedGrid/PaginatedGrid';
import Card from './components/layouts/card/Card';
import TermCard from './components/cards/termCard/TermCard';
import ClassSizeCard from './components/cards/classSizeCard/ClassSizeCard';
import InstructorCard from './components/cards/instructorCard/InstructorCard';
import CourseCard from './components/cards/courseCard/CourseCard';



function App() {
  console.log(process.env.REACT_APP_BACKEND_DOMAIN);



  const TEMP_CLASS = "COMPSCI 161";

  let cards = [];
  cards.push(<CourseCard course={TEMP_CLASS} />)
  cards.push(<TermCard course={TEMP_CLASS} />)
  cards.push(<ClassSizeCard course={TEMP_CLASS} />)
  cards.push(<InstructorCard course={TEMP_CLASS} />)
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
