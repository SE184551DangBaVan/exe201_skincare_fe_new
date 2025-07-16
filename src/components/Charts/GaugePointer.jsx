import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from '@mui/x-charts/Gauge';

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + (outerRadius * 1.05) * Math.sin(valueAngle),
    y: cy - (outerRadius * 1.05) * Math.cos(valueAngle),
  };
  return (
    <g>
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="#71b9fd"
        strokeWidth={5}
      />
      <circle cx={cx} cy={cy} r={65} fill="#ffff" />
    </g>
  );
}

export default function CompositionExample() {
  return (
    <GaugeContainer
      width={200}
      height={200}
      startAngle={-110}
      endAngle={110}
      value={86}
      color='#A9DFD8'
    >
      <GaugeReferenceArc />
      <GaugeValueArc />
      <GaugePointer />
    </GaugeContainer>
  );
}
