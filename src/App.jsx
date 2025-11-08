import { useState, useMemo } from "react";

const CAFES = [
  {
    id: 1,
    name: "Bean Lab",
    distance: "0.5 mi",
    hasOutlets: true,
    wifiQuality: "fast",      // "fast" | "ok"
    noiseLevel: "quiet",      // "quiet" | "normal" | "loud"
    updatedMinutesAgo: 3,
    crowd: "low",             // "low" | "medium" | "high"
    callReady: true
  },
  {
    id: 2,
    name: "Campus Grind",
    distance: "0.8 mi",
    hasOutlets: false,
    wifiQuality: "ok",
    noiseLevel: "normal",
    updatedMinutesAgo: 12,
    crowd: "medium",
    callReady: false
  },
  {
    id: 3,
    name: "Matcha Spot",
    distance: "1.2 mi",
    hasOutlets: true,
    wifiQuality: "fast",
    noiseLevel: "loud",
    updatedMinutesAgo: 7,
    crowd: "high",
    callReady: false
  }
];

// US-3 Quick Report sheet
function QuickReportSheet({ onSubmit }) {
  const [noise, setNoise] = useState(null);
  const [seating, setSeating] = useState(null);
  const [wifi, setWifi] = useState(null);

  const ready = noise && seating && wifi;

  const Chip = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      style={{
        padding: "4px 8px",
        borderRadius: 999,
        border: "1px solid #ccc",
        background: active ? "#111827" : "#fff",
        color: active ? "#fff" : "#000",
        cursor: "pointer",
        fontSize: 12
      }}
    >
      {children}
    </button>
  );

  return (
    <div style={{ borderTop: "1px solid #e5e7eb", marginTop: 12, paddingTop: 8 }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Quick Report</h3>

      <div style={{ marginBottom: 6 }}>
        <div style={{ fontSize: 13, fontWeight: 500 }}>Noise</div>
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          <Chip active={noise === "quiet"} onClick={() => setNoise("quiet")}>Quiet</Chip>
          <Chip active={noise === "normal"} onClick={() => setNoise("normal")}>Normal</Chip>
          <Chip active={noise === "loud"} onClick={() => setNoise("loud")}>Loud</Chip>
        </div>
      </div>

      <div style={{ marginBottom: 6 }}>
        <div style={{ fontSize: 13, fontWeight: 500 }}>Seating</div>
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          <Chip active={seating === "few"} onClick={() => setSeating("few")}>Few seats</Chip>
          <Chip active={seating === "many"} onClick={() => setSeating("many")}>Many seats</Chip>
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 500 }}>Wi-Fi</div>
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          <Chip active={wifi === "ok"} onClick={() => setWifi("ok")}>OK</Chip>
          <Chip active={wifi === "weak"} onClick={() => setWifi("weak")}>Weak</Chip>
        </div>
      </div>

      <button
        disabled={!ready}
        onClick={() => {
          if (!ready) return;
          onSubmit({ noise, seating, wifi });
        }}
        style={{
          width: "100%",
          padding: "6px 10px",
          borderRadius: 6,
          border: "none",
          background: ready ? "#2563eb" : "#d1d5db",
          color: "#fff",
          cursor: ready ? "pointer" : "default",
          fontSize: 14
        }}
      >
        Submit report
      </button>
    </div>
  );
}

