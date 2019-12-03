// 아래를 상단에 import 한다.
// import * as constants from 'constants.js';

// 백엔드 주소 앞부분은 전부 `${constants.URL_BACK}` 으로 통일해주면 된다.
// 이렇게 설정한 후 constants.js 상에서의 주소를 변경해주면 자동으로 모든 곳에서 변경된다.
// 이는 클라우드 서버의 환경이 수시로 변동될 경우 한 번에 변경할 수 있도록 편의성을 제공한다.

export const URL_BACK = 'http://13.125.245.110:3000';