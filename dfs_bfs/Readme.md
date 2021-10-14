# BFS&DFS JS로 구현하기

## 1. BFS : 너비 우선 탐색

### 1-1.필요한 자료구조

- 큐 (선입선출)
  1. 일반 배열을 큐처럼 이용
  2. 삽입 연산 : push
  3. 삭제 연산 : shift

### 1-2. 풀이 흐름

0. 전제 ) 깊이 찾기보다 넓게 찾음 -> 최단 경로 찾기와 비슷

1. 시작 노드를 큐에 넣고 방문 처리
2. 큐에서 노드 꺼내고, 꺼낸 노드의 인접 노드 중 방문하지 않은 노드를 모두 큐에 삽입하고 방문 처리
3. 2의 과정 수행할 수 없을 때까지(큐가 빌 때까지 반복)

### 1-3. 구현 방식

```javascript
// 각 노드 연결 정보, 첫번째 노드부터 보고자 배열 첫째항은 비워둔다.
const graph = [
  [],
  [2, 3, 8],
  [1, 7],
  [1, 4, 5],
  [3, 5],
  [3, 4],
  [7],
  [2, 6, 8],
  [1, 7],
];
// 방문 정보 -> 전체 다 false로 초기화
const visited = new Array(graph.length).fill(false);

//bfs 함수
const bfs = (graph, v, visited) => {
  // 큐에 첫 원소 집어넣음
  const queue = [v];
  // 현재 노드 방문
  visited[v] = true;

  // 큐가 빌 때까지 반복
  while (queue.length !== 0) {
    // 큐에서 원소 한 개 뽑아옴
    const node = queue.shift();
    // 방문
    console.log(node);

    // 원소의 인접 노드 탐색
    graph[node].forEach((i) => {
      // 방문한 적이 없다면
      if (!visited[i]) {
        // 큐에 추가
        queue.push(i);
        // 방문 처리
        visited[i] = true;
      }
    });
  }
};

// 호출
bfs(graph, 1, visited);
```

## 2. DFS : 깊이 우선 탐색

### 2-1. 필요한 자료구조

- 재귀함수
  1. 방문하지 않은 노드의 경우 해당 노드를 기점으로 재귀적으로 호출

### 2-2. 풀이 흐름

0. 전제 ) 깊은 부분 우선적으로 탐색, 재귀함수를 스택처럼 활용

1. 탐색 시작 노드를 스탭(재귀함수)에 삽입하고 방문 처리
2. 현재 노드와 연결된 다른 노드를 재귀적으로 방문하며 방문하지 않은 경우 함수 다시 호출함

### 2-3. 구현 방식

```javascript
// 노드 연결 정보
const graph = [
  [],
  [2, 3, 8],
  [1, 7],
  [1, 4, 5],
  [3, 5],
  [3, 4],
  [7],
  [2, 6, 8],
  [1, 7],
];
// 방문 정보
const visited = new Array(graph.length).fill(false);

const dfs = (graph, v, visited) => {
  // 현재 노드 방문
  visited[v] = true;
  // 방문 노드 출력
  console.log(v);

  // 인접 노드 탐색
  graph[v].forEach((i) => {
    // 방문하지 않았다면
    if (!visited[i]) {
      // 현재 함수 재귀 호출하면서 방문
      dfs(graph, i, visited);
    }
  });
};

// 호출
dfs(graph, 1, visited);
```

# 3. 이럴 때 DFS/BFS 쓴다!

## 3-1. 둘 다 사용가능 할 때

- 모든 정점을 방문하는 것이 중요하면 둘 다 사용 가능
- 검색 대상 그래프가 정말 크면 DFS가 유리, 검색 시작 지점으로부터 원하는 지점이 가깝다면 BFS가 유리
- 주로 BFS를 더 많이 쓰게 된다고 한다

## 3-2. BFS가 유용할 때

1. 최단 거리 찾을 때 -> 가까운 곳부터 찾기 때문에 탐색 시 먼저 찾아지는 해답이 곧 최단거리이다!
2. 큐에 각 노드의 정보를 기록해야하기 때문에 메모리를 더 많이 잡아 먹음 -> target number가 root node로부터 가깝다고 느낄 때 사용
3. 실제 개발에서 맵 최단 거리 안내, 페이스북 친구 추천 알고리즘 등에 사용

## 3-3. DFS가 유용할 때

1. 경로의 특징을 저장해둬야 하는 문제 -> 각각 경로마다 특징을 저장해둬야 하는 경우(경로에 같은 숫자가 있으면 안된다거나 등등) BFS는 사용하지 못한다.
2. 메모리를 덜 잡아먹지만, 속도가 더 느리다
3. 실제 개발에서 미로 게임 같은 곳에서 경로 존재하는지 판별할 때 사용 가능

# 4. 연습문제 ) 백준 1260: DFS와 BFS

## 4-1. 문제

