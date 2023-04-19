import { useState, useEffect } from 'react'
import './App.css'
import db from './firebase/firebase.config'
import { onSnapshot, collection, getDocs } from 'firebase/firestore';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


function App() {
  const [students, setStudents] = useState([]);
  const schoolCollection = collection(db, 'students');
  console.log(db);

  const getStudents = querySnapshot => {
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  useEffect(() => {
    onSnapshot(schoolCollection, querySnapshot => {
      const students = getStudents(querySnapshot)
      setStudents(students)
    })
  }, [])

  useEffect(()=> {
    document.title = pageTitles[currentPage]
  }, [currentPage]);

  const router = createBrowserRouter([ 
    {
      path: '/',
      element: <MainPage></MainPage>,
    },
    {
      path: '/students',
      element: <Students></Students>,
    },
    {
      path: '/students/:id',
      element: <Student></Student>,
    },
    {
      path: '/comments',
      element: <Comments></Comments>,
    },
    {
      path: '/grades',
      element: <Grades></Grades>,
    }

])

  return (
    <div className="App">
      <Header>
        <Menu></Menu>
      </Header>
      <main>
        <RouterProvider router = {router}></RouterProvider>
      </main>
      <Footer>
        <FooterMenu></FooterMenu>
      </Footer>
     
      My International School
      <ul>
        {students.map(({ id, firstName, lastName, grade, placeOfResidence, yearOfBirth}) => 
        (
          <li data-id={id} key={id}> 
          <p>First Name: {firstName}</p>
          <p>Last name: {lastName}</p>
          <p>Grade: {grade}</p>
          <p>Place of residence: {placeOfResidence}</p>
          <p>Year of birth: {yearOfBirth}</p>
          </li>
        )
        )}
      </ul>
      
    </div>
  )
}

export default App
