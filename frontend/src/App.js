import Header from './components/Header'
import Footer from './components/Footer'
import {Container} from 'react-bootstrap'
import HomeScreens from './screens/HomeScreens'
const App=()=>{
  return (
    <>
    <Header></Header>
    <main className="py-3">
      <Container>
        <HomeScreens></HomeScreens>
      </Container>
    </main>
    <Footer></Footer>
    </>
  );
}

export default App;
