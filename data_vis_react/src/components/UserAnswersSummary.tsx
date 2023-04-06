import {UserAnswer} from '../types/Types';

export type AppProps = {
    userAnswer : UserAnswer;
}

export default function UserAnswersSummary({userAnswer}: AppProps) : JSX.Element {
    return <p>{userAnswer.timestamp + ", " + userAnswer.text_answer + ", " + userAnswer.slider_answer + ", " + userAnswer.numeric_answer}</p>
}