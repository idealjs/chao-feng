import {
  ClientRect,
  CollisionDescriptor,
  CollisionDetection,
} from "@dnd-kit/core";

export type Coordinates = {
  x: number;
  y: number;
};

export function sortCollisionsAsc(
  { data: { value: a } }: CollisionDescriptor,
  { data: { value: b } }: CollisionDescriptor
) {
  return a - b;
}

export function cornersOfRectangle({ left, top, height, width }: ClientRect) {
  return [
    {
      x: left,
      y: top,
    },
    {
      x: left + width,
      y: top,
    },
    {
      x: left,
      y: top + height,
    },
    {
      x: left + width,
      y: top + height,
    },
  ];
}

export function distanceBetween(p1: Coordinates, p2: Coordinates) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

/**
 * Returns the closest rectangles from an array of rectangles to the corners of
 * another rectangle.
 */
export const closestCorners: CollisionDetection = ({
  collisionRect,
  droppableRects,
  droppableContainers,
}) => {
  const corners = cornersOfRectangle(collisionRect);
  const collisions: CollisionDescriptor[] = [];

  for (const droppableContainer of droppableContainers) {
    const { id } = droppableContainer;
    const rect = droppableRects.get(id);

    if (rect) {
      const rectCorners = cornersOfRectangle(rect);
      const distances = corners.reduce((accumulator, corner, index) => {
        return accumulator + distanceBetween(rectCorners[index], corner);
      }, 0);
      const effectiveDistance = Number((distances / 4).toFixed(4));

      collisions.push({
        id,
        data: { droppableContainer, value: effectiveDistance },
      });
    }
  }
  return collisions.sort(sortCollisionsAsc);
};
