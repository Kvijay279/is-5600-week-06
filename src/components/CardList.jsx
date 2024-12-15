import React, { useState, useEffect } from "react";
import Card from './Card';
import Button from './Button';

function CardList({ data }) {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data.slice(0, limit));

  const handlePrevious = () => {
    if (offset > 0) setOffset(offset - limit);
  };

  const handleNext = () => {
    if (offset + limit < data.length) setOffset(offset + limit);
  };

  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, data]);

  const filterTags = (tagQuery) => {
    const filtered = data.filter((product) =>
      product.tags?.some((tag) => tag.title === tagQuery)
    );
    setOffset(0);
    setProducts(filtered.length > 0 ? filtered.slice(0, limit) : data.slice(0, limit));
  };

  return (
    <div className="cf pa2">
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" onClick={handlePrevious} />
        <Button text="Next" onClick={handleNext} />
      </div>
    </div>
  );
}

export default CardList;
