import { useEffect, useState } from "react";
import db from "../../firebase/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";
import { getStudents } from "../../firebase/getStudents";
import { nanoid } from 'nanoid';

export const Grades = ({className}) => {
    const id = nanoid();
    const [isEvaluated, setIsEvaluated] = useState([]);
    const gradesCollection = collection(db, 'grades');
    useEffect(() => {
        onSnapshot(gradesCollection, querySnaphot => 
            {
                const grades = getStudents(querySnaphot)
                setIsEvaluated(grades)
            }
            )
    }, []);
    return(
        <ul className={className}>
            {isEvaluated.map(({studentID, lessonName, grade1, grade2, grade3}) => (
            <li key={id}>studentID: {studentID}
            <p>Lesson: {lessonName}</p>
            <p>Grades: {grade1}, {grade2}, {grade3}</p>
            </li>
            ))}
           
        </ul>
    )
}