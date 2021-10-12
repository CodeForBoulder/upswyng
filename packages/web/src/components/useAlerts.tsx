import { TAlert, TStatusFetch } from "@upswyng/types";
import { TAlertsBody, TAlertsPayload } from "../webTypes";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

import apiClient from "../utils/apiClient";

const GET_ALERTS_INTERVAL_MS = 300000; // 5 minutes

const useAlerts = (): [TStatusFetch, TAlert[] | null] => {
  const [status, setStatus] = useState<TStatusFetch>(
    TStatusFetch.STATUS_NOT_FETCHED
  );
  const [alertsPayload, setAlertsPayload] = useState<null | TAlert[]>(null);

  useEffect(() => {
    const getAlerts = async (): Promise<void> => {
      try {
        setStatus(TStatusFetch.STATUS_FETCHING);
        const { data } = await apiClient.post<
          TAlertsBody,
          AxiosResponse<TAlertsPayload>
        >(`/alert/search`, {
          start: new Date(),
        });

        setStatus(TStatusFetch.STATUS_FETCH_SUCCESS);
        setAlertsPayload(data.alerts || null);
      } catch (err) {
        // TODO: log this error
        setStatus(TStatusFetch.STATUS_FETCH_ERROR);
      }
    };

    getAlerts();
    const getTemperatureInterval = window.setInterval(
      getAlerts,
      GET_ALERTS_INTERVAL_MS
    );

    return () => window.clearInterval(getTemperatureInterval);
  }, []);

  return [status, alertsPayload];
};

export default useAlerts;
