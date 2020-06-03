import apiClient from "../../utils/apiClient";
import { queryCache } from "react-query";
import { renderHook } from "@testing-library/react-hooks";
import useResourcesBySubcategory from "../useResourcesBySubcategory";

jest.mock("../../utils/apiClient.ts", () => ({
  get: jest.fn(),
}));
jest.mock("react-query", () => {
  const actualReactQuery = jest.requireActual("react-query");
  return {
    ...actualReactQuery,
    queryCache: {
      ...actualReactQuery.queryCache,
      getQueryData: jest.fn(),
    },
  };
});

const mockApiClientGet = apiClient.get as jest.Mock;
const mockQueryCache = queryCache.getQueryData as jest.Mock;

describe("useResourcesBySubcategory", () => {
  afterEach(() => {
    queryCache.clear();
  });

  it("fetches the resources by subcategory when the passed category resources have not been fetched", async () => {
    const mockResources = [
      {
        mock: "resourceObject",
      },
    ];
    const category = "food";
    const subcategory = "meals";

    // mock not having a resources by CATEGORY cached
    mockQueryCache.mockReturnValueOnce(null);
    // mock response of resources by SUBCATEGORY request
    mockApiClientGet.mockResolvedValueOnce({
      data: {
        subcategory: {
          resources: mockResources,
        },
      },
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useResourcesBySubcategory(category, subcategory)
    );
    // await async fetch
    await waitForNextUpdate();
    expect(result.current.data).toEqual(mockResources);
  });

  it("uses the cached resources by category filtered by subcategory as the initial value", () => {
    const category = "food";
    const subcategory = "meals";
    const mockSubCategoryResources = [
      {
        name: "First Resource of Requested Category",
        subcategories: [
          {
            stub: subcategory,
          },
        ],
      },
      {
        name: "Second Resource of Requested Category",
        subcategories: [
          {
            stub: subcategory,
          },
        ],
      },
    ];
    const mockCategoryResources = {
      category: {
        subcategories: [
          {
            stub: subcategory,
            resources: mockSubCategoryResources,
          },
          {
            stub: "pantries",
            resources: [
              {
                name: "First Resource Not of Requested Sub-Category",
                subcategories: [{ stub: "clothing" }],
              },
            ],
          },
        ],
      },
    };

    // mock having resources by CATEGORY cached
    mockQueryCache.mockReturnValueOnce(mockCategoryResources);

    const { result } = renderHook(() =>
      useResourcesBySubcategory(category, subcategory)
    );
    expect(result.current.data).toEqual(mockSubCategoryResources);
  });
});