그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력하는 프로그램을 작성하시오. 단, 방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문하고, 더 이상 방문할 수 있는 점이 없는 경우 종료한다. 정점 번호는 1번부터 N번까지이다.

## 4-2. 입력

첫째 줄에 정점의 개수 N(1 ≤ N ≤ 1,000), 간선의 개수 M(1 ≤ M ≤ 10,000), 탐색을 시작할 정점의 번호 V가 주어진다. 다음 M개의 줄에는 간선이 연결하는 두 정점의 번호가 주어진다. 어떤 두 정점 사이에 여러 개의 간선이 있을 수 있다. 입력으로 주어지는 간선은 양방향이다.

## 4-3.출력

첫째 줄에 DFS를 수행한 결과를, 그 다음 줄에는 BFS를 수행한 결과를 출력한다. V부터 방문된 점을 순서대로 출력하면 된다.

## 4-4. 풀이방법

입력으로 그래프를 만든 이후 dfs, bfs 정의대로 알고리즘을 구현해 결과를 출력한다.

## 4-5. 풀이코드

```javascript
const input = [];
let graph, visited, result;

// 모든 입력이 string이므로
const strToNumArr = (str) =>
  str.split(" ").map((numString) => Number(numString));

//입력 받고 결과 출력하는 부분
require("readline")
  // input, output
  .createInterface(process.stdin, process.stdout)
  // 입력되는 값을 한 줄씩 읽어들임
  .on("line", function (line) {
    input.push(line.trim());
  })
  //   종료시킬 때 콜백함수 실행
  .on("close", function () {
    //들어온 첫번째 요소를 반환함
    const [N, M, V] = strToNumArr(input.shift());
    //그래프 배열의 요소 빈 배열로 초기화
    graph = [...Array(N + 1)].map(() => []);
    //방문 사실 저장할 배열 초기화
    visited = [...Array(N + 1)].fill(false);

    let v1, v2;
    //첫번째 요소 제외하고 그래프 생성
    input.forEach((str) => {
      [v1, v2] = strToNumArr(str);
      //graph[v1] 배열에 v2 오름차순 맞게 삽입
      insertEdge(v1, v2);
      //graph[v2] 배열에 v1 오름차순 맞게 삽입
      insertEdge(v2, v1);
    });

    //결과 변수 초기화
    result = [];
    //깊이 우선 탐색
    dfs(V);
    //결과 출력
    console.log(result.join(" "));

    //방문 사실 저장하는 배열 초기화
    visited.fill(false);
    //결과 변수 초기화
    result = [];
    //너비 우선 탐색
    bfs(V);
    //결과 출력
    console.log(result.join(" "));
  });

//graph[vFront] 배열이 오름차순을 유지하도록 vBack을 적절한 위치에 삽입
const insertEdge = (vFront, vBack) => {
  let index;
  for (index = 0; index < graph[vFront].length; index++) {
    //인접한 정점 배열에서 vBack보다 크거나 같은 정점 찾을 때까지 continue
    if (graph[vFront][index] < vBack) {
      continue;
    }

    //문제에서 두 정점 사이에 여러 개의 간선이 있을 수 있다고 했으므로
    //인접한 정점 배열에 이미 vBack 정점이 있다면 삽입 인덱스에 null 저장
    if (graph[vFront][index] === vBack) {
      index = null;
    }
    break;
  }

  //삽입 인덱스가 null이 아니라면 vBack 삽입 인덱스에 삽입
  if (index !== null) {
    // 하나도 제거하지 않고 index자리에 vBack을 삽입
    graph[vFront].splice(index, 0, vBack);
  }
};

//깊이 우선 탐색, 현재 정점 매개변수로 받음
const dfs = (v) => {
  //이미 방문했으면 리턴
  if (visited[v]) {
    return;
  }

  //방문 사실 저장
  visited[v] = true;
  //결과 변수에 정점 삽입
  result.push(v);
  //인접한 정점 배열을 차례로 돌며 방문하지 않은 정점 방문
  graph[v].forEach((vertex) => {
    if (!visited[vertex]) {
      dfs(vertex);
    }
  });
};

//너비 우선 탐색, 시작 정점 매개변수로 받음
const bfs = (vStart) => {
  //방문할 정점을 담는 배열
  const willVisit = [vStart];
  let v;
  //방문할 정점이 안 남을 때까지
  while (willVisit.length !== 0) {
    //방문할 정점 배열의 첫 번째 원소 삭제 후 저장
    v = willVisit.shift();
    //이미 방문했으면 continue
    if (visited[v]) {
      continue;
    }

    //방문 사실 저장
    visited[v] = true;
    //결과 변수에 정점 삽입
    result.push(v);
    //인접한 정점 배열을 차례로 돌며 방문하지 않은 정점을
    //방문할 정점 배열의 끝에 삽입
    graph[v].forEach((vertex) => {
      if (!visited[vertex]) {
        willVisit.push(vertex);
      }
    });
  }
};
```
