import { Outlet, Navigate } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";
import Spline from "@splinetool/react-spline";
import { useTheme } from "@/components/ui/theme-provider";

export default function AuthLayout() {
  const { isAuthenticated } = useUserContext();
  const { theme } = useTheme();
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
            {theme === "dark" ? (
                <Spline scene="https://prod.spline.design/n-jcr-WS28CAsiIq/scene.splinecode" />
            ) : (
              <Spline scene="https://prod.spline.design/cbCEp4Z-r6Y8I8cT/scene.splinecode" />
            )}
          </div>
        </>
      )}
    </>
  )
}