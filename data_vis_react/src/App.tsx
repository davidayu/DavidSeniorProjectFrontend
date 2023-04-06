import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserAnswersSummary from './components/UserAnswersSummary';
import { UserAnswer } from './types/Types';
import SliderAnswerGraph from './components/SliderAnswerGraph';

function App() {
  const [userAnswers, setUserAnswers] = useState<UserAnswer[] | null>();

  useEffect(() => {
    const url = 'http://127.0.0.1:8000/questionnaire_user_answers/36/72/';
    axios.get(url).then((response) => {
      setUserAnswers(response.data);
    });
  }, []);
  /*
  return <div className="App">{userAnswers ? userAnswers.map((userAnswer) => {
    return <UserAnswersSummary userAnswer={userAnswer} />;
  }) : null}</div>;
  */

  return <div className="App">{userAnswers ? <SliderAnswerGraph userAnswers={userAnswers} /> : null}</div>;

}

export default App;
