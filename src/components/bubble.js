import React, { useEffect, useState } from 'react';

const BubblesApp = () => {
  const [currentBubble, setCurrentBubble] = useState(null);
  const [initialText, setInitialText] = useState('Welcome to the Random Wise thoughts!'); // Set your initial text here

  useEffect(() => {
    const eventSource = new EventSource('https://truth.hopertz.me/events');

    eventSource.onmessage = (event) => {
      const data = event.data; 
      setCurrentBubble(data);

      setTimeout(() => {
        setCurrentBubble(null);
      }, 5000);
    };

    // Clear the initial text after a certain duration
    setTimeout(() => {
      setInitialText(null);
    }, 2000); // Change the duration as desired

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      {currentBubble && (
        <div className="bubble">
          {currentBubble}
        </div>
      )}

      {initialText && (
        <div className="initial-text">
          {initialText}
        </div>
      )}

      <style jsx>{`
        .bubble {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 10px 20px;
          border: 1px solid #ccc;
          border-radius: 20px;
          background-color: #f2f2f2;
          opacity: 1;
          animation: bubbleEnter 1s ease-in-out forwards;
          transition: opacity 1s ease-in-out;
        }

        .initial-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
          text-align: center;
          background-color: #f2f2f2;
          padding: 10px 20px;
          border-radius: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          color: #333;
        }

        @keyframes bubbleEnter {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default BubblesApp;
