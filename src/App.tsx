import React, { useState, useRef } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [isAlphabetical, setIsAlphabetical] = useState<boolean>(false);
  const [isByLength, setIsByLength] = useState<boolean>(false);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const reverseButtonRef = useRef<HTMLButtonElement | null>(null);

  const sortAlphabetically = (): void => {
    const sortedGoods = [...goodsFromServer].sort();

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setIsAlphabetical(true);
    setIsByLength(false);
    setIsReversed(false);
  };

  const sortByLength = (): void => {
    const sortedGoods = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setIsByLength(true);
    setIsAlphabetical(false);
    setIsReversed(false);
  };

  const reverseGoods = (): void => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(!isReversed);

    if (reverseButtonRef.current) {
      if (isReversed) {
        reverseButtonRef.current.classList.add('is-light');
      } else {
        reverseButtonRef.current.classList.remove('is-light');
      }
    }
  };

  const resetGoods = (): void => {
    setGoods([...goodsFromServer]);
    setIsAlphabetical(false);
    setIsByLength(false);
    setIsReversed(false);

    if (reverseButtonRef.current) {
      reverseButtonRef.current.classList.add('is-light');
    }
  };

  const isDefaultOrder = goods.join('') === goodsFromServer.join('');

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isAlphabetical ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isByLength ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          ref={reverseButtonRef}
          className="button is-warning is-light"
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {!isDefaultOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
