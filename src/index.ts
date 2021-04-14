import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import slack from './services/slack';

const run = async () => {
  const slackResult = await slack.retrieveInformation();
  fs.writeFile(
    './stastics/slack.json',
    JSON.stringify(slackResult),
    (error) => {
      console.log(error);
    }
  );
};

run();
