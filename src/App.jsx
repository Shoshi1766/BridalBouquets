import viteLogo from '/vite.svg'
import './App.css'
import FlowerList from './pages/FlowerList'
import Cart from './pages/Cart'
import { Route, Routes } from 'react-router'
import SignUp from './pages/SignUp'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import AddNewItem from './pages/AddNewItem'
import CheckOut from './pages/CheckOut'
import FlowerBig from './components/FlowerBig'
import LogOutButton from './components/LogOutButton'
import { ThemeProvider } from "@mui/material/styles";
import theme from "./style/theme.js";
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userIn } from './features/userSlice'

function App() {

  let dispatch = useDispatch();
  useEffect(() => {

    let user = localStorage.getItem("currentUser")
    dispatch(userIn(JSON.parse(user)));

  }, [])
  return (
    <ThemeProvider theme={theme}>

      <>
        <NavBar />
        <Routes>
          <Route path='signUp' element={<SignUp />} />
          <Route path='checkOut' element={<CheckOut />} />
          <Route path='login' element={<Login />} />
          <Route path='logOut' element={<LogOutButton />} />
          <Route path='home' element={<FlowerList />}>
            <Route path='flowerBig/:id' element={<FlowerBig />} />
          </Route>
          <Route path='cart' element={<Cart />} />
          <Route path="addNewItem" element={<AddNewItem />} />
          <Route path="addNewItem/:id" element={<AddNewItem />} />
          <Route path='*' element={<FlowerList />} />
        </Routes>
      </>
    </ThemeProvider>

  )
}

export default App
