import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Charts from "../../components/TelemetryCharts/Charts";
import { ENDPOINTS } from "../../constans";
import { LapData } from "../../types";

function Simple() {
  const [sessions, setSessions] = useState<string[]>([]);
  const [selectedSession, setSelectedSession] = useState<string>("");

  const [selectedLaps, setSelectedLaps] = useState<string[]>([]);
  const [selectedLap, setSelectedLap] = useState<string>("");

  const [selectedLapData, setSelectedLapData] = useState<LapData[]>([]);

  const fetchSessions = async () => {
    const res = await axios.get(ENDPOINTS.SESSIONS).catch((err) => console.log(err));
    if (res?.data.success) {
      setSessions(res.data.sessions);
    }
  };

  const fetchSessionLaps = async (sessionId: string) => {
    const res = await axios.get(ENDPOINTS.SESSION(sessionId)).catch((err) => console.log(err));
    if (res?.data.success) {
      setSelectedLaps(res.data.files);
    }
  };

  const fetchLap = async (sessionId: string, lapId: string) => {
    const res = await axios.get(ENDPOINTS.SESSION_LAP_DATA(sessionId, lapId)).catch((err) => console.log(err));
    if (res?.data.success) {
      setSelectedLapData(res.data.data);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (!selectedSession || selectedSession == "Select a session") return;
    fetchSessionLaps(selectedSession);
    setSelectedLapData([]);
  }, [selectedSession]);

  useEffect(() => {
    if (!selectedLap || selectedLap == "Select a lap") return;
    fetchLap(selectedSession, selectedLap);
  }, [selectedLap]);

  const formatSession = (str: string) => {
    let arr = str.split("_");
    let outputString = `#${arr[arr.length - 1]}_${arr[0]}_${arr[1]}_${arr[arr.length - 3]}`;
    return outputString;
  };

  return (
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
      {selectedLaps && selectedSession ? (
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
      {selectedLapData.length > 0 ? (
        <div style={{ width: "100%" }}>
          <Charts Type="Single" data={selectedLapData} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Simple;
