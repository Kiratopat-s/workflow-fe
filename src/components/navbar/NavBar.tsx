"use client";
import { useAuth } from "@/context/AuthContext";
import { useItemStatus } from "@/context/ItemStatusContext";
import { ItemStatus } from "@/enum/Item";
import { AppPath } from "@/enum/Path";
import { PackageOpen } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function NavberButton({ title }: { title: string }) {
  return (
    <button className="btn">
      <i className="fa-solid fa-right-to-bracket"></i>
      {title}
    </button>
  );
}
function NavBar() {
  const pathname = usePathname();
  const { itemStatus, fetchItemStatus } = useItemStatus();
  const { user, isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    console.log(isAuthenticated);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const ToggleThemeHandler = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="sticky top-0 z-50">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost text-xl">
            Workflow
          </Link>
        </div>
        <div className="flex gap-2">
          <div className="flex-none">
            <label className="hidden" htmlFor="toggleTheme">
              ChangeTheme
            </label>
            <input
              type="checkbox"
              id="toggleTheme"
              className="toggle self-center align-middle"
              checked={resolvedTheme === "dark"}
              onChange={ToggleThemeHandler}
            />
          </div>
          {isAuthenticated ? (
            <>
              {pathname === AppPath.add ? (
                <button
                  className="btn btn-outline btn-accent btn-sm cursor-pointer"
                  onClick={() => window.history.back()}
                >
                  Back
                </button>
              ) : (
                <Link
                  className="btn btn-accent btn-sm cursor-pointer"
                  href={"/add"}
                >
                  New
                </Link>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="flex-none">
          {isAuthenticated ? (
            <div className="flex gap-2">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <PackageOpen />
                    <span className="badge badge-sm indicator-item text-info">
                      {itemStatus.PENDING || 0}
                    </span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold">My item</span>
                    <span className="text-info">
                      {ItemStatus.PENDING} : {itemStatus.PENDING || 0}
                    </span>
                    <span className="text-success">
                      {ItemStatus.APPROVED} : {itemStatus.APPROVED || 0}
                    </span>
                    <span className="text-error">
                      {ItemStatus.REJECTED} : {itemStatus.REJECTED || 0}
                    </span>
                    <div className="card-actions">
                      <Link
                        href={"/dashboard"}
                        className="btn btn-primary btn-block"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown dropdown-end flex gap-2">
                <div className="flex flex-col justify-center">
                  <div className="badge badge-accent badge-outline">
                    {user?.position || "user"}
                  </div>
                </div>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full ring-1 ring-base">
                    <Image
                      alt="User Avatar"
                      src={
                        user?.photoLink ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      width={500}
                      height={300}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link href={"/profile"}>Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link className="ml-4" href={"/login"}>
              <NavberButton title="Login" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
