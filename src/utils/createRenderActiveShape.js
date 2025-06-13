import { Sector } from "recharts";

export const createRenderActiveShape = (isMobile) => {
  const RenderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;

    const labelOffset = isMobile ? 6 : 10;
    const lineLength = isMobile ? 16 : 30;
    const textOffset = isMobile ? 10 : 12;

    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + labelOffset) * cos;
    const sy = cy + (outerRadius + labelOffset) * sin;
    const mx = cx + (outerRadius + lineLength) * cos;
    const my = cy + (outerRadius + lineLength) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * textOffset;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
    const maxCharsPerLine = isMobile ? 10 : 15;
    const lineHeight = 20;
    const nameLines = [];
    let currentLine = "";

    payload?.name.split(" ").forEach((word) => {
      if ((currentLine + word).length > maxCharsPerLine) {
        nameLines.push(currentLine.trim());
        currentLine = "";
      }
      currentLine += `${word} `;
    });
    nameLines.push(currentLine.trim());

    // Calculate vertical position adjustment
    const totalHeight = nameLines.length * lineHeight;
    const initialY = cy - totalHeight / 2 + 8;
    return (
      <g>
        <text
          className={`${isMobile ? "text-xs" : "text-sm"} w-full text-center`}
          x={cx}
          y={initialY}
          textAnchor="middle"
          fill={fill}
        >
          {nameLines.map((line, index) => (
            <tspan key={index} x={cx} dy={index === 0 ? 0 : "1.2em"}>
              {line}
            </tspan>
          ))}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
          fontSize={isMobile ? "12px" : "14px"}
        >
          {`Value: ${value}`}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#242e4c"
          fontSize={isMobile ? "12px" : "14px"}
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  RenderActiveShape.displayName = "RenderActiveShape";
  return RenderActiveShape;
};
