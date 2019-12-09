

const selectedItem = (selectItemId, arrayCase) => {
let item = -1;
let array = arrayCase;
function logArrayElements(element, index, array) {
 if (element.id == selectItemId){
  item = index;
 }
}
array.forEach(logArrayElements);
return item
}

export default selectedItem