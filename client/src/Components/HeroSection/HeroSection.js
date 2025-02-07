import { HashLink as Link } from "react-router-hash-link"
import "./HeroSection.css"

{/* <section className="py-10">
  <div className="2xl:container mx-auto">
    <div className="w-[90%] mx-auto grid grid-cols-1">

    </div>
  </div>
</section> */}


const HeroSection = () => {
  return (
    <>
      <section className="bg-black">
        <div className="2xl:container mx-auto" style={{"margin":"0px"}}>
          <div className="w-[90%] mx-auto h-screen text-center grid grid-cols-1">
            <div className="flex flex-col justify-center items-center gap-5">
              <h1 className="heading text-white">Làm cho chuỗi khối của bạn trở nên sống động với phần mềm sau</h1>

              <Link to="#Home">
                <button className="bg-white text-black font-[poppins] py-3 px-5 rounded-md">Bắt đầu</button>
              </Link>
            </div>
            <div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection