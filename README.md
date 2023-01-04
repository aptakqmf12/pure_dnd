
## 프로젝트 요약
- addEventListener의 "dragstart", "dragover", "dragend" 이벤트를 활용하여 Drag&Drop 칸반보드를 라이브러리 없이 직접 구현
- dragStart시 : dragging className을 부여
- dropZone과 hover시 : `getBoundingClientRect` 와 event.clientY로 겹치는 아이템의 중심부를 판단, 앞서 판단한 기준으로 `insertAdjacentElement`를 활용한 DOM insert작업
- dragEnd시 : drop된 아이템의 상태를 dropZone의 상태값으로 변경하는 `PUT`메소드 요청.

## 핵심 코드

// 마우스와 겹친상태에서의 sibling 요소 찾기
![1](https://user-images.githubusercontent.com/55612761/210493793-2e7ecdce-cce8-455e-bab9-e3de6280e3e7.png)

// drag&drop 로직
![2](https://user-images.githubusercontent.com/55612761/210493805-98872338-4b44-4c1e-ab0e-80ac324ea579.png)


## 배운점
- Javascript DOM을 React단에서 조작하는 경험
- `React DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node` 에러를 맞닥드렸는데, 리액트에서 DOM을 리페인트 하기전에 node들을 지우는 과정에서 node를 감싸는 부모가 없기때문에 발생하는 이슈같다. 따라서 적절한 부모를 div태그로 만들어주어 해결.
- 조작된 DOM과 state간의 Sync를 무작정 맞추려는 노력을 했지만 구조적인 문제로, reRendering시에 state를 clear해주는 방법을 택했다. 


## 특이사항 및 느낀점
- JS에서 DOM을 잘 다루기는 힘들지만, 다룰줄 안다면 많은 기능을 구현할수있게된다.
- React에서 DOM을 조작하는 과정은 주의사항이 필요하다. 최초에 구조를 짜는 과정에 신중을 기울여야한다!
- State와 DOM간의 Sync를 맞추기보단, React에게 모든 렌더링 권한을 전가하여, 작업하는것이 옳다. 

## 사용기술
Nextjs, Typescript 끝~



https://user-images.githubusercontent.com/55612761/210493518-8ef184a9-b044-42b0-83b7-8f0d9a9c8ef7.mov

