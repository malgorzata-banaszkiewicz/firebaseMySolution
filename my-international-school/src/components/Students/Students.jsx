import { getStudents } from '../../firebase/getStudents';
import db from '../../firebase/firebase.config'
import { onSnapshot, collection, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import { useEffect, useState } from 'react';


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
  const studentRef = doc(schoolCollection, id);
  deleteDoc(studentRef)
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
      <>
      <form onSubmit={handleSubmit}>
        Add a new student
        <div>
          <label htmlFor="studentID">Student's ID:</label>
            <input type="text" name="studentID" id="studentID"></input>
        </div>
        <div>
          <label htmlFor="firstName">Student's first name:</label>
          <input type="text" name="firstName" id="firstName"></input>
        </div>
        <div>
          <label htmlFor="lastName">Student's last name:</label>
          <input type="text" name="lastName" id="lastName"></input>
        </div>
        <div>
          <label htmlFor="grade">Student's grade:</label>
          <input type="text" name="grade" id="grade"></input>
        </div>
        <div>
          <label htmlFor="placeOfResidence">Student's Place of residence:</label>
          <input type="text" name="placeOfResidence" id="placeOfResidence"></input>
        </div>
        <div>
          <label htmlFor="yearOfBirth">Student's Year of birth:</label>
          <input type="text" name="yearOfBirth" id="yearOfBirth"></input>
        </div>
        <button>Add new student</button>
      </form>
        <ul>
        {students.map(({ id, studentID, firstName, lastName, grade, placeOfResidence, yearOfBirth}) => 
        (
          <li data-id={id} key={id}> 
          {temporaryID != `edit ${id}` ? (
            <>
          <p>Student ID: {studentID}</p>
          <p>First Name: {firstName}</p>
          <p>Last name: {lastName}</p>
          <p>Grade: {grade}</p>
          <p>Place of residence: {placeOfResidence}</p>
          <p>Year of birth: {yearOfBirth}</p>
          <button onClick={() => handleDelete(id)}>Delete student</button>
          <button onClick={() => setTemporaryID(`edit ${id}`)}>Edit student</button>
          </>
          ) : (
            <form onSubmit={e => handleChange(e, id)}>
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
          </li>
        )
        )}
      </ul>
      </>
    )
}