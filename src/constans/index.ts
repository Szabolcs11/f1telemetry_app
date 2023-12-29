export const API_URL = 'http://localhost:2004/';
export const ENDPOINTS = {
    SESSIONS: API_URL + 'sessions',
    SESSION: (sessionId: string) => `${API_URL}session/${sessionId}/`,
    SESSION_LAP_DATA: (sessionId: string, fileName: string) => `${API_URL}session/${sessionId}/${fileName}`,
}