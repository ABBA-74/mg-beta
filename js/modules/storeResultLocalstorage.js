/////////////////////////////////////////////////////////////////////////
//////////// storeResultLocalstorage
import {
  createNewRecordMsg,
  displayNewRecordMsg,
} from './handleNewRecordMsg.js';
import formatDateTime from './formatDateTime.js';
console.log('inside local');

export default function storeResultLocalstorage(
  delay,
  timerValue,
  nbRound,
  maxCard,
  arrOptionGame,
  audioNewRecord,
  audioComplete
) {
  audioNewRecord.crossOrigin = 'anonymous';
  audioComplete.crossOrigin = 'anonymous';

  let resumGame = [];
  let scoreCurrentLevel = [];
  let isNewRecord = false;
  console.log(formatDateTime());
  formatDateTime();
  const [dateToday, time] = formatDateTime();
  const elapsedTime = delay - timerValue;
  const optionGameChoosen = arrOptionGame.filter(
    (item) => item.maxCard === maxCard
  );
  const level = optionGameChoosen[0].level;
  // Retrieve the object from storage if existing
  let dataFromLocalStorage = localStorage.getItem('resumGame');

  if (dataFromLocalStorage !== null) {
    resumGame = JSON.parse(dataFromLocalStorage);
    // Push new result to resumGame from localStorage
    resumGame.push({
      dateToday: dateToday,
      time: time,
      level: level,
      elapsedTime: elapsedTime,
      nbRound: nbRound,
    });
    // Filter and return array of current level played
    scoreCurrentLevel = resumGame.filter((item) => item.level === level);
    isNewRecord = scoreCurrentLevel.every((item) => {
      return item.elapsedTime >= elapsedTime;
    });
    console.log('IS NEW RECORD /// ', isNewRecord);
    if (isNewRecord) {
      createNewRecordMsg();
      displayNewRecordMsg();
      audioNewRecord.play();
    }
  } else {
    resumGame = [
      {
        dateToday: dateToday,
        time: time,
        level: level,
        elapsedTime: elapsedTime,
        nbRound: nbRound,
      },
    ];
  }

  // Play sound end game
  if (!isNewRecord) {
    audioComplete.play();
  }
  // Put the object into storage
  localStorage.setItem('resumGame', JSON.stringify(resumGame));
  // Retrieve the object from storage
  let retrievedObject = localStorage.getItem('resumGame');
  console.log('resumGame: ', JSON.parse(retrievedObject));
}
