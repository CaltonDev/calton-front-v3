export default function formErrorHandling (payload, errorCode) {

  var wrongFields = []

  if (errorCode !== 400) {
    payload.map((item) => {
      const newField = {
        name: item?.loc[0],
        msg: formatErrorMessage(item?.msg),
        type: item?.type
      }

      wrongFields.push(newField)
    })
  }

  return wrongFields
}

// Put each words' initial letter to uppercase
const formatErrorMessage = (str) => {

  const arr = str.split(" ");

  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  return arr.join(" ");
}