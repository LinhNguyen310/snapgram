import { Outlet, Navigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? 
      (<Navigate to="/" />) : 
      (
        <div className="flex">
          <div className="h-screen flex-1 flex items-center justify-center">
            <section>
              <Outlet />
            </section>
          </div>
          <div className="flex-1">
            <Spline scene="https://prod.spline.design/n-jcr-WS28CAsiIq/scene.splinecode" />
          </div>
        </div>
      )}
    </>
  )
}

export default AuthLayout;