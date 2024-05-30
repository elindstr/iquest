const getNewIQ = (initialIQ, quizResult) => {
  const exp60 = .1      // at IQ <60, we expect 10%
  const exp120 = .5     // at IQ =120, we expect 50%
  const exp200 = .8     // at IQ >200, we expect 80%
  const scoreRateChange = .3 // how quickly the IQ can change

  function expectedPerformance(iq) {
    if (iq <= 60) return exp60;    
    if (iq >= 200) return exp200;   
    if (iq <= 120) {             // in between = linear function
       return exp60 + ((iq - 60) / (120 - 60)) * (exp120 - exp60);
    } else {
      return exp120 + ((iq - 120) / (200 - 120)) * (exp200 - exp120);
    }
  }
  const expectedScore = expectedPerformance(initialIQ);
  const adjustmentFactor = 1 + (quizResult - expectedScore) * scoreRateChange; 
  const newIQ = initialIQ * adjustmentFactor;


  console.log(  `old iq: ${initialIQ}; 
                expectedScore: ${expectedScore};
                actualScore: ${quizResult};
                new iq: ${newIQ}`)
  return newIQ;
}

export default getNewIQ;
