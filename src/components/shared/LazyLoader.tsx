import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const Loader = () => {
    let b1 = "linear-gradient(90deg, #581c87, #6b21a8, #6b21a8 ,#86198f, #701a75 )";
    let b2 = "linear-gradient(90deg, #701a75, #581c87, #6b21a8, #6b21a8, #86198f )";
    let b3 = "linear-gradient(90deg, #86198f, #701a75, #581c87 , #6b21a8, #6b21a8 ) ";
    let b4 = "linear-gradient(90deg, #6b21a8, #86198f, #701a75 , #581c87, #6b21a8 ) ";
    let b5 = "linear-gradient(90deg, #6b21a8, #6b21a8, #86198f , #701a75, #581c87 ) ";
    useGSAP(() =>{
    gsap.timeline({repeat:-1, repeatDelay:0})
      .add(gsap.set(".loader-maincard", {ease: "none", duration: 1 ,background: b1}))
      .add(gsap.to(".loader-maincard", {ease: "none", duration: 0.3, background: b2}))
      .add(gsap.to(".loader-maincard", {ease: "none", duration: 0.3, background: b3}))
      .add(gsap.to(".loader-maincard", {ease: "none", duration: 0.3, background: b4}))
      .add(gsap.to(".loader-maincard", {ease: "none", duration: 0.3, background: b5}))
      .play(5)
    })

    return (
        <div className="flex flex-col">
            <div className="flex gap-10">
                <div className="w-[10%]">
                    <div className="loader-maincard flex gap-4 items-center p-9 mt-10 rounded-full" />
                </div>
                <div className="loader-maincard p-9 mt-10 lg:p-9 rounded-3xl" />
            </div>
            <div className="loader-maincard p-40 mt-5 lg:p-40 rounded-3xl" />
            <div className="flex w-[40%] gap-20">
                <div className="loader-maincard flex gap-4 items-center p-5 mt-10 lg:p-5 rounded-3xl" />
            </div>
            <div className="flex flex-col gap-50">
                <div className="flex gap-5">
                    <div className="w-[5%]">
                        <div className="loader-maincard flex gap-4 items-center p-5 mt-10 rounded-full" />
                    </div>
                    <div className="loader-maincard flex gap-4 items-center p-5 mt-10 lg:p-9 rounded-3xl" />
                </div>
                <div className="flex gap-5">
                    <div className="w-[5%]">
                        <div className="loader-maincard flex gap-4 items-center p-5 mt-10 rounded-full" />
                    </div>
                    <div className="loader-maincard flex gap-4 items-center p-5 mt-10 lg:p-5 rounded-3xl" />
                </div>
            </div>
        </div>

    )
  }
  
  export default Loader
  