import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserAnswersSummary from './components/UserAnswersSummary';
import { UserAnswer, PathFeedback } from './types/Types';
import SliderAnswerGraph from './components/SliderAnswerGraph';
import NumericAnswerGraph from './components/NumericAnswerGraph';
import TextAnswerTable from './components/TextAnswerTable';
import PathFeedbackGraph from './components/PathFeedbackGraph'; 

function App() {
  //const [userAnswers, setUserAnswers] = useState<UserAnswer[] | null>();
  const [pathFeedbacks, setPathFeedbacks] = useState<PathFeedback[] | null>();

  useEffect(() => {
    //const url = 'http://127.0.0.1:8000/questionnaire_user_answers/36/72/';
    //const url = 'http://127.0.0.1:8000/questionnaire_user_answers/1/72/';
    //const url = 'http://127.0.0.1:8000/questionnaire_user_answers/85/350/';
    const url = 'http://127.0.0.1:8000/path_feedback/123/'
    axios.get(url).then((response) => {
      //setUserAnswers(response.data);
      setPathFeedbacks(response.data);
    });
  }, []);
  /*
  return <div className="App">{userAnswers ? userAnswers.map((userAnswer) => {
    return <UserAnswersSummary userAnswer={userAnswer} />;
  }) : null}</div>;
  */
  /*
  return <div className="App">{userAnswers ? <SliderAnswerGraph userAnswers={userAnswers} /> : null}</div>;
  */
  /*
  return <div className="App">{userAnswers ? <NumericAnswerGraph userAnswers={userAnswers} /> : null}</div>;
  */
  /*
  return <div className="App">{userAnswers ? <TextAnswerTable userAnswers={userAnswers} /> : null}</div>;
  */
  return <div className="App">{pathFeedbacks ? <PathFeedbackGraph pathFeedbacks={pathFeedbacks} /> : null}</div>;
}

export default App;
