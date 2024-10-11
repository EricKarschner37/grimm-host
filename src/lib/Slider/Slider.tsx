import React from "react";
import "./slider.scss";
import { useStableCallback } from "lib/utils/hooks/use-stable-callback";
import { clamp } from "lib/utils/clamp";
import { Text } from "lib/Text";
import { Flex } from "lib/Flex";
import { Input } from "lib/Input/Input";

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

    return (event: MouseEvent) => {
      const xCoord = clamp(event.x, xCoordMin, xCoordMax);
      const progress = (xCoord - xCoordMin) / xRange;
      const newValue = progress * (max - min) + min;
      const newValueRounded = Math.round(newValue / increment) * increment;
      if (newValueRounded !== value) {
        onValueChange(newValueRounded);
      }
    };
  });

  const barRef = React.useRef<HTMLDivElement | null>(null);

  const ratio = Math.round((100 * (value - min)) / (max - min));
  React.useEffect(() => {
    document.addEventListener("mouseup", endSliderDrag);
    return () => {
      document.removeEventListener("mouseup", endSliderDrag);
    };
  }, [endSliderDrag]);
  return (
    <Flex direction="column" align="stretch" gap="8px">
      <div className={`${BLOCK}__values-grid`}>
        <Text text={min.toString()} variant="secondary" margin="none" />
        <Text text={value.toString()} margin="none" />
        <Text text={max.toString()} variant="secondary" margin="none" />
      </div>
      <div
        ref={barRef}
        className={`${BLOCK}__bar`}
        style={{
          background: `linear-gradient(to right, blue ${ratio}%, lightgrey ${ratio}%`,
        }}
        onMouseDown={(e) => {
          endSliderDrag();
          const el = barRef.current;
          if (el) {
            const handleMouseMove = makeMouseMoveHandler(el);
            mouseMoveHandlerRef.current = handleMouseMove;

            handleMouseMove(e.nativeEvent);
            document.addEventListener("mousemove", handleMouseMove);
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
