import { useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './App.css';

const STEPS = {
  WELCOME: 'welcome',
  QUESTION: 'question',
  YES: 'yes',
};

const CONFETTI_COLORS = ['#8b2942', '#c97b8a', '#c9a962', '#e8dcc4', '#f5e1e4'];

function App() {
  const [step, setStep] = useState(STEPS.WELCOME);
  const [noClicks, setNoClicks] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleYes = () => {
    setStep(STEPS.YES);
    setShowConfetti(true);
  };

  const handleNo = () => {
    setNoClicks((c) => c + 1);
  };

  const noMessages = [
    "Are you sure? 😊",
    "Really? Try the other one!",
    "I'll ask again... how about Yes?",
    "← Yes is this way",
    "One more time... Yes? 💕",
  ];
  const noMessage = noMessages[Math.min(noClicks, noMessages.length - 1)];
  const noDisabled = noClicks >= 4;

  return (
    <>
      <SpeedInsights />
      {showConfetti && (
        <div className="confetti" aria-hidden>
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
              }}
            />
          ))}
        </div>
      )}

      {step === STEPS.YES && (
        <div className="hearts" aria-hidden>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="heart" style={{ top: `${20 + i * 8}%` }}>
              ❤️
            </span>
          ))}
        </div>
      )}

      <main className={`proposal step ${step === STEPS.YES ? 'celebration' : ''}`}>
        {step === STEPS.WELCOME && (
          <>
            <h1 className="proposal-heading">There's something I want to ask you</h1>
            <p className="proposal-sub">Whenever you're ready</p>
            <div className="cta-group">
              <button type="button" className="btn btn-primary" onClick={() => setStep(STEPS.QUESTION)}>
                Continue
              </button>
            </div>
          </>
        )}

        {step === STEPS.QUESTION && (
          <>
            <h1 className="proposal-heading">Will you be my Valentine?</h1>
            <p className="proposal-sub">Be mine 💕</p>
            <div className="cta-group">
              <button type="button" className="btn btn-primary" onClick={handleYes}>
                Yes!
              </button>
              <button type="button" className="btn btn-no" onClick={handleNo} disabled={noDisabled}>
                No
              </button>
            </div>
            {noClicks > 0 && <p className="sure-msg">{noMessage}</p>}
          </>
        )}

        {step === STEPS.YES && (
          <>
            <h1 className="proposal-heading">You said yes! 💕</h1>
            <p className="proposal-sub">Can't wait to be your Valentine.</p>
            <p className="proposal-sub">I love you ❤️</p>
          </>
        )}
      </main>
    </>
  );
}

export default App;
