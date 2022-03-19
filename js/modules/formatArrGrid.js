export default function formatArrGrid(arr_origin, gridLength) {
  let arr1 = [];
  let arr2 = [];

  // Create arr with of image / half size of grid cards nb
  while (arr1.length < gridLength) {
    let val = Math.floor(Math.random() * arr_origin.length);
    if (!arr1.includes(arr_origin[val])) arr1.push(arr_origin[val]);
  }

  // Create arr with 'doubblon' of arr1
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
  // console.log("arr 2 mélangé: ", arr2);
  return arr2;
}
