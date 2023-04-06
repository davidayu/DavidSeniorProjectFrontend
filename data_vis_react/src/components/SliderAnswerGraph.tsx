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

interface SliderAnswerGraphProps {
    userAnswers: UserAnswer[];
}

export default function SliderAnswerGraph({userAnswers}: SliderAnswerGraphProps) {
    const timestamps = userAnswers.map((answer) => answer.timestamp);
    const sliderAnswers = userAnswers.map((answer) => answer.slider_answer);
    const data = {
        labels: timestamps,
        datasets: [
          {
            label: 'Slider Answers',
            data: sliderAnswers,
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
                min: 0,
                max: 100
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

return <div className="App">{userAnswers ? <SliderAnswerGraph userAnswers={userAnswers} /> : null}</div>;

in App.tsx
*/