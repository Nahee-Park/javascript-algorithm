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
