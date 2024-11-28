function truncateString(myString, maxLength){
  if(myString.length > maxLength){
    return myString.substring(0, maxLength - 3 ) + '...';
  }
  else {
    return myString;
  }
}

export default truncateString;