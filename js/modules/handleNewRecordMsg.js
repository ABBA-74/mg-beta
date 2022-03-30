export function createNewRecordMsg() {
  const container = document.querySelector('.container');
  const elDiv = document.createElement('div');
  elDiv.id = 'new-record';
  const imgRecord = document.createElement('img');
  imgRecord.classList.add('new-record__img');
  imgRecord.src = './assets/img/record.svg';

  elDiv.appendChild(imgRecord);
  container.appendChild(elDiv);
}

export function displayNewRecordMsg() {
  const newRecord = document.getElementById('new-record');
  newRecord.style.display = 'block';
}
