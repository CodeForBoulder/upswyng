import { TCategoryDefinition, categories } from "./Categories";

import BannerColorContext from "./BannerColorContext";
import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import FavoriteResourceFAB from "./FavoriteResourceFAB";
import Image from "material-ui-image";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LoadingSpinner from "./LoadingSpinner";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Map from "./Map";
import PageBanner from "./PageBanner";
import PhoneIcon from "@material-ui/icons/Phone";
import PublicIcon from "@material-ui/icons/Public";
import React from "react";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import { Link as RouterLink } from "react-router-dom";
import Schedule from "./Schedule";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Services from "./Services";
import { TResource } from "@upswyng/types";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Typography from "@material-ui/core/Typography";
import WarningIcon from "@material-ui/icons/Warning";
import { colors } from "@upswyng/common";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useHistory } from "react-router";
import { useLastLocation } from "react-router-last-location";
import { useParams } from "react-router-dom";
import useResources from "./useResources";
import { useTranslation } from "react-i18next";

const useListIconStyles = makeStyles((theme: Theme) => ({
  root: {
    alignSelf: "flex-start",
    marginTop: theme.spacing(0.5),
  },
}));

interface Props {
  id: string;
  resource: TResource;
}

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
  const { resourceId } = useParams();
  const { currentBannerColor } = React.useContext(BannerColorContext);
  const { data: resources, status } = useResources([resourceId || ""]);
  const resource = resources?.[0];
  const listIconClasses = useListIconStyles({});
  const history = useHistory();
  const lastLocation = useLastLocation();
  const { t } = useTranslation(["resource"]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "error" || !resource) {
    return (
      <Typography>We&apos;re sorry, this resource was not found.</Typography>
    );
  }

  const defaultCategoryStub = resource.subcategories.length
    ? resource.subcategories[0].parentCategory.stub
    : "";
  const mainCategoryDefinition = defaultCategoryStub
    ? getMainCategory(defaultCategoryStub)
    : null;
  const resourceCategoryColorName = mainCategoryDefinition
    ? mainCategoryDefinition.color
    : "black";
  const resourceColor = currentBannerColor || colors[resourceCategoryColorName];

  return (
    <Container>
      <PageBanner
        color={resourceColor}
        backButtonAction={lastLocation ? history.goBack : null}
      >
        <Typography variant="h1">{resource.name}</Typography>
      </PageBanner>
      {resource.streetViewImage && (
        <Image
          alt={`street view of ${resource.name}`}
          aspectRatio={457 / 250}
          color="none"
          src={resource.streetViewImage}
        />
      )}
      <List component="div">
        <ListItem component={Card}>
          <ListItemIcon classes={listIconClasses}>
            <WarningIcon color="secondary" />
          </ListItemIcon>
          <ListItemText>{`${t("covidWarning")} ${
            !!resource.website ? t("checkWebsite") : ""
          }`}</ListItemText>
        </ListItem>
        {resource.address && (
          <ListItem component="div">
            <ListItemIcon classes={listIconClasses}>
              <LocationOnIcon titleAccess={t("address")} />
            </ListItemIcon>
            <ListItemText>
              <Typography component="h2" variant="srOnly">
                {t("address")}
              </Typography>
              {resource.address.address1},{" "}
              {resource.address.address2 && <>{resource.address.address2}, </>}
              {resource.address.city}, {resource.address.state},{" "}
              {resource.address.zip}
            </ListItemText>
          </ListItem>
        )}
        {resource.phone && (
          <ListItem component="div">
            <ListItemIcon classes={listIconClasses}>
              <PhoneIcon titleAccess={t("phoneNumber")} />
            </ListItemIcon>
            <ListItemText>
              <Typography component="h2" variant="srOnly">
                {t("phoneNumber")}
              </Typography>
              {resource.phone}
            </ListItemText>
          </ListItem>
        )}
        {resource.website && (
          <ListItem component="div">
            <ListItemIcon classes={listIconClasses}>
              <PublicIcon titleAccess={t("website")} />
            </ListItemIcon>
            <ListItemText>
              <Typography component="h2" variant="srOnly">
                {t("website")}
              </Typography>
              <Typography noWrap={true} color="primary">
                <Link
                  href={resource.website}
                  rel="noopener noreferrer"
                  target="_blank"
                  underline="always"
                >
                  {resource.website}
                </Link>
              </Typography>
            </ListItemText>
          </ListItem>
        )}
        {!!resource.schedule._items.length && (
          <ListItem component="div">
            <ListItemIcon classes={listIconClasses}>
              <ScheduleIcon titleAccess={t("hoursOfOperation")} />
            </ListItemIcon>
            <ListItemText>
              <Typography component="h2" variant="srOnly">
                {t("hoursOfOperation")}
              </Typography>
              <Schedule schedule={resource.schedule} />
            </ListItemText>
          </ListItem>
        )}
        <ListItem component="div">
          <Typography variant="srOnly">{t("services")}</Typography>
          <Services resource={resource} />
        </ListItem>
      </List>
      {resource.latitude && resource.longitude && (
        <Map
          address={resource.address}
          name={resource.name}
          latitude={resource.latitude}
          longitude={resource.longitude}
        />
      )}
      <Button
        size="small"
        component={RouterLink}
        startIcon={<ReportProblemIcon color="secondary" />}
        to={`/report-issue/${resourceId}`}
      >
        {t("reportAProblem")}
      </Button>
      <FavoriteResourceFAB resourceId={resourceId} />
    </Container>
  );
};

export default Resource;
