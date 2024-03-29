import Header from './components/Header'
import Footer from './components/Footer'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import HomeScreens from './screens/HomeScreens'
import ProductScreens from './screens/ProductScreens'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
const App=()=>{
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreens} exact></Route>
          <Route path='/product/:id' component={ProductScreens} exact></Route>
          <Route path='/login' component={LoginScreen}></Route>
          <Route path='/register' component={RegisterScreen}></Route>
          <Route path='/cart/:id' component={CartScreen}></Route>
          <Route path='/profile' component={ProfileScreen}></Route>
          {/* <Route path='/cart' component={CartScreen}></Route> */}
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
