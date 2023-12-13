import { useEffect, useState } from 'react';
import Footer from './components/footer/Footer.jsx';
import Header from './components/header/Header';
import { useDispatch } from "react-redux";
// import env_config from './env_config/env_config';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Outlet } from "react-router-dom"

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_COLLECTION_ID);
  const [loding, setLoding] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.GetCurrentUser()
      .then((res) => {
        if (res) {
          dispatch(login(res))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => {
        setLoding(false)
      })

  }, [dispatch])

  return (
    <>
      <Header />
      {!loding ?
        <main>
          <Outlet />
        </main>
        :
        <div>Wait for Moment</div>
      }
      <Footer />
    </>
  )
}

export default App
