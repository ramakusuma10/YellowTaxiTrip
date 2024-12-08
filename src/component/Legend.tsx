import "../global.css";

interface LegendItem {
  color: string;
  label: string;
}

const legendItems: LegendItem[] = [
  { color: "blue", label: "Credit Card" },
  { color: "green", label: "Cash" },
  { color: "red", label: "No Charge" },
  { color: "purple", label: "Dispute" },
  { color: "gray", label: "Unknown" },
];

function Legend() {
  return (
    <div className="map-legend">
      <ul>
        {legendItems.map((item, index) => (
          <li key={index}>
            <span className={`legend-color ${item.color}`}></span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Legend;
