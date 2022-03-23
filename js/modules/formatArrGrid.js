export default function formatArrGrid(arr_origin, gridLength) {
  let arr1 = [];
  let arr2 = [];
  let cardFront = {};

  // Create arr with of image / half size of grid cards nb
  while (Object.keys(cardFront).length === 0) {
    let val = Math.floor(Math.random() * arr_origin.length);
    if (!arr1.includes(arr_origin[val])) {
      if (arr1.length < gridLength) {
        arr1.push(arr_origin[val]);
      } else {
        cardFront = arr_origin[val];
      }
    }
  }

  // Create arr2 with duplicate image from arr1
  for (let i = 0; i < arr1.length; i++) {
    arr2.push(arr1[i]);
    arr2.push(arr1[i]);
  }

  // Flush arr
  for (let j = 0; j < arr2.length; j++) {
    let val = Math.floor(Math.random() * arr2.length);
    let tmp = arr2[val];
    arr2[val] = arr2[j];
    arr2[j] = tmp;
  }

  return [arr2, cardFront];
}
