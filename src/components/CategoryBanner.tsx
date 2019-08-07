import React from 'react';

interface Props {
  text: string;
}

const CategoryBanner = ({ text }: Props) => <h1>{text}</h1>;

export default CategoryBanner;
