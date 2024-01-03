import { useState, useEffect } from "react"
import { useRange } from "react-instantsearch";
import { useCurrentRefinements } from "react-instantsearch";

const RangeSlider = () => {
  const { items } = useCurrentRefinements()

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const { refine } = useRange({
    attribute: 'price.search',
    min: 0,
    max: 10000000
  });

  const min = 0
  const max = 10000000
  const step = 50000

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(2000000);

    useEffect(() => {
      refine([minValue,maxValue])
    }, [ minValue, maxValue])
  

    const handleMinChange = e => {
      e.preventDefault();
      const newMinVal = Math.min(+e.target.value, maxValue - step);
      setMinValue(newMinVal);
    };
  
    const handleMaxChange = e => {
      e.preventDefault();
      const newMaxVal = Math.max(+e.target.value, minValue + step);
      setMaxValue(newMaxVal);
    };
  
    const minPos = ((minValue - min) / (max - min)) * 100;
    const maxPos = ((maxValue - min) / (max - min)) * 100;
  
    return (
      <div className="flex flex-col grow space-y-4 lg:space-y-0">
      <div className="flex flex-row items-center pb-4">
          <span className="text-lg font-medium mr-4">
              Price Range
          </span>
          <span>{formatter.format(minValue)} - {formatter.format(maxValue)}</span>
      </div>
      <div className="wrapper">
        <div className="input-wrapper">
          <input
            name="minPrice"
            id="minPrice"
            className="input"
            type="range"
            value={minValue}
            min={min}
            max={max}
            step={step}
            onChange={handleMinChange}
          />
          <input
            name="maxPrice"
            id="maxPrice"
            className="input"
            type="range"
            value={maxValue}
            min={min}
            max={max}
            step={step}
            onChange={handleMaxChange}
          />
        </div>
  
        <div className="control-wrapper">
          <div className="control" style={{ left: `${minPos}%` }} />
          <div className="rail">
            <div
              className="inner-rail" 
              style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
            />
          </div>
          <div className="control" style={{ left: `${maxPos}%` }} />
        </div>
      </div>
      </div>
    );
  };

  export default RangeSlider