import { useState, useEffect } from 'react';
import { Navigate, Route,  Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { FooterMenu } from './components/FooterMenu/FooterMenu';
import { MainPage } from './components/MainPage/MainPage';
// import { Student } from './components/Student/Student';
import { Students } from './components/Students/Students';
import { Comments } from './components/Comments/Comments';
import { Grades } from './components/Grades/Grades';
import { Menu } from './components/Menu/Menu';
import styles from './styles/styles.module.css'
import { Auth } from './components/Auth/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase.config';

function App() {
  const [isAuth, setIsAuth] = useState(null)
  const [user, setUser] = useState(null)
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuth(true);
        setUser(user);
      } else {
        setIsAuth(false);
        setUser(null)
      }
    })
  }, []);

  if (isAuth === null) {
    return <h1>App is loading...</h1>
  }

  const menuSwitch = isSelected ? styles.menuChosen : styles.menuIdle;


  return (
    <div className="App">
      <Header>
        <Menu isAuth={isAuth} email={user?.email} nick={user?.nick}/>
          <Routes>
            <Route path='/' element={<MainPage></MainPage>} onClick={()=> {setIsSelected(true)}}>  
            </Route>
            <Route path='/auth' element={isAuth ? <Navigate to='/students'></Navigate> : <Auth></Auth>}></Route>
              <Route path='students' element={<Students></Students>}>
                {/* <Route path='auth/students/student' element={<Student></Student>}></Route> */}
              </Route>
              <Route path='comments' element={<Comments></Comments>}>
              </Route>
              <Route path='grades' element={<Grades></Grades>}>
              </Route>
            <Route path='students' element={!isAuth ? <Navigate to="/auth"></Navigate>: <Students></Students>}></Route>
          </Routes>
     </Header>
      <main>
      </main>
      <Footer>
        <FooterMenu ></FooterMenu>
      </Footer>
    </div>
  )
}

export default App
