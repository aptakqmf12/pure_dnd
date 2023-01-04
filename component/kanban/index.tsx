import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
// import { getMyHomeGamePlane, doChangeGamePlaneStatus, PlaneItemType } from "../../service/index";
import _ from "lodash";

import Item from "./item";
import BoardWrapper from "./board";

export enum SortType {
  TITLE_ASC = "title_asc",
  RATE_DESC = "rate_desc",
}

export enum StatusType {
  TODO,
  PROGRESS,
  COMPLETE,
}
export enum PlatformType {
  PLAYSTATION,
  STEAM,
  XBOX,
}
export default function KanbanBoard() {
  // data
  const [list, setList] = useState<PlaneItemType[]>([]);
  //sort
  const [todoSort, setTodoSort] = useState<SortType>(SortType.TITLE_ASC);
  const [progressSort, setProgressSort] = useState<SortType>(SortType.TITLE_ASC);
  const [completeSort, setCompleteSort] = useState<SortType>(SortType.TITLE_ASC);
  //filter
  const [todoPlat, setTodoPlat] = useState<PlatformType>();
  const [progressPlat, setProgressPlat] = useState<PlatformType>();
  const [completePlat, setCompletePlat] = useState<PlatformType>();

  const clear = () => {
    setList([]);
  };

  const record = () => {
    const todoPromise = getMyHomeGamePlane({ status: StatusType.TODO, order_type: todoSort, platform: todoPlat });
    const progressPromise = getMyHomeGamePlane({ status: StatusType.PROGRESS, order_type: progressSort, platform: progressPlat });
    const completePromise = getMyHomeGamePlane({ status: StatusType.COMPLETE, order_type: completeSort, platform: completePlat }); // get

    Promise.all([todoPromise, progressPromise, completePromise]).then((results) => {
      const todoData = results[0].data.rows.map((d) => ({ ...d, status: StatusType.TODO }));
      const progressData = results[1].data.rows.map((d) => ({ ...d, status: StatusType.PROGRESS }));
      const completeData = results[2].data.rows.map((d) => ({ ...d, status: StatusType.COMPLETE }));

      setList([...todoData, ...progressData, ...completeData]);
    });
  };

  const setListStatus = (uuid: string, status: StatusType) => {
    doChangeGamePlaneStatus({ uuid, status }); // put
  };

  useEffect(() => {
    clear();
    record();
  }, [todoSort, progressSort, completeSort, todoPlat, progressPlat, completePlat]);

  const todo = list.filter((l) => l.status === StatusType.TODO);
  const progress = list.filter((l) => l.status === StatusType.PROGRESS);
  const complete = list.filter((l) => l.status === StatusType.COMPLETE);

  if (!todo || !progress || !complete) {
    return <></>;
  }

  const FIXED_BOARD_DATA = [
    { title: "대기 중이에요", status: StatusType.TODO, setSort: setTodoSort, setPlat: setTodoPlat, plat: todoPlat, data: todo },
    {
      title: "플레이 중이에요",
      status: StatusType.PROGRESS,
      setSort: setProgressSort,
      setPlat: setProgressPlat,
      plat: progressPlat,
      data: progress,
    },
    { title: "끝냈어요", status: StatusType.COMPLETE, setSort: setCompleteSort, setPlat: setCompletePlat, plat: completePlat, data: complete },
  ];

  return (
    <div.wrap>
      {FIXED_BOARD_DATA.map((board, id) => {
        const { title, status, setSort, setPlat, data } = board;
        const spec = { title, total: data.length, status, setSort, setPlat };

        return (
          <BoardWrapper {...spec} key={id}>
            {data.map((item, i) => {
              return <Item {...item} status={status} setListStatus={setListStatus} key={i} />;
            })}
          </BoardWrapper>
        );
      })}
    </div.wrap>
  );
}

const div = {
  wrap: styled.div`
    display: flex;
    gap: 40px;
    padding-top: 40px;
    ${(p) => (p.theme.viewport.isdesktop === false ? "flex-direction: column;  margin: 0 16px;" : "flex-direction: row; margin:0")};
  `,
};
