import {UserAnswer} from '../types/Types';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface TextAnswerTableProps {
    userAnswers: UserAnswer[];
}

export default function TextAnswerTable({ userAnswers }: TextAnswerTableProps): JSX.Element {

    const [questionText, setQuestionText] = useState<string>();

    useEffect(() => {
        const url = 'http://127.0.0.1:8000/question_text/' + userAnswers[0].question + '/';
        axios.get(url).then((response) => {
            console.log(response);
            setQuestionText(response.data.text);
        });
    }, []);

    const sortedUserAnswers = userAnswers.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    return (
      <div>
        <h2>User: {userAnswers[0].user}; Question: {questionText}</h2>
        <table className="text-answer-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Text Answer</th>
            </tr>
          </thead>
          <tbody>
            {sortedUserAnswers.map((answer) => (
              <tr key={answer.timestamp}>
                <td>{answer.timestamp}</td>
                <td>{answer.text_answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

/*
Call using 

return <div className="App">{userAnswers ? <TextAnswerTable userAnswers={userAnswers} /> : null}</div>;

in App.tsx

*/