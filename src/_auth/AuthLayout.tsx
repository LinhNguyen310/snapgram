import { Outlet, Navigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
const AuthLayout = () => {
  const isAuthenticated = false;

  console.log('AuthLayout');
  return (
    <>
      {isAuthenticated ? 
      (<Navigate to="/" />) : 
      (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          <div className="w-1/2">
            <Spline scene="https://prod.spline.design/n-jcr-WS28CAsiIq/scene.splinecode" />
          </div>
        </>

      )}
    </>
  )
}

export default AuthLayout;