//request 함수
//실습 서버에서 정렬한 데이터 받아오기
export async function getFoods({ order = 'createAt', cursor = '', limit = 10 }) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}`;
  const response = await fetch(
    `https://learn.codeit.kr/1999/foods?${query}`
  );
  if (!response.ok) { //에러가 발생할 경우
    throw new Error('데이터를 불러오는데 실패했습니다.');
  }
  const body = await response.json();
  return body;
}

/*

  ▼foods: [{createdAt: 1625433571000, updatedAt: 1625433571000, id: 15, title: "자두",…},…]
    ▶0:
    ▶1:
    ...
  ▼paging: {count: 30, nextCursor: "LGNyZWF0ZWRBdCwyMw=="}
    ▶count: 30
    ▶nextCursor: "LGNyZWF0ZWRBdCwyMw=="

*/