import SocialMediaButtons from "../../components/SocialMediaButtons"

const Home = () => {
  const socialMedias = ["FaInstagram", "FaTwitter", "FaWhatsapp"]

  return (
    <main className="w-full h-auto flex flex-col items-center bg-secondary min-h-screen pt-[220px] pb-[100px] gap-y-[120px]">
      <h2 className="text-6xl font-bold text-fourth before:content-['Smart'] before:text-third">Parking</h2>
      <div className="flex flex-col gap-y-[30px]">
        <article className="text-2xl text-fifth">
          <p>A <b className="text-third">smart</b> solution for managing your parking. You can control the monthly payments and the vehicles per hour.</p>
        </article>
        <h3 className="text-3xl text-fifth">If you want an extra feature or a change, you can call me here: +54 11 2650 5361</h3>
      </div>
      <div className="flex flex-col gap-y-[40px] items-center">
        <h4 className="text-4xl text-sixth font-bold">Social Media</h4>
        <div className="flex text-sixth gap-x-[30px] text-3xl justify-evenly">
          {
            socialMedias.map(s => {
              const SocialMedia = SocialMediaButtons[s]
              return <div key={s} className="relative p-3 rounded-full overflow-hidden duration-300 after:absolute after:w-0 after:h-1 after:top-[50%] after:left-[50%] after:duration-300 after:bg-sixth after:rounded-full hover:text-primary hover:after:w-full hover:after:h-full hover:after:left-0 hover:after:top-0">
                <SocialMedia className="relative z-10"/>
              </div>
            })
          }
        </div>
      </div>
    </main>
    )
}

export default Home