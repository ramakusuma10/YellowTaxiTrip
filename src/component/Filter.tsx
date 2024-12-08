import Select from "react-select";
import "../global.css";

interface PaymentOption {
  value: string;
  label: string;
}

const paymentOptions: PaymentOption[] = [
  { value: "CRD", label: "Credit Card" },
  { value: "CSH", label: "Cash" },
  { value: "NOC", label: "No Charge" },
  { value: "DIS", label: "Dispute" },
  { value: "UNK", label: "Unknown" },
];

interface FilterGroupProps {
  label: string;
  children: React.ReactNode;
}

function FilterGroup({ label, children }: FilterGroupProps) {
  return (
    <div className="filter-group">
      <label>{label} :</label>
      {children}
    </div>
  );
}

interface Filters {
  paymentType: string | null;
  pickupTime: string | null;
  dropoffTime: string | null;
  fareRange: [number , number ];
  distanceRange: [number, number];
}

interface FilterProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

function Filter({ filters, setFilters }: FilterProps) {
  const handleFilterChange = (field: keyof Filters, value: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  return (
    <div className="filter-container">
      <FilterGroup label="Payment Type">
        <Select
          options={paymentOptions}
          onChange={(selected) =>
            handleFilterChange("paymentType", selected ? selected.value : "")
          }
          placeholder="Select Payment Type"
          className="select-dropdown"
        />
      </FilterGroup>

      <FilterGroup label="Pickup Time">
        <input
          type="datetime-local"
          value={filters.pickupTime || ""}
          onChange={(e) => handleFilterChange("pickupTime", e.target.value)}
          className="input-field"
        />
      </FilterGroup>

      <FilterGroup label="Dropoff Time">
        <input
          type="datetime-local"
          value={filters.dropoffTime || ""}
          onChange={(e) => handleFilterChange("dropoffTime", e.target.value)}
          className="input-field"
        />
      </FilterGroup>

      <FilterGroup label="Fare Range">
        <div className="range-inputs">
          <input
            type="number"
            placeholder="Min"
            min={0}
            value={filters.fareRange[0] || ""}
            onChange={(e) =>
              handleFilterChange("fareRange", [
                Number(e.target.value),
                filters.fareRange[1],
              ])
            }
            className="input-field"
          />
          <input
            type="number"
            placeholder="Max"
            min={0}
            value={filters.fareRange[1] || ""}
            onChange={(e) =>
              handleFilterChange("fareRange", [
                filters.fareRange[0],
                Number(e.target.value),
              ])
            }
            className="input-field"
          />
        </div>
      </FilterGroup>

      <FilterGroup label="Distance Range">
        <div className="range-inputs">
          <input
            type="number"
            placeholder="Min"
            min={0}
            value={filters.distanceRange[0] || ""}
            onChange={(e) =>
              handleFilterChange("distanceRange", [
                Number(e.target.value),
                filters.distanceRange[1],
              ])
            }
            className="input-field"
          />
          <input
            type="number"
            placeholder="Max"
            min={0}
            value={filters.distanceRange[1] || ""}
            onChange={(e) =>
              handleFilterChange("distanceRange", [
                filters.distanceRange[0],
                Number(e.target.value),
              ])
            }
            className="input-field"
          />
        </div>
      </FilterGroup>
    </div>
  );
}

export default Filter;
