// NavBar component
"use client";
import { useAuth } from "@/context/AuthContext";
import { PackageOpen } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
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
  const { user, isAuthenticated, logout } = useAuth(); // Subscribe to AuthContext
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);
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
        <div className="flex">
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
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary>Items</summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li>
                      <Link href={"/add"}>New</Link>
                    </li>
                    <li>
                      <Link href={"/update"}>Update</Link>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-none">
          {isAuthenticated ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <PackageOpen />
                    <span className="badge badge-sm indicator-item">8</span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold">My item</span>
                    <span className="text-info">Pending : 4</span>
                    <span className="text-success">Approved : 4</span>
                    <span className="text-error">Rejected : 2</span>
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
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full ring-1 ring-base">
                    <Image
                      alt="User Avatar"
                      src={user?.photoLink || ""}
                      // src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      width={500} // replace with actual image width
                      height={300} // replace with actual image height
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
            </>
          ) : (
            <Link href={"/login"}>
              <NavberButton title="Login" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
