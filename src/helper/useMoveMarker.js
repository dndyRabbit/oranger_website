import React, { useState, useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function useMarkerMove(initialValue, { delta = 100, delay = 20 } = {}) {
  let [currentPosition, setCurrentPosition] = useState(initialValue);
  let [currentDeltaPosition, setCurrentDeltaPosition] = useState([0, 0]);
  let [currentDelta, setCurrentDelta] = useState(null);

  useInterval(
    () => {
      setCurrentDelta(++currentDelta);
      setCurrentPosition([
        currentPosition[0] + currentDeltaPosition[0],
        currentPosition[1] + currentDeltaPosition[1],
      ]);
    },
    currentDelta !== null && currentDelta !== delta ? delay : null
  );

  function setPosition(coordinates) {
    const [latitude, longitude] = coordinates;
    setCurrentDelta(0);
    setCurrentDeltaPosition([
      (latitude - currentPosition[0]) / delta,
      (longitude - currentPosition[1]) / delta,
    ]);
  }

  return [currentPosition, setPosition];
}

export default useMarkerMove;
