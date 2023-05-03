import { useEffect, useState } from "react";
import db from "../../firebase/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";
import { getStudents } from "../../firebase/getStudents";
import styles from '../../styles/styles.module.css'


export const Grades = ({className}) => {
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
        <div className={className}>
            {isEvaluated.map(({id, studentID, lessonName, grade1, grade2, grade3}) => (
            <div key={id}>
                <table className={styles.table}>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>Lesson:</td>
                            <td>{lessonName}</td>
                        </tr>
                        <tr>
                            <td>studentID:</td>
                            <td>{studentID}</td>
                        </tr>
                        <tr>
                            <td>Grades:</td>
                            <td>{grade1}, {grade2}, {grade3}</td>
                        </tr>
        
                    </tbody>
                    <tfoot></tfoot>
                </table>
                
         
            </div>
            ))}
           
        </div>
    )
}