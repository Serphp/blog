import Link from "next/link";

export function Navbar() {
//const { user, logout } = useAuth();
//const [show, setShow] = useState(false);
//const router = useRouter();

// const handleLogout = async () => {
// await logout();
// router.push("/");
// };

return (
<nav className="contenedor">
    <div className="">
    <Link href="/">
        <span className=""> Home </span>
    </Link>
    <button
        className=""
        type="button"
        //onClick={() => setShow(!show)}
    >
        <span className=""></span>
    </button>
    </div>
    </nav>)
}
