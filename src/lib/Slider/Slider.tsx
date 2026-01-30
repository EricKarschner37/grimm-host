import React from "react";
import "./slider.scss";
import { useStableCallback } from "../utils/hooks/use-stable-callback";
import { clamp } from "../utils/clamp";
import { Text } from "../Text";
import { Flex } from "../Flex";
import { Input } from "../Input/Input";
import { classNames } from "../utils/classNames";
import { Action } from "../Action/Action";

const BLOCK = "lib__slider";

export interface SliderProps {
  min: number;
  max: number;
  value: number;
  onValueChange: (v: number) => void;
  increment?: number;
}

const CIRCLE_WIDTH = 24;
const CIRCLE_HEIGHT = 24;

export const Slider = ({
  min,
  max,
  value,
  onValueChange,
  increment = 5,
}: SliderProps) => {
  if (increment === 0) {
    throw new Error("Error: '0' is not a valid increment value");
  }

  const mouseMoveHandlerRef = React.useRef<
    null | ((event: MouseEvent) => void)
  >(null);
  const endSliderDrag = React.useCallback(() => {
    if (mouseMoveHandlerRef.current) {
      document.removeEventListener("mousemove", mouseMoveHandlerRef.current);
    }
  }, []);

  const makeMouseMoveHandler = useStableCallback((barElement: HTMLElement) => {
    const barBoundingRect = barElement.getBoundingClientRect();
    const xCoordMin = barBoundingRect.left;
    const xCoordMax = barBoundingRect.right;
    const xRange = xCoordMax - xCoordMin;

    return (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : "x" in e ? e.x : null;
      if (!x) {
        return;
      }
      const xCoord = clamp(x, xCoordMin, xCoordMax);
      const progress = (xCoord - xCoordMin) / xRange;
      let newValueRounded: number;
      if (xCoord === xCoordMax) {
        newValueRounded = max;
      } else if (xCoord === xCoordMin) {
        newValueRounded = min;
      } else {
        const newValue = progress * (max - min) + min;
        newValueRounded = Math.round(newValue / increment) * increment;
      }
      onValueChange(newValueRounded);
    };
  });

  const barRef = React.useRef<HTMLDivElement | null>(null);

  const ratio = Math.round((100 * (value - min)) / (max - min));
  React.useEffect(() => {
    document.addEventListener("mouseup", endSliderDrag);
    document.addEventListener("touchend", endSliderDrag);
    return () => {
      document.removeEventListener("mouseup", endSliderDrag);
      document.removeEventListener("touchend", endSliderDrag);
    };
  }, [endSliderDrag]);
  return (
    <Flex direction="column" align="stretch" gap="8px" isFullWidth>
      <div className={`${BLOCK}__values-grid`}>
        <Action onClick={() => onValueChange(min)}>
          <Text
            className={classNames("noselect", `${BLOCK}__left-text`)}
            text={min.toString()}
            variant="secondary"
            margin="none"
          />
        </Action>
        <Text
          className={classNames("noselect", `${BLOCK}__center-text`)}
          text={value.toString()}
          margin="none"
        />
        <Action onClick={() => onValueChange(max)}>
          <Text
            className={classNames("noselect", `${BLOCK}__right-text`)}
            text={max.toString()}
            variant="secondary"
            margin="none"
          />
        </Action>
      </div>
      <div
        ref={barRef}
        className={`${BLOCK}__bar`}
        style={{
          background: `linear-gradient(to right, blue ${ratio}%, lightgrey ${ratio}%`,
        }}
        onTouchStart={(e) => {
          endSliderDrag();
          const el = barRef.current;
          if (el) {
            const handleMouseMove = makeMouseMoveHandler(el);
            mouseMoveHandlerRef.current = handleMouseMove;
            handleMouseMove(e.nativeEvent);
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("touchmove", handleMouseMove);
          }
        }}
        onMouseDown={(e) => {
          endSliderDrag();
          const el = barRef.current;
          if (el) {
            const handleMouseMove = makeMouseMoveHandler(el);
            mouseMoveHandlerRef.current = handleMouseMove;

            handleMouseMove(e.nativeEvent);
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("touchmove", handleMouseMove);
          }
        }}
      >
        <div
          className={`${BLOCK}__circle`}
          style={{
            width: CIRCLE_WIDTH,
            height: CIRCLE_HEIGHT,
            left: `calc(${ratio}% - ${Math.round(CIRCLE_WIDTH / 2)}px)`,
            top: `calc(50% - ${Math.round(CIRCLE_HEIGHT / 2)}px)`,
          }}
        ></div>
      </div>
    </Flex>
  );
};
