import { PathFeedback } from '../types/Types';
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

interface PathFeedbackGraphProps {
    pathFeedbacks: PathFeedback[];
}

export default function PathFeedbackGraph({pathFeedbacks}: PathFeedbackGraphProps) {
    
    const groupedData: { [key: string]: number[] } = pathFeedbacks.reduce((acc, answer) => {
        const conciseTimestamp = answer.timestamp.substring(0, 7);
        if (!acc[conciseTimestamp]) {
          acc[conciseTimestamp] = [];
        }
        acc[conciseTimestamp].push(answer.rating);
        return acc;
      }, {} as { [key: string]: number[] });
      
    const averagedData = Object.entries(groupedData).map(([timestamp, ratings]) => {
        const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
        return { timestamp, averageRating };
    });
    
    const timestamps = averagedData.map((data) => data.timestamp);
    const averageRatings = averagedData.map((data) => data.averageRating);
      
      

    const data = {
        labels: timestamps,
        datasets: [
          {
            label: 'Path Feedbacks',
            data: averageRatings,
            backgroundColor: 'aqua',
            borderColor: 'black',
            pointBorderColor: 'aqua',
            fill: true,
            tension: 0.4
          },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: "Path: " + pathFeedbacks[0].path_id,
                font: {
                    size: 30
                }
            } 
        },
        scales: {
            y: {
                min: 0,
                max: 10
            }
        },
    };

    return <Line
        data = {data}
        options = {options}
    ></Line>
}