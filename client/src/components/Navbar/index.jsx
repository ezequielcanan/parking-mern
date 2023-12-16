import Link from "../Link"

const Navbar = () => {

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
      path: "/monthly",
      text: "Monthly"
    }
  ]

  return (
    <header className="w-full bg-primary h-[120px] fixed z-50">
      <nav className="w-full h-full flex justify-between items-center px-[55px]">
        <h1 className="text-4xl text-fourth before:content-['Smart'] before:text-third font-bold">Parking</h1>
        <ul className="flex text-sixth font-regular text-2xl gap-x-[70px]">
          {sections.map((s) => {
            return <li key={s.text} className="flex">
              <Link {...s}/>
            </li>
          })}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar