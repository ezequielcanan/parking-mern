import { Link } from "react-router-dom"
import capitalize from "../../utils/string.utils.js"

const PriceCard = ({vehicle, hour, day, fraction}) => {
  const liClassName = "text-xl text-secondary"
  return  (
    <Link to={`/prices/${vehicle}`}>
      <div className="flex flex-col gap-y-[40px] shadow-2xl p-7 rounded-md bg-fourth">
        <h3 className="text-4xl text-primary font-semibold">{capitalize(vehicle)}</h3>
        <ul>
          <li className={liClassName}>Price per hour: {hour || "Undefined"}</li>
          <li className={liClassName}>Price per day: {day || "Undefined"}</li>
          <li className={liClassName}>Price per fraction: {fraction || "Undefined"}</li>
        </ul>
      </div>
    </Link>
  )
}

export default PriceCard