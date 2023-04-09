import { Route,Routes,Outlet } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component'
import SignIn from './routes/sign-in/sign-in.component';
const Shop=()=>{

  return (
    <div>
      <div>
        <h1>This is shop bar</h1>
      </div>
      {/* <Outlet/> */}
    </div>
  )
}




const App=()=>{
 
 return(
  <Routes>
    <Route path='/' element={<Navigation/>}>
      <Route index element={<Home/>}/>
      <Route path='shop' element={<Shop/>}/>
      <Route path='signIn' element={<SignIn/>}/>
    </Route>
  </Routes>
 );
  // return <Home/>
};

export default App;