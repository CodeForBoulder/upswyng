import { TAlertFull, TStatusFetch } from "@upswyng/upswyng-types";
import { useEffect, useState } from "react";
import { TAlertsPayload } from "../webTypes";
import apiClient from "../utils/apiClient";

function useSearchResults(): [TStatusFetch, TAlertFull[] | null] {
  const [status, setStatus] = useState<TStatusFetch>(
    TStatusFetch.STATUS_NOT_FETCHED
  );
  const [alerts, setAlerts] = useState<null | TAlertFull[]>(null);

  useEffect(() => {
    const getAlerts = async (): Promise<void> => {
      try {
        setStatus(TStatusFetch.STATUS_FETCHING);
        setAlerts(null);
        const { data } = await apiClient.post<TAlertsPayload>(`/alert/search`, {
          end: new Date(),
        });

        setStatus(TStatusFetch.STATUS_FETCH_SUCCESS);
        setAlerts(data?.alerts || null);
      } catch (err) {
        // TODO: log this error
        setStatus(TStatusFetch.STATUS_FETCH_ERROR);
        setAlerts(null);
      }
    };

    getAlerts();
  }, []);

  return [status, alerts];
}

export default useSearchResults;
