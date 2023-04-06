import { UserAnswer } from '../types/Types';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, // x axis
    LinearScale, // y axis
    PointElement
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
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
    
    const options = {
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