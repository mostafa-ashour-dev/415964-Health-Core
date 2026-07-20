import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import useAuth from "../../../state/store";
import CardContent from "../card/CardContent";
import CardSurface from "../card/CardSurface";
import Button from "../clickables/Button";
import Text from "../text/Text";
import Link from "../clickables/Link";
import { logout } from "../../../state/actions/auth.actions";

export default function MainNavigationBar() {
  const user = useAuth((state) => state.data?.user);

  const dispatch = useAuth((state) => state.dispatch);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="border-b border-body_border_primary flex items-center gap-4 sticky top-0 left-0 right-0 z-50 bg-body_background_secondary">
      <CardContent
        direction="row"
        className="items-center justify-between !py-4"
      >
        <div>
          <Text variant="body_lg" className="font-semibold">
            Hospital
          </Text>
        </div>

        <ul className="flex items-center gap-10">
          <li>
            <Link variant="link_classic" href="/dashboard" className="">
              Dashboard
            </Link>
          </li>

          <li>
            <CardSurface
              variant="card_surface_classic"
              className="!bg-body_accent_secondary"
            >
              <CardContent
                direction="row"
                variant="card_content_xs"
                className="items-center gap-10"
              >
                <div className="flex flex-col">
                  <Text variant="body_lg" className="font-semibold">
                    {user.full_name}
                  </Text>
                  <Text variant="body_sm" className="text-body_accent_primary capitalize">
                    {user.role === "user"
                      ? "User/Patient"
                      : user.role === "doctor" ? `${user.role} | ${user.specialty.name}` : user.role}
                  </Text>
                </div>

                <Button
                  onClick={handleLogout}
                  className="!p-0 !bg-transparent hover:bg-transparent hover:text-auto"
                >
                  <ArrowLeftStartOnRectangleIcon className="size-10 text-red-500" />
                </Button>
              </CardContent>
            </CardSurface>
          </li>
        </ul>
      </CardContent>
    </nav>
  );
}
