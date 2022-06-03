//request 함수

const BASE_URL = `https://learn.codeit.kr/1999`;  //공통 url

//GET
//실습 서버에서 정렬한 데이터 받아오기
export async function getFoods({ order = 'createAt', cursor = '', limit = 10 }) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}`;
  const response = await fetch(
    `${BASE_URL}/foods?${query}`
  );
  if (!response.ok) { //에러가 발생할 경우
    throw new Error('데이터를 불러오는데 실패했습니다.');
  }
  const body = await response.json();
  return body;
}

//POST
//글 작성
export async function createFood(formData) {
  const response = await fetch(
    `${BASE_URL}/foods`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) { //에러가 발생할 경우
    throw new Error('데이터를 생성하는데 실패했습니다.');
  }
  const body = await response.json();
  return body;
}

//PUT
//글 수정
export async function updateFood(id, formData) {  //id값을 이용해서 수정할 글을 서버에 알려줌
  const response = await fetch(
    `${BASE_URL}/foods/${id}`, {
    method: 'PUT',
    body: formData,
  });
  if (!response.ok) { //에러가 발생할 경우
    throw new Error('데이터를 수정하는데 실패했습니다.');
  }
  const body = await response.json();
  return body;
}

//DELETE
//글 삭제
export async function deleteFood(id) {  //id값을 이용해서 삭제할 글을 서버에 알려줌
  const response = await fetch(
    `${BASE_URL}/foods/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('데이터를 삭제하는데 실패했습니다.');
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