import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 50px;
  flex-direction: column;
  padding: 50px 0;
`;
const BoxItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  background-color: #f368e0;
  border-radius: 10px;
  background-image: linear-gradient(15deg, #f368e0 0%, #d3d3d3 74%);
`;

/** infinity scroller */
function Scroller({ maxRange = 50, BaseLoadRange = 5 }) {
  const [nowLoadItem, setNowLoadItem] = useState(
    BaseLoadRange <= maxRange ? BaseLoadRange : maxRange
  );
  const Target = useRef(null);
  const handleInfinityIntersection = useCallback(
    (e) => {
      if (e[0].isIntersecting) {
        let buf = nowLoadItem + BaseLoadRange;
        buf > maxRange ? setNowLoadItem(maxRange) : setNowLoadItem(buf);
      }
    },
    [nowLoadItem]
  );
  const BoxItemGen = useCallback(() => {
    let contents = new Array(nowLoadItem).fill(0).map((value, index) => {
      return index !== nowLoadItem - 1 ? (
        <BoxItem key={`normalBoxItem${index}`}>{index + 1}</BoxItem>
      ) : (
        <BoxItem className="target" key={`TargetBoxItem${index}`} ref={Target}>
          {index + 1}
        </BoxItem>
      );
    });
    return contents;
  }, [nowLoadItem]);
  useEffect(() => {
    if (Target.current) {
      const InfinityIO = new IntersectionObserver(handleInfinityIntersection, {
        threshold: 0.3,
      });
      InfinityIO.observe(Target.current);
      return () => {
        InfinityIO.disconnect();
      };
    }
  }, [Target, nowLoadItem]);
  return <Container>{BoxItemGen()}</Container>;
}

export default Scroller;
