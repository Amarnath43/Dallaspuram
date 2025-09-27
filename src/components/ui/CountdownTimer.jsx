import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
    // A function to calculate the time difference.
    // It will be called every second.
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    // Use useState to store and update the time left
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        // Set up a timer that updates every second (1000ms)
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // This is a cleanup function that runs when the component is unmounted
        // It's crucial for preventing memory leaks!
        return () => clearTimeout(timer);
    }); // No dependency array, so it runs on every render

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval] && timeLeft[interval] !== 0) {
            return;
        }

        timerComponents.push(
            <div key={interval} className="text-center">
                <span className="text-4xl md:text-6xl font-extrabold text-orange-500">
                    {/* Add a leading zero if the number is less than 10 */}
                    {String(timeLeft[interval]).padStart(2, '0')}
                </span>
                <span className="block text-sm md:text-base uppercase text-gray-300">
                    {interval}
                </span>
            </div>
        );
    });
    
    // Render the timer if components exist, otherwise show a launch message
    return (
        <div className="flex justify-center gap-4 md:gap-8 my-8">
            {timerComponents.length ? timerComponents : <span className="text-3xl font-bold text-green-400">We're Open! Welcome In!</span>}
        </div>
    );
};

export default CountdownTimer;