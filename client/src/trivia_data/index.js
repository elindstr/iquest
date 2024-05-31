import { data as mod1 } from '../trivia_data/mod1';
import { data as mod2 } from '../trivia_data/mod2';
import { data as mod3 } from '../trivia_data/mod3';
import { data as mod4 } from '../trivia_data/mod4';
import { data as mod5 } from '../trivia_data/mod5';
import { data as mod6 } from '../trivia_data/mod6';
import { data as mod9 } from '../trivia_data/mod9';
import { data as mod10 } from '../trivia_data/mod10';
import { data as mod11 } from '../trivia_data/mod11';
import { data as mod12 } from '../trivia_data/mod12';
import { data as mod13 } from '../trivia_data/mod13';
import { data as mod14 } from '../trivia_data/mod14';
import { data as mod17 } from '../trivia_data/mod17';
import { data as mod18 } from '../trivia_data/mod18';
import { data as mod19 } from '../trivia_data/mod19';
import { data as mod20 } from '../trivia_data/mod20';
import { data as mod21 } from '../trivia_data/mod21';
import { data as mod22 } from '../trivia_data/mod22';
import { data as es6 } from '../trivia_data/es6';
import { data as advancedServers } from '../trivia_data/advancedServers';

const bootcampTrivia = {
  "response_code": 0,
  "results": [
    ...mod1,
    ...mod2,
    ...mod3,
    ...mod4,
    ...mod5,
    ...mod6,
    ...mod9,
    ...mod10,
    ...mod11,
    ...mod12,
    ...mod13,
    ...mod14,
    ...mod17,
    ...mod18,
    ...mod19,
    ...mod20,
    ...mod21,
    ...mod22,
    ...es6,
    ...advancedServers,
  ]
};

export default bootcampTrivia;
