import Header from './components/Header'
import Footer from './components/Footer'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import HomeScreens from './screens/HomeScreens'
import ProductScreens from './screens/ProductScreens'
const App=()=>{
  return (
    <Router>
    <Header></Header>
    <main className="py-3">
      <Container>
        <Route path='/' component={HomeScreens} exact></Route>
        <Route path='/products/:id' component={ProductScreens} exact></Route>
      </Container>
    </main>
    <Footer></Footer>
    </Router>
  );
}

export default App;
