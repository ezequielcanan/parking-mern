import { NavLink } from "react-router-dom"

const Link = ({className, text, path}) => {
  return (
    <NavLink to={path} className={`${className} relative w-full h-full border border-sixth border-[3px] px-5 py-2 duration-300 ease-in-out z-10 hover:text-primary after:absolute after:w-0 after:h-full after:top-0 after:left-0 after:duration-300 after:bg-sixth after:-z-10 hover:after:w-full`}>{text}</NavLink>
  )
}

export default Link