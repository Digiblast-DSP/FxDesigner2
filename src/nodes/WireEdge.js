import React from 'react';
import { getSmoothStepPath, getMarkerEnd } from 'react-flow-renderer';

export default function WireEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  
  return (
    <>
        <path style={style} className="react-flow__edge-path-selector" d={edgePath}  />
        <path style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
    </>
  );
}
