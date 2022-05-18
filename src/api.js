//request 함수
//실습 서버에서 정렬한 데이터 받아오기
export async function getFoods(order = '') {
  const query = `order=${order}`;
  const response = await fetch(
    `https://learn.codeit.kr/1999/foods?${query}`
  );
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