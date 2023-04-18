import { UserAnswer } from '../types/Types';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, // x axis
    LinearScale, // y axis
    PointElement,
    Title
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title
)

interface NumericAnswerGraphProps {
    userAnswers: UserAnswer[];
}

export default function NumericAnswerGraph({userAnswers}: NumericAnswerGraphProps) {
    const timestamps = userAnswers.map((answer) => answer.timestamp);
    const numericAnswers = userAnswers.map((answer) => answer.numeric_answer);
    const data = {
        labels: timestamps,
        datasets: [
          {
            label: 'Numeric Answers',
            data: numericAnswers,
            backgroundColor: 'aqua',
            borderColor: 'black',
            pointBorderColor: 'aqua',
            fill: true,
            tension: 0.4
          },
        ],
    };

    const [questionText, setQuestionText] = useState<string>();

    useEffect(() => {
        const url = 'http://127.0.0.1:8000/question_text/' + userAnswers[0].question + '/';
        axios.get(url).then((response) => {
            console.log(response);
            setQuestionText(response.data.text);
        });
    }, []);
    
    const filteredNumericAnswers = numericAnswers.filter(answer => answer !== null) as number[];
    const minNumericAnswer = Math.floor(Math.min(...filteredNumericAnswers) / 10) * 10;
    const maxNumericAnswer = Math.ceil(Math.max(...filteredNumericAnswers) / 10) * 10;

    const options = {
        plugins: {
            title: {
                display: true,
                text: "User: " + userAnswers[0].user + "; Question: " + questionText,
                font: {
                    size: 30
                }
            } 
        },
        scales: {
            y: {
                min: minNumericAnswer,
                max: maxNumericAnswer
            }
        },
    };

    return <Line
        data = {data}
        options = {options}
    ></Line>
}

/*
Call using

return <div className="App">{userAnswers ? <NumericAnswerGraph userAnswers={userAnswers} /> : null}</div>;

in App.tsx
*/