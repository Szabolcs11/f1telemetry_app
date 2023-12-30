import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Charts from "../../components/TelemetryCharts/Charts";
import { ENDPOINTS } from "../../constans";
import { LapData } from "../../types";

function Duel() {
  const [sessions, setSessions] = useState<string[]>([]);

  const [selectedSession, setSelectedSession] = useState<string>("");
  const [selectedLaps, setSelectedLaps] = useState<string[]>([]);
  const [selectedLap, setSelectedLap] = useState<string>("");
  const [selectedLapData, setSelectedLapData] = useState<LapData[]>([]);

  const [selectedSessionToCompare, setSelectedSessionToCompare] = useState<string>("");
  const [selectedLapsToCompare, setSelectedLapsToCompare] = useState<string[]>([]);
  const [selectedLapToCompare, setSelectedLapToCompare] = useState<string>("");
  const [selectedLapDataToCompare, setSelectedLapDataToCompare] = useState<LapData[]>([]);

  const fetchSessions = async () => {
    const res = await axios.get(ENDPOINTS.SESSIONS).catch((err) => console.log(err));
    if (res?.data.success) {
      setSessions(res.data.sessions);
    }
  };

  const fetchSessionLaps = async (sessionId: string, original: boolean) => {
    const res = await axios.get(ENDPOINTS.SESSION(sessionId)).catch((err) => console.log(err));
    if (res?.data.success) {
      if (original) {
        setSelectedLaps(res.data.files);
      } else {
        setSelectedLapsToCompare(res.data.files);
      }
    }
  };

  const fetchLap = async (sessionId: string, lapId: string, original: boolean) => {
    const res = await axios.get(ENDPOINTS.SESSION_LAP_DATA(sessionId, lapId)).catch((err) => console.log(err));
    if (res?.data.success) {
      if (original) {
        setSelectedLapData(res.data.data);
      } else {
        setSelectedLapDataToCompare(res.data.data);
      }
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    setSelectedLaps([]);
    setSelectedLapsToCompare([]);
    setSelectedLapData([]);
    setSelectedLapDataToCompare([]);
    if (!selectedSession || selectedSession == "Select a session") {
      return;
    }
    fetchSessionLaps(selectedSession, true);
  }, [selectedSession]);

  useEffect(() => {
    if (!selectedLap || selectedLap == "Select a lap") return;
    fetchLap(selectedSession, selectedLap, true);
  }, [selectedLap]);

  useEffect(() => {
    if (!selectedSessionToCompare || selectedSessionToCompare == "Select a session") return;
    fetchSessionLaps(selectedSessionToCompare, false);
    setSelectedLapDataToCompare([]);
  }, [selectedSessionToCompare]);

  useEffect(() => {
    if (!selectedLapToCompare || selectedLapToCompare == "Select a lap") return;
    fetchLap(selectedSessionToCompare, selectedLapToCompare, false);
  }, [selectedLapToCompare]);

  const formatSession = (str: string) => {
    let arr = str.split("_");
    let outputString = `#${arr[arr.length - 1]}_${arr[0]}_${arr[1]}_${arr[arr.length - 3]}`;
    return outputString;
  };
  return (
    <div style={{ marginTop: "1rem" }}>
      {/* <div className="fs-4 m-4" style={{ textAlign: "center" }}></div> */}
      <div className="fs-3 m-4" style={{ textAlign: "center" }}>
        Duel
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "100%", marginTop: "1rem" }}>
          <p className="text-center">Sessions</p>
          <Container className="d-flex justify-content-center">
            <Form.Select
              aria-label="Default select example"
              className="text-center w-50"
              onChange={(e) => setSelectedSession(e.target.value)}
            >
              <option>Select a session</option>
              {sessions.map((e) => (
                <option value={e} key={e}>
                  {formatSession(e)}
                </option>
              ))}
            </Form.Select>
          </Container>
          {selectedLaps.length && selectedSession ? (
            <div className="m-3">
              <p className="text-center">Laps</p>
              <Container className="d-flex justify-content-center">
                <Form.Select
                  aria-label="Default select example"
                  className="text-center w-50"
                  onChange={(e) => setSelectedLap(e.target.value)}
                >
                  <option>Select a lap</option>
                  {selectedLaps.map((e) => (
                    <option value={e} key={e}>
                      {"#" + e.replace(".txt", "")}
                    </option>
                  ))}
                </Form.Select>
              </Container>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div style={{ width: "100%", marginTop: "1rem" }}>
          <p className="text-center">Sessions</p>
          <Container className="d-flex justify-content-center">
            <Form.Select
              aria-label="Default select example"
              className="text-center w-50"
              onChange={(e) => setSelectedSessionToCompare(e.target.value)}
            >
              <option>Select a session</option>
              {sessions
                .filter((e) => e.includes(selectedSession.split("_")[1]))
                .map((e) => (
                  <option value={e} key={e}>
                    {formatSession(e)}
                  </option>
                ))}
            </Form.Select>
          </Container>
          {selectedLapsToCompare.length && selectedSessionToCompare ? (
            <div className="m-3">
              <p className="text-center">Laps</p>
              <Container className="d-flex justify-content-center">
                <Form.Select
                  aria-label="Default select example"
                  className="text-center w-50"
                  onChange={(e) => setSelectedLapToCompare(e.target.value)}
                >
                  <option>Select a lap</option>
                  {selectedLapsToCompare.map((e) => (
                    <option value={e} key={e}>
                      {"#" + e.replace(".txt", "")}
                    </option>
                  ))}
                </Form.Select>
              </Container>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {selectedLapDataToCompare.length && selectedLapData.length ? (
        <div>
          <Charts data={selectedLapData} Type="Duel" dataToCompare={selectedLapDataToCompare} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Duel;
