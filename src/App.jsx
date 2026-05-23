import { useState } from "react"
import Papa from "papaparse"

const accessEvents = [
  {
    id: 1,
    timestamp: "2026-05-21 08:12",
    location: "Main Lobby",
    deviceId: "D-104",
    eventType: "Face Authentication",
    status: "Failed",
    notes: "User was not recognized after multiple attempts."
  },
  {
    id: 2,
    timestamp: "2026-05-21 08:18",
    location: "Main Lobby",
    deviceId: "D-104",
    eventType: "Face Authentication",
    status: "Failed",
    notes: "Lighting conditions may have affected recognition."
  },
  {
    id: 3,
    timestamp: "2026-05-21 08:25",
    location: "Server Room",
    deviceId: "D-221",
    eventType: "Access Granted",
    status: "Success",
    notes: "Authorized employee entered successfully."
  },
  {
    id: 4,
    timestamp: "2026-05-21 09:02",
    location: "Warehouse Entrance",
    deviceId: "D-309",
    eventType: "Device Check-In",
    status: "Warning",
    notes: "Device reported intermittent connectivity."
  },
  {
    id: 5,
    timestamp: "2026-05-21 09:35",
    location: "Data Center",
    deviceId: "D-412",
    eventType: "Face Authentication",
    status: "Failed",
    notes: "Authentication failed for contractor profile."
  }
]

