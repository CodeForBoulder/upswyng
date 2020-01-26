import { Container, colors } from "../App.styles";
import { TCategoryDefinition, categories } from "./Categories";

import BannerColorContext from "./BannerColorContext";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import LoadingSpinner from "./LoadingSpinner";
import Map from "./Map";
import PageBanner from "./PageBanner";
import React from "react";
import { SEARCH_PARAM_RESOURCE } from "../constants";
import Schedule from "./Schedule";
import Services from "./Services";
import { TResource } from "@upswyng/upswyng-types";
import Typography from "@material-ui/core/Typography";
import { getSearchParamVal } from "../utils/searchParams";
import useResource from "./useResource";

interface Props {
  id: string;
  resource: TResource;
}

const renderErrorMessage = () => (
  <p>We&apos;re sorry, this service was not found.</p>
);

const getMainCategory = (categoryStub: string): TCategoryDefinition | null => {
  if (!categoryStub) {
    return null;
  }

  const [, resourceMainCategoryInfo] = Object.entries(categories).find(
    ([, categoryInfo]) => {
      const {
        mainCategory: { stub: mainCategoryStub },
      } = categoryInfo;
      return mainCategoryStub === categoryStub;
    }
  ) || [undefined, null];

  return resourceMainCategoryInfo;
};

export const Resource = () => {
  const resourceId = getSearchParamVal(SEARCH_PARAM_RESOURCE);

  const { currentBannerColor } = React.useContext(BannerColorContext);

  const resource = useResource(resourceId || "");

  if (!resourceId) {
    return <p>We&apos;re sorry, this resource was not found.</p>;
  }

  if (resource === undefined) {
    return <LoadingSpinner />;
  }

  if (resource === null) {
    return renderErrorMessage();
  }

  const { name, schedule, subcategories } = resource;

  const defaultCategoryStub = subcategories.length
    ? subcategories[0].parentCategory.stub
    : "";
  const mainCategoryDefinition = defaultCategoryStub
    ? getMainCategory(defaultCategoryStub)
    : null;
  const resourceCategoryColorName = mainCategoryDefinition
    ? mainCategoryDefinition.color
    : "black";

  return (
    <>
      <Container>
        <PageBanner
          color={currentBannerColor || colors[resourceCategoryColorName]}
          text={name}
        />
      </Container>
      <Container>
        <Grid container direction="column" spacing={2}>
          {resource.address && (
            <Grid item>
              <Typography variant="h2">Address</Typography>
              <Typography>{resource.address.address1}</Typography>
              {resource.address.address2 && (
                <Typography>{resource.address.address2}</Typography>
              )}
              <Typography>
                {resource.address.city}, {resource.address.state}
              </Typography>
              <Typography>{resource.address.zip}</Typography>
            </Grid>
          )}
          {resource.phone && (
            <Grid item>
              <Typography variant="h2">Phone</Typography>
              <Typography>{resource.phone}</Typography>
            </Grid>
          )}
          {resource.website && (
            <Grid item>
              <Typography variant="h2">Website</Typography>
              <Typography>
                <Link
                  href={resource.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.website}
                </Link>
              </Typography>
            </Grid>
          )}
          <Grid item>
            <Typography variant="h2">Schedule</Typography>
            <Schedule schedule={schedule} />
          </Grid>
          <Grid item>
            <Typography variant="h2">Services</Typography>
            <Services resource={resource} />
          </Grid>
        </Grid>
        {resource.latitude && resource.longitude && (
          <Map
            address={resource.address}
            name={resource.name}
            latitude={resource.latitude}
            longitude={resource.longitude}
          />
        )}
      </Container>
    </>
  );
};

export default Resource;
