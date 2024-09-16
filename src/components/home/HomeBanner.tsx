import Spline from "@splinetool/react-spline/next";
import HomeTypewriter from "@/components/home/HomeTypeWriter";
import Link from "next/link";
import { Suspense } from "react";

export default function HomeBanner({
  loading,
  render3D,
}: {
  loading: JSX.Element;
  render3D: boolean;
}) {
  return (
    <Suspense fallback={loading}>
      <div className="w-screen h-screen bg-gray-300 opacity-10 absolute z-10 shadow-lg overflow-hidden"></div>
      <div
        className={`absolute z-20 top-[50%] left-[20%] ${
          render3D ? "text-white" : "text-primary-100"
        } text-4xl font-bold`}
      >
        <HomeTypewriter />
      </div>
      <div className="z-0 w-screen h-screen absolute overflow-hidden">
        {render3D ? (
          <Spline
            className=" "
            scene="https://prod.spline.design/cotODPUVEcpAU4CZ/scene.splinecode"
          />
        ) : (
          <></>
        )}
      </div>
      <div className="z-30 flex gap-2 fixed bottom-5 right-5 px-4 py-2 rounded-md bg-base-100">
        <Link
          target="_blank"
          href="https://github.com/Kiratopat-s"
          className="fa-brands fa-github text-center text-xl "
        ></Link>
      </div>
    </Suspense>
  );
}
