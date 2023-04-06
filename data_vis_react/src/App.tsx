import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export type UserAnswer = {
  text_answer: string | null;
  slider_answer: number | null;
  numeric_answer: number | null;
  timestamp: string;
};

function App() {
  const [userAnswers, setUserAnswers] = useState<UserAnswer[] | null>();

  useEffect(() => {
    const url = 'http://127.0.0.1:8000/questionnaire_user_answers/36/72/';
    axios.get(url).then((response) => {
      setUserAnswers(response.data);
    });
  }, []);
  return <div className="App">{userAnswers ? userAnswers.map((userAnswer) => {
    return <p>{userAnswer.timestamp + ", " + userAnswer.text_answer + ", " + userAnswer.slider_answer + ", " + userAnswer.numeric_answer}</p>
  }) : null}</div>;

}

export default App;
