import React from 'react';
import { TResourceCategory } from '../types';
import { colors, Container } from '../App.styles';
import CategoryResults from './CategoryResults';

const categoryColor = colors.lavendar;
const category: TResourceCategory = {
  text: 'Job Training',
  query: 'CATEGORY-jobTraining'
};
const subCategories: TResourceCategory[] = [
  {
    text: 'Craigs List',
    query: 'SUBCATEGORY-jobTraining-craigsList'
  },
  {
    text: 'Temp Agency',
    query: 'SUBCATEGORY-jobTraining-tempAgency'
  },
  {
    text: 'Day Labor',
    query: 'SUBCATEGORY-jobTraining-dayLabor'
  },
  {
    text: 'Ready to Work',
    query: 'SUBCATEGORY-jobTraining-readyToWork'
  },
  {
    text: 'Career Counseling',
    query: 'SUBCATEGORY-jobTraining-careerCounseling'
  }
];

const JobTraining = () => (
  <Container>
    <CategoryResults
      category={category}
      color={categoryColor}
      subCategories={subCategories}
    />
  </Container>
);

export default JobTraining;
