import React from 'react';

const LightEffects = () => {
  return (
    <>
      <style>{`
        @keyframes float-left {
          0%, 100% {
            left: -150px;
            top: 5%;
            opacity: 0.7;
          }
          50% {
            left: -50px;
            top: 15%;
            opacity: 0.9;
          }
        }

        @keyframes float-right {
          0%, 100% {
            right: -150px;
            top: 5%;
            opacity: 0.7;
          }
          50% {
            right: -50px;
            top: 15%;
            opacity: 0.9;
          }
        }

        @keyframes float-bottom-left {
          0%, 100% {
            left: -100px;
            bottom: -100px;
            opacity: 0.6;
          }
          50% {
            left: 0px;
            bottom: -50px;
            opacity: 0.8;
          }
        }

        @keyframes float-bottom-right {
          0%, 100% {
            right: -100px;
            bottom: -100px;
            opacity: 0.6;
          }
          50% {
            right: 0px;
            bottom: -50px;
            opacity: 0.8;
          }
        }

        @keyframes pulse-size {
          0%, 100% {
            filter: blur(60px);
            transform: scale(1);
          }
          50% {
            filter: blur(80px);
            transform: scale(1.2);
          }
        }

        /* TOP LEFT CORNER */
        .light-top-right {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, rgba(249, 115, 22, 0.25) 40%, transparent 70%);
          border-radius: 50%;
          animation: float-right 10s ease-in-out infinite, pulse-size 5s ease-in-out infinite;
          pointer-events: none;
        }

        /* BOTTOM RIGHT CORNER */
        .light-bottom-left {
          position: absolute;
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.45) 0%, rgba(249, 115, 22, 0.2) 40%, transparent 70%);
          border-radius: 50%;
          animation: float-bottom-left 9s ease-in-out infinite, pulse-size 5.5s ease-in-out infinite;
          pointer-events: none;
        }

        /* CENTER GLOW */
        .light-center {
          position: absolute;
          width: 800px;
          height: 800px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(249, 115, 22, 0.2) 0%, rgba(220, 38, 38, 0.1) 50%, transparent 70%);
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.6;
          animation: pulse-size 7s ease-in-out infinite;
          pointer-events: none;
        }
      `}</style>

      {/* Light Effects Container - Absolute positioned */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        {/* TOP LEFT RED LIGHT */}
        <div className="light-top-left"></div>

        {/* TOP RIGHT ORANGE LIGHT */}
        <div className="light-top-right"></div>

        {/* BOTTOM LEFT ORANGE LIGHT */}
        <div className="light-bottom-left"></div>

        {/* BOTTOM RIGHT RED LIGHT */}
        <div className="light-bottom-right"></div>

        {/* CENTER GLOW */}
        <div className="light-center"></div>
      </div>
    </>
  );
};

export default LightEffects;