function App() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [outletsOnly, setOutletsOnly] = useState(false);
  const [wifiFilter, setWifiFilter] = useState("any");   // "any" | "fast"
  const [noiseFilter, setNoiseFilter] = useState("any"); // "any" | "quiet"
  const [crowdFilter, setCrowdFilter] = useState("any"); // "any" | "low" | "medium"
  const [selectedCafe, setSelectedCafe] = useState(null);

  // US-3: store quick reports in state
  const [reports, setReports] = useState([]); // { cafeId, noise, seating, wifi, createdAt }

  const filteredCafes = useMemo(() => {
    return CAFES.filter((cafe) => {
      if (outletsOnly && !cafe.hasOutlets) return false;
      if (wifiFilter === "fast" && cafe.wifiQuality !== "fast") return false;
      if (noiseFilter === "quiet" && cafe.noiseLevel !== "quiet") return false;

      if (crowdFilter === "low" && cafe.crowd !== "low") return false;
      if (crowdFilter === "medium" && cafe.crowd === "high") return false;

      return true;
    });
  }, [outletsOnly, wifiFilter, noiseFilter, crowdFilter]);

  // US-4: recent reports for selected cafe
  const selectedCafeReports = useMemo(() => {
    if (!selectedCafe) return [];
    return reports.filter(r => r.cafeId === selectedCafe.id).slice(-3);
  }, [reports, selectedCafe]);

  function handleApplyFilters() {
    setFiltersOpen(false);
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 800, margin: "0 auto", padding: 16 }}>
      {/* Home header */}
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Cafe Locator</h1>
      <p style={{ marginBottom: 12 }}>Find a study café with outlets, solid Wi-Fi, and the right noise level.</p>

      {/* Search + filter row */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 12,
          flexWrap: "wrap"
        }}
      >
        <input
          placeholder="Search near GMU..."
          style={{
            flex: 1,
            padding: "6px 8px",
            borderRadius: 4,
            border: "1px solid #ccc"
          }}
        />
        <button
          onClick={() => setFiltersOpen(true)}
          style={{
            padding: "6px 10px",
            borderRadius: 999,
            border: "1px solid #ccc",
            background: "#f8f8f8",
            cursor: "pointer"
          }}
        >
          Filters
        </button>
      </div>

      {/* Filter sheet (US-1 + US-2 controls) */}
      {filtersOpen && (
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: 12,
            padding: 12,
            marginBottom: 16,
            background: "#fafafa"
          }}
        >
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Filters</h2>

          <label style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <input
              type="checkbox"
              checked={outletsOnly}
              onChange={(e) => setOutletsOnly(e.target.checked)}
            />
            Outlets available
          </label>

          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Wi-Fi</div>
            <select
              value={wifiFilter}
              onChange={(e) => setWifiFilter(e.target.value)}
              style={{
                marginTop: 4,
                padding: "4px 6px",
                borderRadius: 4,
                border: "1px solid #ccc"
              }}
            >
              <option value="any">Any</option>
              <option value="fast">Fast only</option>
            </select>
          </div>

          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Noise</div>
            <select
              value={noiseFilter}
              onChange={(e) => setNoiseFilter(e.target.value)}
              style={{
                marginTop: 4,
                padding: "4px 6px",
                borderRadius: 4,
                border: "1px solid #ccc"
              }}
            >
              <option value="any">Any</option>
              <option value="quiet">Quiet only</option>
            </select>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Max crowd level</div>
            <select
              value={crowdFilter}
              onChange={(e) => setCrowdFilter(e.target.value)}
              style={{
                marginTop: 4,
                padding: "4px 6px",
                borderRadius: 4,
                border: "1px solid #ccc"
              }}
            >
              <option value="any">Any</option>
              <option value="low">Only low</option>
              <option value="medium">Low + medium</option>
            </select>
          </div>

          <button
            onClick={handleApplyFilters}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "none",
              background: "#111827",
              color: "#fff",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Apply
          </button>
        </div>
      )}

      {/* Results list (US-1 + US-2) */}
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Results</h2>
      {filteredCafes.length === 0 ? (
        <p>No cafés match your filters yet. Try relaxing one.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: 16 }}>
          {filteredCafes.map((cafe) => {
            const cafeReports = reports.filter(r => r.cafeId === cafe.id);
            const updatedText = cafeReports.length
              ? "just now"
              : `${cafe.updatedMinutesAgo} min ago`;

            return (
              <li
                key={cafe.id}
                onClick={() => setSelectedCafe(cafe)}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  padding: 10,
                  marginBottom: 8,
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{cafe.name}</div>
                  <div style={{ fontSize: 13, color: "#4b5563" }}>
                    {cafe.distance} • {cafe.hasOutlets ? "Outlets" : "No outlets"} • Wi-Fi {cafe.wifiQuality} • Noise {cafe.noiseLevel}
                  </div>
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>
                    ⏱ updated {updatedText}
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    Crowd: {cafe.crowd} • {cafe.callReady ? "Good for calls" : "Not great for calls"}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "#2563eb" }}>Details →</div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Details view (US-4 + US-3 integrated) */}
      {selectedCafe && (
        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: 12,
            marginTop: 8
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Details</h2>
          <div style={{ fontWeight: 600 }}>{selectedCafe.name}</div>
          <div style={{ fontSize: 14, color: "#4b5563", marginBottom: 4 }}>
            {selectedCafe.distance} away
          </div>
          <div style={{ fontSize: 14, marginBottom: 4 }}>
            Badges: {selectedCafe.hasOutlets ? "Outlets · " : ""}
            Wi-Fi {selectedCafe.wifiQuality} · Noise {selectedCafe.noiseLevel}
          </div>
          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>
            Crowd: {selectedCafe.crowd} • {selectedCafe.callReady ? "Good for calls" : "Not great for calls"}
          </div>

          {/* Recent reports */}
          <div style={{ marginTop: 8 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600 }}>Recent reports</h3>
            {selectedCafeReports.length === 0 ? (
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                No reports yet. Be the first!
              </div>
            ) : (
              <ul style={{ fontSize: 12, color: "#374151", paddingLeft: 16 }}>
                {selectedCafeReports.map((r, i) => (
                  <li key={i}>
                    Noise {r.noise}, Seating {r.seating}, Wi-Fi {r.wifi}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quick Report sheet (US-3) */}
          <QuickReportSheet
            onSubmit={(r) => {
              setReports(prev => [
                ...prev,
                { cafeId: selectedCafe.id, ...r, createdAt: new Date().toISOString() }
              ]);
              alert("Thanks! Your report was recorded.");
            }}
          />

          <button
            onClick={() => alert("Navigate to " + selectedCafe.name)}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "none",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
              marginRight: 8,
              marginTop: 6
            }}
          >
            Navigate
          </button>
          <button
            onClick={() => setSelectedCafe(null)}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              background: "#fff",
              cursor: "pointer",
              marginTop: 6
            }}
          >
            Back to list
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
