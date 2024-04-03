import { Outlet, Navigate } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";
import Spline from "@splinetool/react-spline";

export default function AuthLayout() {
  const { isAuthenticated } = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <div className="flex-1">
            <Spline scene="https://prod.spline.design/n-jcr-WS28CAsiIq/scene.splinecode" />
          </div>
        </>
      )}
    </>
  )
}