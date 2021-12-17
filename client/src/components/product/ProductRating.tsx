import React from 'react';

interface Props {
  rating: number;
}

export default function ProductRating(props: Props) {
  const { rating } = props;

  const afterComma = Number(rating.toString().charAt(2));
  const wholeRating = Math.trunc(rating);
  const restRating = afterComma > 4 ? 5 - wholeRating - 1 : 5 - wholeRating;

  const getWholeRating = () => {
    return Array.from(Array(wholeRating).keys());
  };
  const getEmptyRating = () => {
    return Array.from(Array(restRating).keys());
  };

  return (
    <>
      {getWholeRating().map((el, index) => (
        <i key={index} className='bi bi-star-fill text-warning'></i>
      ))}
      {afterComma > 4 && <i className='bi bi-star-half text-warning'></i>}
      {getEmptyRating().map((el, index) => (
        <i key={index} className='bi bi-star text-warning'></i>
      ))}
    </>
  );
}