function App() {
  const [events, setEvents] = useState(accessEvents)
  const [dataSource, setDataSource] = useState("Sample data")
  const totalEvents = events.length
const failedEvents = events.filter((event) => event.status === "Failed").length
const warningEvents = events.filter((event) => event.status === "Warning").length
  const failureRate = Math.round((failedEvents / totalEvents) * 100)
  const failedEventsByDevice = events    .filter((event) => event.status === "Failed")
    .reduce((accumulator, event) => {
      accumulator[event.deviceId] = (accumulator[event.deviceId] || 0) + 1
      return accumulator
    }, {})

  const mostProblematicDevice = Object.entries(failedEventsByDevice)
    .sort((a, b) => b[1] - a[1])[0]
    const operationalInsight = mostProblematicDevice
    ? `Device ${mostProblematicDevice[0]} has the highest number of failed authentication events, with ${mostProblematicDevice[1]} failures detected. The operations team should review this device first and check for possible lighting issues, enrollment problems, camera obstruction, or intermittent connectivity.`
    : "No failed authentication events were detected. No immediate device review is required."
    const eventsForMostProblematicDevice = mostProblematicDevice
    ? events.filter(
        (event) =>
          event.deviceId === mostProblematicDevice[0] &&
          event.status === "Failed"
      )
    : []

  const combinedNotes = eventsForMostProblematicDevice
    .map((event) => event.notes.toLowerCase())
    .join(" ")
    const failedEventsByLocation = eventsForMostProblematicDevice.reduce(
      (accumulator, event) => {
        accumulator[event.location] = (accumulator[event.location] || 0) + 1
        return accumulator
      },
      {}
    )
  
    const mostAffectedLocation = Object.entries(failedEventsByLocation)
      .sort((a, b) => b[1] - a[1])[0]

  const dynamicSuggestedActions = []

  if (combinedNotes.includes("lighting")) {
    dynamicSuggestedActions.push("Check lighting conditions around the device.")
  }

  if (combinedNotes.includes("connectivity")) {
    dynamicSuggestedActions.push("Verify device network connectivity and recent check-ins.")
  }

  if (combinedNotes.includes("contractor") || combinedNotes.includes("profile") || combinedNotes.includes("enrollment")) {
    dynamicSuggestedActions.push("Review recent user enrollment or profile changes.")
  }

  if (combinedNotes.includes("recognized") || combinedNotes.includes("authentication")) {
    dynamicSuggestedActions.push("Inspect the camera area for possible obstruction or recognition issues.")
  }

  if (dynamicSuggestedActions.length === 0) {
    dynamicSuggestedActions.push(
      "Review the device logs and compare recent failed attempts with successful access events.",
      "Check the device environment, user enrollment status, and connectivity before escalating."
    )
  }
  const handleCsvUpload = (event) => {
    const file = event.target.files[0]

    if (!file) {
      return
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedEvents = results.data.map((row, index) => ({
          id: index + 1,
          timestamp: row.timestamp || "",
          location: row.location || "",
          deviceId: row.deviceId || "",
          eventType: row.eventType || "",
          status: row.status || "",
          notes: row.notes || ""
        }))

        setEvents(parsedEvents)
        setDataSource(file.name)
      }
    })
  }
  const resetToSampleData = () => {
    setEvents(accessEvents)
    setDataSource("Sample data")
  }
    const ticketDraft = mostProblematicDevice
    ? {
        title: `Review failed authentication events for Device ${mostProblematicDevice[0]}`,
        priority: mostProblematicDevice[1] >= 3 ? "High" : "Medium",
        summary: `Device ${mostProblematicDevice[0]} reported ${mostProblematicDevice[1]} failed authentication event${mostProblematicDevice[1] > 1 ? "s" : ""}${mostAffectedLocation ? `, primarily at ${mostAffectedLocation[0]}` : ""}. This device should be reviewed by the operations or support team to determine whether the issue is related to lighting, user enrollment, camera obstruction, or connectivity.`,        
        suggestedActions: dynamicSuggestedActions
      }
    : {
        title: "No support ticket required",
        priority: "Low",
        summary: "No failed authentication events were detected in the current event logs.",
        suggestedActions: [
          "Continue monitoring access-control events.",
          "No immediate device review is required."
        ]
      }
  return (
    <main style={{
      minHeight: "100vh",
      backgroundColor: "#0f172a",
      color: "#e5e7eb",
      fontFamily: "Arial, sans-serif",
      padding: "48px"
    }}>
      <section style={{
        maxWidth: "1100px",
        margin: "0 auto"
      }}>
        <p style={{
          color: "#38bdf8",
          fontSize: "14px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: "12px"
        }}>
          AI Internal Tool Prototype
        </p>

        <h1 style={{
          fontSize: "48px",
          margin: "0 0 16px"
        }}>
          Access Operations Dashboard
        </h1>

        <p style={{
          fontSize: "20px",
          lineHeight: "1.6",
          color: "#cbd5e1",
          maxWidth: "760px"
        }}>
          A prototype dashboard for analyzing fictional access-control events,
          detecting failed authentication patterns, and generating operational
          support insights.
        </p>
        <div style={{
          marginTop: "32px",
          backgroundColor: "#1e293b",
          border: "1px solid #334155",
          borderRadius: "16px",
          padding: "20px"
        }}>
          <h2 style={{
            marginTop: 0,
            marginBottom: "8px"
          }}>
            Upload Access Event CSV
          </h2>

          <p style={{
            color: "#cbd5e1",
            lineHeight: "1.6",
            marginTop: 0
          }}>
            Upload a CSV file with access-control event logs to update the dashboard automatically.
          </p>

          <input
            type="file"
            accept=".csv"
            onChange={handleCsvUpload}
            style={{
              marginTop: "12px",
              color: "#e5e7eb"
            }}
          />
  

          <p style={{
            color: "#94a3b8",
            fontSize: "14px",
            marginTop: "12px",
            marginBottom: "16px"
          }}>
            Required columns: timestamp, location, deviceId, eventType, status, notes
          </p>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap"
          }}>
            <p style={{
              color: "#cbd5e1",
              margin: 0
            }}>
              Current data source: <strong>{dataSource}</strong>
            </p>

            <button
              onClick={resetToSampleData}
              style={{
                backgroundColor: "#334155",
                color: "#e5e7eb",
                border: "1px solid #475569",
                borderRadius: "10px",
                padding: "10px 14px",
                cursor: "pointer"
              }}
            >
              Reset to sample data
            </button>
          </div>
        </div>
        <div style={{
          marginTop: "40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px"
        }}>
          <div style={{
            backgroundColor: "#1e293b",
            padding: "20px",
            borderRadius: "16px",
            border: "1px solid #334155"
          }}>
            <p style={{ color: "#94a3b8", margin: "0 0 8px" }}>
              Total Events
            </p>
            <h2 style={{ fontSize: "36px", margin: 0 }}>{totalEvents}</h2>
          </div>

          <div style={{
            backgroundColor: "#1e293b",
            padding: "20px",
            borderRadius: "16px",
            border: "1px solid #334155"
          }}>
            <p style={{ color: "#94a3b8", margin: "0 0 8px" }}>
              Failed Events
            </p>
            <h2 style={{ fontSize: "36px", margin: 0 }}>{failedEvents}</h2>
          </div>

          <div style={{
            backgroundColor: "#1e293b",
            padding: "20px",
            borderRadius: "16px",
            border: "1px solid #334155"
          }}>
            <p style={{ color: "#94a3b8", margin: "0 0 8px" }}>
              Warnings
            </p>
            <h2 style={{ fontSize: "36px", margin: 0 }}>{warningEvents}</h2>
          </div>

          <div style={{
            backgroundColor: "#1e293b",
            padding: "20px",
            borderRadius: "16px",
            border: "1px solid #334155"
          }}>
            <p style={{ color: "#94a3b8", margin: "0 0 8px" }}>
              Failure Rate
            </p>
            <h2 style={{ fontSize: "36px", margin: 0 }}>{failureRate}%</h2>
          </div>
          

          <div style={{
            backgroundColor: "#1e293b",
            padding: "20px",
            borderRadius: "16px",
            border: "1px solid #334155"
          }}>
            <p style={{ color: "#94a3b8", margin: "0 0 8px" }}>
              Most Problematic Device
            </p>
            <h2 style={{ fontSize: "36px", margin: 0 }}>
              {mostProblematicDevice ? mostProblematicDevice[0] : "N/A"}
            </h2>
            <p style={{ color: "#cbd5e1", margin: "8px 0 0" }}>
              {mostProblematicDevice ? `${mostProblematicDevice[1]} failed events detected` : "No failures detected"}
            </p>
          </div>
        </div>

        <div style={{
          marginTop: "40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px"
        }}>
          <div style={{
            backgroundColor: "#1e293b",
            padding: "24px",
            borderRadius: "16px"
          }}>
            <h2>Analyze Events</h2>
            <p>Review fictional access-control logs and identify operational patterns.</p>
          </div>

          <div style={{
            backgroundColor: "#1e293b",
            padding: "24px",
            borderRadius: "16px"
          }}>
            <h2>Detect Failures</h2>
            <p>Spot devices, locations, or time periods with repeated authentication issues.</p>
          </div>

          <div style={{
            backgroundColor: "#1e293b",
            padding: "24px",
            borderRadius: "16px"
          }}>
            <h2>Draft Tickets</h2>
            <p>Generate structured support ticket drafts for follow-up actions.</p>
          </div>
        </div>
        <section style={{
          marginTop: "48px",
          backgroundColor: "#1e293b",
          borderRadius: "16px",
          padding: "24px",
          border: "1px solid #334155"
        }}>
          <p style={{
            color: "#38bdf8",
            fontSize: "14px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            margin: "0 0 12px"
          }}>
            Automated Operational Insight
          </p>

          <h2 style={{
            marginTop: 0,
            marginBottom: "12px"
          }}>
            Recommended Review
          </h2>

          <p style={{
            fontSize: "18px",
            lineHeight: "1.6",
            color: "#cbd5e1",
            margin: 0
          }}>
            {operationalInsight}
          </p>
        </section>
        <section style={{
          marginTop: "24px",
          backgroundColor: "#1e293b",
          borderRadius: "16px",
          padding: "24px",
          border: "1px solid #334155"
        }}>
          <p style={{
            color: "#38bdf8",
            fontSize: "14px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            margin: "0 0 12px"
          }}>
            Support Ticket Draft
          </p>

          <h2 style={{
            marginTop: 0,
            marginBottom: "12px"
          }}>
            {ticketDraft.title}
          </h2>

          <p style={{
            color: "#facc15",
            fontWeight: "bold",
            marginBottom: "16px"
          }}>
            Priority: {ticketDraft.priority}
          </p>
          {mostAffectedLocation && (
            <p style={{
              color: "#cbd5e1",
              fontWeight: "bold",
              marginBottom: "16px"
            }}>
              Most affected location: {mostAffectedLocation[0]}
            </p>
          )}

          <p style={{
            fontSize: "18px",
            lineHeight: "1.6",
            color: "#cbd5e1"
          }}>
            {ticketDraft.summary}
          </p>

          <h3 style={{
            marginTop: "24px",
            marginBottom: "12px"
          }}>
            Suggested Actions
          </h3>

          <ul style={{
            color: "#cbd5e1",
            lineHeight: "1.8",
            paddingLeft: "20px",
            marginBottom: 0
          }}>
            {ticketDraft.suggestedActions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        </section>
        <section style={{
          marginTop: "48px",
          backgroundColor: "#1e293b",
          borderRadius: "16px",
          padding: "24px",
          overflowX: "auto"
        }}>
          <h2 style={{
            marginTop: 0,
            marginBottom: "16px"
          }}>
            Access Event Logs
          </h2>

          <table style={{
            width: "100%",
            borderCollapse: "collapse"
          }}>
            <thead>
              <tr style={{
                color: "#93c5fd",
                textAlign: "left",
                borderBottom: "1px solid #334155"
              }}>
                <th style={{ padding: "12px" }}>Time</th>
                <th style={{ padding: "12px" }}>Location</th>
                <th style={{ padding: "12px" }}>Device</th>
                <th style={{ padding: "12px" }}>Event Type</th>
                <th style={{ padding: "12px" }}>Status</th>
                <th style={{ padding: "12px" }}>Notes</th>
              </tr>
            </thead>

            <tbody>
            {events.map((event) => (
                <tr key={event.id} style={{
                  borderBottom: "1px solid #334155"
                }}>
                  <td style={{ padding: "12px" }}>{event.timestamp}</td>
                  <td style={{ padding: "12px" }}>{event.location}</td>
                  <td style={{ padding: "12px" }}>{event.deviceId}</td>
                  <td style={{ padding: "12px" }}>{event.eventType}</td>
                  <td style={{ padding: "12px" }}>{event.status}</td>
                  <td style={{ padding: "12px", color: "#cbd5e1" }}>{event.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </main>
  )
}

export default App