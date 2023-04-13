import { Route,Routes,Outlet } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component'
import Authentication from './routes/authentication/authentication.component';
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
      <Route path='signIn' element={<Authentication/>}/>
    </Route>
  </Routes>
 );
  // return <Home/>
};

export default App;