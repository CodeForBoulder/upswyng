import { TAlertFull, TStatusFetch } from "@upswyng/upswyng-types";
import { useEffect, useState } from "react";
import { TAlertsPayload } from "../webTypes";
import apiClient from "../utils/apiClient";

function useSearchResults(): [TStatusFetch, TAlertFull[] | null] {
  const [status, setStatus] = useState<TStatusFetch>(
    TStatusFetch.STATUS_NOT_FETCHED
  );
  const [alertsPayload, setAlertsPayload] = useState<null | TAlertFull[]>(null);

  useEffect(() => {
    const getAlerts = async (): Promise<void> => {
      try {
        setStatus(TStatusFetch.STATUS_FETCHING);
        setAlertsPayload(null);
        const now = new Date();
        const { data } = await apiClient.post<TAlertsPayload>(`/alert/search`, {
          end: now,
        });

        setStatus(TStatusFetch.STATUS_FETCH_SUCCESS);
        setAlertsPayload(data.alerts || null);
      } catch (err) {
        // TODO: log this error
        setStatus(TStatusFetch.STATUS_FETCH_ERROR);
        setAlertsPayload(null);
      }
    };

    getAlerts();
  }, []);

  return [status, alertsPayload];
}

export default useSearchResults;
