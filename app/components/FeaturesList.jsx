import { MdOutlineBathtub, MdOutlineKingBed } from 'react-icons/md'
import { TbRulerMeasure } from 'react-icons/tb'

const FeaturesList = ({ features }) => {
  return (

    <ul title="Property Features">
        {features.map((feature, i) => {
          return (
           <li key={i} className="flex flex-row items-center text-lg space-x-2" title={feature.title.en}>
              {feature.title.en === 'Bedrooms' && <MdOutlineKingBed className="text-2xl"/>}
              {feature.title.en === 'Bathrooms' && <MdOutlineBathtub className="text-2xl" />}
              {feature.title.en === 'Construction Size (M2)' && <TbRulerMeasure className="text-2xl" />}
              <span>
                {feature.value} {feature.title.en}
              </span>
           </li> 
          )
        })}
    </ul>

  )
}

export default FeaturesList