export interface SimpleOptions {
  text: string;
  width: number;
  height: number;
  host: string;
  port: number;
  format: string;
  fileName: string;
  dashboardUrl: string;
  token: string;
}

function getDBUrl() {
  const { origin, pathname } = window.location;
  return origin + pathname + 500;
}

export const defaults: SimpleOptions = {
  text: 'Export Dashboard',
  width: 300,
  height: 100,
  host: 'http://127.0.0.1',
  port: 1337,
  format: 'A3',
  fileName: 'grafana-dashboard',
  dashboardUrl: getDBUrl(),
  token: '',
};
