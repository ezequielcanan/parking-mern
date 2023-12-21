import Link from "../Link"
import { useState } from "react"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"

const Navbar = () => {
  const [nav, setNav] = useState(false)

  const sections = [
    {
      path: "/",
      text: "Home"
    },
    {
      path: "/vehicles",
      text: "Pending"
    },
    {
      path: "/report",
      text: "Report"
    },
    {
      path: "/payment",
      text: "Vehicle Payment"
    },
    {
      path: "/prices",
      text: "Prices"
    }
  ]

  return (
    <header className="w-full bg-primary h-[120px] fixed z-50">
      <nav className="w-full h-full flex justify-between items-center px-[15px] md:px-[55px]">
        <h1 className="text-2xl 2xl:text-4xl text-fourth before:content-['Smart'] before:text-third font-bold">Parking</h1>
        <ul className="hidden 2xl:flex text-sixth font-regular text-2xl gap-x-[70px]">
          {sections.map((s) => {
            return <li key={s.text} className="flex">
              <Link {...s} />
            </li>
          })}
        </ul>
        <div className="2xl:hidden flex" onClick={() => setNav(!nav)}>
          {nav ? <AiOutlineClose size={30} color="11ddff" /> : <AiOutlineMenu size={30} color="#11ddff" />}
        </div>
        <ul className={(nav ? "fixed left-0 bg-primary/70 ease-in-out duration-300" : "ease duration-[1.5s] fixed left-[-100%]") + " text-sixth text-2xl font-bold top-[100px] backdrop-blur-md w-full h-screen flex flex-col justify-center gap-y-16 px-8 py-10 items-center 2xl:hidden"}>
          {sections.map((s) => {
            return <li key={s.text} className="flex w-full text-center" onClick={() => setNav(false)}>
              <Link {...s} />
            </li>
          })}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar