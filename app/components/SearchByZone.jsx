import { useRefinementList, useClearRefinements  } from 'react-instantsearch';
import { regions } from "@/data"

export default function SearchByZone () {

    const { refine } = useRefinementList({attribute: "zoneId", limit: 40});
    const { refine: clear } = useClearRefinements({attribute: "zoneId"})

    const setZone = (id) => {
        clear()
        refine(id)
    }

    return (
                <select 
                    title="Select Zone"
                    name="zone"
                    id="zone"
                    defaultValue="Select Zone To Search"
                    className="form-select"
                    onChange={(e) => setZone(e.target.value)}
                >
                        <option disabled value="Select Zone To Search" className="hidden">
                            Select Zone To Search
                        </option>

                        {regions?.map((region, i) => {
                        return (
                            <optgroup 
                                key={i} 
                                label={region.title}
                                title={region.title}
                            >
                            {region.zones?.map((zone, i) => {
                                return (
                                    <option 
                                        title={zone.title} 
                                        key={i} 
                                        value={zone.id}
                                    >
                                        {zone.title}
                                    </option>
                                )
                            })}
                        </optgroup>
                    )
                    })}
            </select>
    )

}