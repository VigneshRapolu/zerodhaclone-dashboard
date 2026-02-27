import TopBar from "./TopBar"
import Dashboard from './Dashboard'

function Home(){
    useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        makeUser(true);
    } else {
        makeUser(false);
    }
}, []);
    return(
        <div >
        <TopBar/>
        <Dashboard/>
        </div>
    )
}
export default Home;