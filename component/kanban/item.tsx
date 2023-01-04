import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { StatusType, PlatformType } from "./index";
import { useRouter } from "next/router";
import _ from "lodash";

interface ItemProps {
  uuid: number;
  platform: PlatformType;
  game_title: string;
  game_id: string;
  status: StatusType;
  setListStatus: (uuid: string, status: StatusType) => void;
}

export default function Item({ uuid, game_title, game_id, platform, status, setListStatus }: ItemProps) {
  const route = useRouter();
  const itemRef = useRef<HTMLDivElement>(null);
  const c = "white";
  const icon = null;

  const getFrontClosest = (dropzone: Element, draggingY: number) => {
    const siblings = dropzone?.querySelectorAll(".item:not(.dragging)");
    let closest;

    for (const sibling of siblings) {
      const rect = sibling.getBoundingClientRect();
      const centerYOffset = rect.y + rect.height / 2;

      draggingY > centerYOffset ? (closest = sibling) : (closest = closest);
    }

    return closest;
  };

  useEffect(() => {
    const drag = (e: any) => {
      const dragging = e.target as HTMLElement;
      dragging.classList.add("dragging");
    };

    const drop = (e: any) => {
      const dragging = e.target as HTMLElement;
      dragging.classList.remove("dragging");

      const targetBoard = document.elementsFromPoint(e.clientX, e.clientY).find((elm) => {
        const element = elm as HTMLElement;
        return element.dataset.dropstatus;
      }) as HTMLElement;

      if (!targetBoard) {
        return;
      }

      const draguuid = dragging.dataset.uuid || "";
      const targetStatus = targetBoard.dataset.dropstatus as StatusType;

      setListStatus(draguuid, targetStatus); //put
    };

    document.querySelectorAll(".dropzone").forEach((dropzone) => {
      dropzone.addEventListener("dragover", (e: any) => {
        e.preventDefault();
        const dragging = document.querySelector(".dragging") as HTMLElement;
        const closest = getFrontClosest(dropzone, e.clientY) as HTMLElement;

        if (closest) {
          closest.insertAdjacentElement("afterend", dragging);
        } else {
          dropzone.prepend(dragging);
        }
      });
    });

    itemRef.current?.addEventListener("dragstart", drag);
    itemRef.current?.addEventListener("dragend", drop);

    return () => {
      itemRef.current?.removeEventListener("dragstart", drag);
      itemRef.current?.removeEventListener("dragend", drop);

      document.querySelectorAll(".dropzone").forEach((dropzone) => {
        dropzone.removeEventListener("dragover", (e: any) => {
          e.preventDefault();
          const dragging = document.querySelector(".dragging") as HTMLElement;
          const closest = getFrontClosest(dropzone, e.clientY) as HTMLElement;

          if (closest) {
            closest.insertAdjacentElement("afterend", dragging);
          } else {
            dropzone.prepend(dragging);
          }
        });
      });
    };
  }, [itemRef, itemRef.current]);

  return (
    <div>
      <div.item.wrap className="item" ref={itemRef} data-uuid={uuid} draggable onClick={() => game_id && route.push(`game/${game_id}`)}>
        <div.item.title draggable={false}>{game_title}</div.item.title>
        <div.item.icon draggable={false}>{icon}</div.item.icon>
      </div.item.wrap>
    </div>
  );
}

const div = {
  item: {
    wrap: styled.div`
      position: relative;
      display: flex;
      justify-content: space-between;
      align-content: center;
      gap: 6px;
      width: 100%;

      ${(p) => (p.theme.viewport.isdesktop === false ? "  padding: 12px;" : "  padding: 16px;")};
      margin-bottom: 10px;
      background-color: #1f1f21;
      border-radius: 4px;
      cursor: pointer;

      &.dragging {
        z-index: 9;
        opacity: 0.7;
        border: 1px dashed ${(p) => p.theme.palette.global.monotone.mediumGray3};
      }

      &.shadow {
        margin-bottom: 60px;
      }
    `,
    title: styled.div`
      position: relative;
      display: flex;
      white-space: nowrap;
      width: 100%;
      overflow-x: hidden;
      text-overflow: ellipsis;
    `,
    icon: styled.div``,
  },
};
