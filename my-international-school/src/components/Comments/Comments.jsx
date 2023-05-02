import { onSnapshot, collection } from "firebase/firestore";
import { getStudents } from "../../firebase/getStudents";
import { useEffect, useState } from "react";
import db from '../../firebase/firebase.config';
import { nanoid } from 'nanoid';

export const Comments = ({className, children}) => {
    const id = nanoid();
    const [isCommented, setIsCommented] = useState([]);
    const schoolCollection = collection(db, 'comments');
    useEffect(() => {
        onSnapshot(schoolCollection, querySnapshot =>
           { const comments = getStudents(querySnapshot)
            setIsCommented(comments)
        }
            )
    }, []);
    return(
        <ul className={className}>
            {children}
            {isCommented.map (({comment, studentID}) => 
            (
                <li data-id={id} key={id}>student ID: {studentID}
                <p>Comment: {comment}</p>
                </li>
            )
            )}
        </ul>
    )
}