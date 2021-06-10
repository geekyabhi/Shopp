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
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceorderScreen from './screens/PlaceorderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
const App=()=>{
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreens} exact></Route>
          <Route path='/page/:pageNumber' component={HomeScreens} exact></Route>
          <Route path='/search/:keyword' component={HomeScreens} exact></Route>
          <Route path='/search/:keyword/page/:pageNumber' component={HomeScreens} exact></Route>
          <Route path='/product/:id' component={ProductScreens} exact></Route>
          <Route path='/login' component={LoginScreen}></Route>
          <Route path='/register' component={RegisterScreen}></Route>
          <Route path='/cart'exact component={CartScreen}></Route>
          <Route path='/cart/:id' component={CartScreen}></Route>
          <Route path='/profile' component={ProfileScreen}></Route>
          <Route path='/shipping' component={ShippingScreen}></Route>
          <Route path='/payments' component={PaymentScreen}></Route>
          <Route path='/placeorder' component={PlaceorderScreen}></Route>
          <Route path='/orders/:id' component={OrderScreen}></Route>
          <Route path='/admin/userList' component={UserListScreen}></Route>
          <Route path='/admin/users/:id/edit' component={UserEditScreen}></Route>
          <Route path='/admin/productList' component={ProductListScreen} exact></Route>
          <Route path='/admin/productList/:pageNumber' component={ProductListScreen} exact></Route>
          <Route path='/admin/products/:id/edit' component={ProductEditScreen}></Route>
          <Route path='/admin/orderList' component={OrderListScreen}></Route>
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
