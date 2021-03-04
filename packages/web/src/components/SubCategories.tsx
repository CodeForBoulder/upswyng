import { Link, useParams } from "react-router-dom";
import { TResourceCategory, TResourceSubcategory } from "../webTypes";

import React from "react";
import SubCategoryButton from "./SubCategoryButton";
import { font } from "../App.styles";
import makeStyles from "@material-ui/styles/makeStyles";
import { useTranslation } from "react-i18next";

interface Props {
  category: TResourceCategory;
  color: string;
  subCategories: TResourceSubcategory[];
}

const subCategoryHorizontalSpacing = 5;

const useStyles = makeStyles({
  list: {
    display: "flex",
    flexDirection: "row",
    margin: `${font.helpers.convertPixelsToRems(
      10
    )} ${font.helpers.convertPixelsToRems(-subCategoryHorizontalSpacing)} 0`,
    overflowX: "scroll",
    padding: `${font.helpers.convertPixelsToRems(
      10
    )} 0 ${font.helpers.convertPixelsToRems(10)}`,
    width: "auto",
  },
  listItem: {
    flex: "0 0 auto",
    listStyleType: "none",
    margin: `0 ${font.helpers.convertPixelsToRems(
      subCategoryHorizontalSpacing
    )}`,
  },
  link: {
    "&:link,&:visited,&:hover,&:active": {
      textDecoration: "none",
    },
  },
});

const SubCategories = ({ category, color, subCategories }: Props) => {
  const classes = useStyles();
  const params = useParams<{ subcategory?: string }>();
  const { t } = useTranslation(["subcategories"]);

  const { stub: categoryStub } = category;

  const currentSubCategoryStub = params.subcategory ? params.subcategory : null;

  return (
    <ul className={classes.list}>
      <li className={classes.listItem}>
        <Link className={classes.link} to={`/${categoryStub}`}>
          <SubCategoryButton
            buttonColor={color}
            isSelected={!currentSubCategoryStub}
          >
            {t("all")}
          </SubCategoryButton>
        </Link>
      </li>
      {subCategories.map(subCategory => {
        const { translationKey, stub: subcategoryStub } = subCategory;
        return (
          <li className={classes.listItem} key={subcategoryStub}>
            <Link
              className={classes.link}
              to={`/${categoryStub}/${subcategoryStub}`}
            >
              <SubCategoryButton
                buttonColor={color}
                isSelected={currentSubCategoryStub === subcategoryStub}
              >
                {t(translationKey)}
              </SubCategoryButton>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SubCategories;
