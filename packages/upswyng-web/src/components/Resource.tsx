import { categories, TCategoryDefinition } from "./Categories";
import { colors, Container } from "../App.styles";
import { getSearchParamVal } from "../utils/searchParams";
import { SEARCH_PARAM_RESOURCE } from "../constants";
import { TResource } from "@upswyng/upswyng-types";
import BannerColorContext from "./BannerColorContext";
import Details, { DetailBody, DetailHeading } from "./Details";
import LoadingSpinner from "./LoadingSpinner";
import Map from "./Map";
import PageBanner from "./PageBanner";
import React from "react";
import Schedule from "./Schedule";
import Services from "./Services";
import useResource from "./useResource";

interface Props {
  id: string;
  resource: TResource;
}

const renderAddressContent = (resource: TResource) => {
  const {
    address: { address1, address2, city, state, zip },
  } = resource;

  if (!address1 || !city || !state || !zip) {
    return <></>;
  }

  return (
    <>
      <DetailHeading>Address</DetailHeading>
      <DetailBody>
        <p>
          {" "}
          {address1}, {address2 ? `${address2},` : ""} {city}, {state} {zip}
        </p>
      </DetailBody>
    </>
  );
};

const renderPhoneContent = (resource: TResource) => {
  const { phone } = resource;
  if (!phone) {
    return <></>;
  }
  return (
    <>
      <DetailHeading>Phone</DetailHeading>
      <DetailBody>
        <p>{phone}</p>
      </DetailBody>
    </>
  );
};

const renderWebsiteContent = (resource: TResource) => {
  const { website } = resource;

  if (!website) {
    return <></>;
  }
  return (
    <>
      <DetailHeading>Website</DetailHeading>
      <DetailBody>
        <p>
          <a href={website} target="_blank" rel="noopener noreferrer">
            {website}
          </a>
        </p>
      </DetailBody>
    </>
  );
};

const renderErrorMessage = () => (
  <p>We&apos;re sorry, this service was not found.</p>
);

const getMainCategory = (categoryStub: string): TCategoryDefinition | null => {
  if (!categoryStub) {
    return null;
  }

  const [_, resourceMainCategoryInfo] = Object.entries(categories).find(
    ([_, categoryInfo]) => {
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

  if (!resourceId) {
    return <p>We&apos;re sorry, this service was not found.</p>;
  }
  const resource = useResource(resourceId);

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
    <Container>
      <PageBanner
        color={currentBannerColor || colors[resourceCategoryColorName]}
        text={name}
      />
      <Details>
        {renderAddressContent(resource)}
        {renderPhoneContent(resource)}
        {renderWebsiteContent(resource)}
        <DetailHeading>Schedule</DetailHeading>
        <DetailBody>
          <Schedule schedule={schedule} />
        </DetailBody>
        <DetailHeading>Services</DetailHeading>
        <DetailBody>
          <Services resource={resource} />
        </DetailBody>
      </Details>
      {resource.latitude && resource.longitude && (
        <Map
          address={resource.address}
          name={resource.name}
          latitude={resource.latitude}
          longitude={resource.longitude}
        />
      )}
    </Container>
  );
};

export default Resource;
