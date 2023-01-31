import { Logo, NavLink } from "@/components";
import { useAuth } from "@/hooks";
import routes from "src/routes";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  // component states
  const { token, logout, user } = useAuth();
  const { admin_routes, common_routes, authority_routes, user_routes } = routes;
  const pathname = usePathname();

  return (
    <aside className="relative z-40 flex h-screen w-[250px] flex-col justify-between border-r-2 border-c_white bg-c_primary p-2 pt-8 duration-300">
      <div className="mt-5">
        {/* the logo */}
        <div className="flex justify-center">
          <Logo dot_styles="w-2 h-2 bg-c_yellow" />
        </div>

        {/* the links */}
        <ul className="flex flex-col gap-2  pt-6">
          {user?.role === "admin" &&
            common_routes
              .concat(admin_routes)
              .map((admin_route, route_index) => (
                <NavLink
                  key={route_index}
                  route={admin_route}
                  type="medium"
                  full_width={true}
                  active={pathname === admin_route.to && true}
                />
              ))}

          {user?.role === "authority" &&
            common_routes
              .concat(authority_routes)
              .map((admin_route, route_index) => (
                <NavLink
                  key={route_index}
                  route={admin_route}
                  type="medium"
                  full_width={true}
                  active={pathname === admin_route.to && true}
                />
              ))}

          {user?.role === "user" &&
            common_routes
              .concat(user_routes)
              .map((admin_route, route_index) => (
                <NavLink
                  key={route_index}
                  route={admin_route}
                  type="medium"
                  full_width={true}
                  active={pathname === admin_route.to && true}
                />
              ))}
        </ul>
      </div>

      {/* the logout button */}
      {token && (
        <button
          className={`flex items-center justify-center whitespace-nowrap rounded-full bg-c_yellow  px-4 py-2 font-bold text-gray-900 focus:outline-none`}
          onClick={() => logout()}
        >
          <span>Logout</span>
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
