import React, { Fragment, useContext, useEffect, useState } from "react";
import myContext from "../context/data/myContext";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import ADMIN_EMAIL from "../utils/AdminDetails";

function Navbar() {
  const context = useContext(myContext);
  const { mode, getMyDept } = context;
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const user_emailID = JSON.parse(localStorage.getItem("user"))?.user?.email;
  const [department, setDept] = useState(null);

  const logout = () => {
    localStorage.clear("user");
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isDeptAdmin = await getMyDept(user_emailID);
        if (isDeptAdmin !== false) {
          setDept(isDeptAdmin?.department);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-blue-900 pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-white"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 size={24} />
                  </button>
                </div>
                <div className="border-t border-blue-800 px-4 py-6">
                  {user && (
                    <div className="flow-root mb-4">
                      <Link
                        to={"/report"}
                        className="text-white hover:text-blue-200 transition-colors"
                      >
                        Send Report
                      </Link>
                    </div>
                  )}

                  <div className="flow-root mb-4">
                    <Link
                      to={"/community-posts"}
                      className="text-white hover:text-blue-200 transition-colors"
                    >
                      Community Posts
                    </Link>
                  </div>

                  {user && (
                    <div className="flow-root mb-4">
                      <Link
                        to={"/emergency-resources"}
                        className="text-white hover:text-blue-200 transition-colors"
                      >
                        Emergency Resources
                      </Link>
                    </div>
                  )}

                  {user?.user?.email === ADMIN_EMAIL && (
                    <div className="flow-root mb-4">
                      <Link
                        to={"/dashboard"}
                        className="text-white hover:text-blue-200 transition-colors"
                      >
                        Admin
                      </Link>
                    </div>
                  )}

                  {department !== null && (
                    <div className="flow-root mb-4">
                      <Link
                        to={"/departments-reports"}
                        className="text-white hover:text-blue-200 transition-colors"
                      >
                        Department Reports
                      </Link>
                    </div>
                  )}

                  <div className="flow-root mb-4">
                    {user ? (
                      <a
                        onClick={logout}
                        className="text-white hover:text-blue-200 transition-colors cursor-pointer"
                      >
                        Logout
                      </a>
                    ) : (
                      <Link
                        to={"/signup"}
                        className="text-white hover:text-blue-200 transition-colors"
                      >
                        Signup
                      </Link>
                    )}
                  </div>

                  <div className="flow-root">
                    <Link to={"/user-profile"} className="block">
                      <img
                        className="w-12 h-12 rounded-full border-4 border-white hover:border-blue-300 transition-transform transform hover:scale-105"
                        src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071144/y9evmbpdht5ezj3fkal9.jpg"
                        alt="user"
                      />
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="bg-blue-500 px-4 sm:px-6 lg:px-8 shadow-lg"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex h-16 items-center justify-between">
              <button
                type="button"
                className="rounded-md bg-blue-800 p-2 text-white lg:hidden hover:bg-blue-700 transition-colors"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>

              <div className="flex lg:ml-0">
                <Link to={"/"} className="flex items-center space-x-2">
                  <img
                    src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071145/thftfiyzg6c29p4d6vws.jpg"
                    alt="HazardHawk Logo"
                    className="w-12 h-12 rounded-full border-2 border-blue-300"
                  />
                  <h1 className="text-3xl font-extrabold text-white">
                    HazardHawk
                  </h1>
                </Link>
              </div>

              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:space-x-8">
                {user && (
                  <Link
                    to={"/report"}
                    className="text-white hover:text-blue-200 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Send Report
                  </Link>
                )}

                <Link
                  to={"/community-posts"}
                  className="text-white hover:text-blue-200 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                >
                  Community Posts
                </Link>

                <Link
                  to={"/emergency-resources"}
                  className="text-white hover:text-blue-200 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                >
                  Emergency Resources
                </Link>

                {!user && (
                  <Link
                    to={"/signup"}
                    className="text-white hover:text-blue-200 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Signup
                  </Link>
                )}

                {user?.user?.email === ADMIN_EMAIL && (
                  <Link
                    to={"/dashboard"}
                    className="text-white hover:text-blue-200 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Admin
                  </Link>
                )}

                {department !== null && (
                  <Link
                    to={"/departments-reports"}
                    className="text-white hover:text-blue-200 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Department Reports
                  </Link>
                )}

                {user && (
                  <a
                    onClick={logout}
                    className="text-white hover:text-blue-200 transition-colors cursor-pointer px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </a>
                )}

                <Link to={"/user-profile"} className="block">
                  <img
                    className="w-12 h-12 rounded-full border-4 border-white hover:border-blue-300 transition-transform transform hover:scale-105"
                    src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071144/y9evmbpdht5ezj3fkal9.jpg"
                    alt="user"
                  />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
