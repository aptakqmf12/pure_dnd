import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { StatusType, PlatformType } from "./index";
import { SortType } from "./index";

interface BoardWrapperProps {
  children: React.ReactNode;
  title: string;
  total: number;
  status: StatusType;
  setSort: (v: SortType) => void;
  setPlat: (p: PlatformType) => void;
}

export default function BoardWrapper({ children, title, total = 0, status, setSort, setPlat }: BoardWrapperProps) {
  return (
    <div.board.wrap>
      <div.board.top draggable={false}>
        <div className="title">{title}</div>
      </div.board.top>

      <div.board.content className={`dropzone ${status}`} data-dropstatus={status}>
        {children}
      </div.board.content>
    </div.board.wrap>
  );
}

const div = {
  board: {
    wrap: styled.div`
      position: relative;
      flex: 1;

      &::after {
        position: absolute;
        content: "";
        width: 100%;
        height: 20px;
        left: 0;
        bottom: 0;
        background: linear-gradient(rgba(18, 18, 18, 0.1) 0%, black 100%);
        z-index: 10;
      }
    `,
    top: styled.div`
      display: flex;
      justify-content: space-between;
      ${(p) => (p.theme.viewport.isdesktop === false ? "height: 48px; padding-right: 16px;" : "height: 57px; padding-right: 20px;")};
      padding-right: 20px;

      .title {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .sort {
        display: flex;
        align-items: center;
        gap: 20px;
      }
    `,
    content: styled.div`
      position: relative;
      overflow-y: scroll;

      ${(p) => (p.theme.viewport.isdesktop === false ? "height: 260px; padding-right: 16px;" : "height: 637px; padding-right: 20px;")};

      &::-webkit-scrollbar-thumb {
        display: block;
        background-color: ${(p) => p.theme.palette.global.monotone.mediumGray3};
        border: none;
      }
      &::-webkit-scrollbar {
        display: block;
        width: 2px;
        background-color: ${(p) => p.theme.palette.global.monotone.darkGray2};
        height: 10px;
      }
    `,
  },
};
