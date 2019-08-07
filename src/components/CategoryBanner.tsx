import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  text: string;
}

const CategoryBanner = ({ text }: Props) => (
  <Link to="/">
    <h1>{text}</h1>
  </Link>
);

export default CategoryBanner;
