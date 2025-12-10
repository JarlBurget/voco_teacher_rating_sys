import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

export function SignOutButton() {
	const auth = useAuth();
	const navigate = useNavigate();

	const handleSignOut = () => {
		auth.logout();
		navigate("/");
	};

	return (
		<button
			onClick={handleSignOut}
			className='px-4 py-2 rounded bg-white text-secondary border border-gray-200 font-semibold hover:bg-gray-50 hover:text-secondary-hover transition-colors shadow-sm hover:shadow'
		>
			Sign out
		</button>
	);
}
