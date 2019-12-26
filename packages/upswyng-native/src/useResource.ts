import { TLegacyResource } from "@upswyng/upswyng-types";
import { useState, useEffect } from "react";

/**
 * TODO (rhinodavid): I removed firebase so this won't work until we make it depend on the server
 * Hook which provides a Resource record from Firebase
 *
 * @example
 * const CharityDisplay = props: {dataPath: string} => {
 *   const charityData: TResource | null = useResource(props.dataPath);
 *   return charityData ? (
 *     <div>
 *       <h1>{charityData.charityName}</h1>
 *       <p>{charityData.description}</p>
 *     </div>
 *   ) : (
 *     <Spinner />
 *   );
 * };
 */
function useResource(_dataPath: string): TLegacyResource | null {
  const [resource, _setResource] = useState(null);

  return resource;
}

export default useResource;
