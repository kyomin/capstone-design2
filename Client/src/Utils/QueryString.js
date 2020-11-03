// query string 문자열을 파싱하는 함수 (객체화해서 반환)

export const getParams = (str) => {
  const params = {};
  const keyValPairs = str.split("?")[1] && str.split("?")[1].split("&");

  if (keyValPairs !== undefined) {
    for (var i = 0; i < keyValPairs.length; i++) {
      params[keyValPairs[i].split("=")[0]] = decodeURI(
        keyValPairs[i].split("=")[1],
        "UTF-8"
      );
    }
  }
  
  return params;
}