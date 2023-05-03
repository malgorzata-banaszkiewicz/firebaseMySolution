
import { getStudents } from '../../firebase/getStudents';
import db from '../../firebase/firebase.config'
import { onSnapshot, collection, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styles from '../../styles/styles.module.css'
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Student } from '../Student/Student';


export const Students = ({}) => {
  const [temporaryID, setTemporaryID] = useState(null);
  const getFormData = event => {
    event.preventDefault();
    const {studentID, firstName, lastName, grade, placeOfResidence, yearOfBirth } = event.currentTarget.elements
    const student = {
      id: Number(studentID.value),
      firstName: firstName.value,
      lastName: lastName.value,
      grade: Number(grade.value),
      placeOfResidence: placeOfResidence.value,
      yearOfBirth: Number(yearOfBirth.value),
    }
    event.currentTarget.reset();
    return student
  }


const handleSubmit = event => {
  addDoc(schoolCollection, getFormData(event))
}

const handleDelete = (id) => {
  confirm('Are you sure?');
  const studentRef = doc(schoolCollection, id);
  
  deleteDoc(studentRef);
};

const handleChange = async (e, id) => {
  const studentRef = doc(schoolCollection, id);
  try {
    await updateDoc(studentRef, getFormData(e));
  } catch (e) {
    console.log(e)
  }
  setTemporaryID(null)
};

    const [students, setStudents] = useState([]);
    const schoolCollection = collection(db, 'students');
    useEffect(() => {
        onSnapshot(schoolCollection, querySnapshot => {
          const students = getStudents(querySnapshot)
          setStudents(students)
        })
      }, [])
    return(
      
      <div className={styles.all}>
        <Outlet></Outlet>
        <form onSubmit={handleSubmit} className={styles.breathe}>
          <h2>Add a new student</h2>
          <div className={styles.breathe}>
            <label htmlFor="studentID">Student's ID: </label>
            <input type="text" name="studentID" id="studentID"></input>
          </div>
          <div className={styles.breathe}>
            <label htmlFor="firstName">Student's first name: </label>
            <input type="text" name="firstName" id="firstName"></input>
          </div>
          <div className={styles.breathe}>
            <label htmlFor="lastName">Student's last name: </label>
            <input type="text" name="lastName" id="lastName"></input>
          </div>
          <div className={styles.breathe}>
            <label htmlFor="grade">Student's grade: </label>
            <input type="text" name="grade" id="grade"></input>
          </div>
          <div className={styles.breathe}>
            <label htmlFor="placeOfResidence">Student's Place of residence: </label>
            <input type="text" name="placeOfResidence" id="placeOfResidence"></input>
          </div>
          <div className={styles.breathe}>
            <label htmlFor="yearOfBirth">Student's Year of birth: </label>
            <input type="text" name="yearOfBirth" id="yearOfBirth"></input>
          </div>
          <button className={styles.borderPink}>Add new student</button>
        </form>

        <h2 className={styles.important}>
            List of current students
        </h2>
        <div className={styles.students}>
          {students.map(({ id, studentID, firstName, lastName, grade, placeOfResidence, yearOfBirth}) => 
          (
            
          <div data-id={id} key={id}> 
            {temporaryID != `edit ${id}` ? (
            <table className={styles.table}>
              <thead className={styles.thead}> 
                <tr>
                  <th scope="column" colSpan={3}>STUDENT</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                <tr>
                  <td>Student ID:</td>
                  <td colSpan={2}>{studentID}</td>
                </tr>
                <tr>
                  <td>First Name:</td>
                  <td colSpan={2}>{firstName}</td>
                </tr>
                <tr>
                  <td>Last name:</td>
                  <td colSpan={2}>{lastName}</td>
                </tr>
                <tr>
                  <td>Grade:</td>
                  <td colSpan={2}>{grade}</td>
                </tr>
                <tr>
                  <td>Place of residence:</td>
                  <td colSpan={2}>{placeOfResidence}</td>
                </tr>
                <tr>
                  <td>Year of birth:</td>
                  <td colSpan={2}>{yearOfBirth}</td>
                </tr>
              </tbody>
              <tfoot >
                <tr>
                  <td className={styles.tfoot}>
                    <button onClick={() => handleDelete(id)} className={`${styles.delete}  ${styles.breathe}`}>Delete student</button>
                  </td>
                  <td className={styles.tfoot}>
                    <button onClick={() => setTemporaryID(`edit ${id}`)} className={`${styles.borderGrey} ${styles.breathe}`}>Edit student</button>
                  </td>
                  <td className={styles.tfoot}> 
                    <button className={`${styles.borderOrange} ${styles.breathe}`}>Details</button>
                  </td>
                </tr>
              </tfoot>
            </table>
            ) : (
            <form onSubmit={e => handleChange(e, id)} >
              <div>
                <label htmlFor="studentID">Student's ID:</label>
                <input type="text" name="studentID" id="studentID" defaultValue={studentID}></input>
              </div>
              <div>
                <label htmlFor="firstName">Student's first name:</label>
                <input type="text" name="firstName" id="firstName" defaultValue={firstName}></input>
              </div>
              <div>
                <label htmlFor="lastName">Student's last name:</label>
                <input type="text" name="lastName" id="lastName" defaultValue={lastName}></input>
              </div>
              <div>
                <label htmlFor="grade">Student's grade:</label>
                <input type="text" name="grade" id="grade" defaultValue={grade}></input>
              </div>
              <div>
                <label htmlFor="placeOfResidence">Student's Place of residence:</label>
                <input type="text" name="placeOfResidence" id="placeOfResidence" defaultValue={placeOfResidence}></input>
              </div>
              <div>
                <label htmlFor="yearOfBirth">Student's Year of birth:</label>
                <input type="text" name="yearOfBirth" id="yearOfBirth" defaultValue={yearOfBirth}></input>
              </div>
              <button type="submit">Confirm</button>
              <button type="button" onClick={() => setTemporaryID(null)}>Cancel</button>
            </form>
            )}
          </div>
          )
          )}
        </div>
      </div>
      
    )
}

