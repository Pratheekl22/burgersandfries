import './Home.css';
import guardians from '../../assets/guardians.webp'
import tfs from '../../assets/tfs-heroes.jpg'
import forsaken from '../../assets/forsaken.jpg'
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleButtonClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className="container">
            <div className="header-card">
                <img src={forsaken} className="header-img" alt="Forsaken"/>
                <div className="header-text">
                    <h1>Become Legend</h1>
                    <button className="button" onClick={() => handleButtonClick('/dashboard')}>Dashboard</button>
                </div>
            </div>
            <div className="cards">
                <div className="inventory-card">
                    <img src={tfs} alt="tfs"/>
                    <div className="card-text">
                        <h3>Manage Your Inventory</h3>
                        <p>Equip, transfer, and inspect your weapons and armor</p>
                        <button className="button" onClick={() => handleButtonClick('/inventory')}>Manage Inventory
                        </button>
                    </div>
                </div>
                <div className="search-card">
                    <img src={guardians} alt="tfs"/>
                    <div className="card-text">
                        <h3>See Your Stats</h3>
                        <p>Look up your activity stats</p>
                        <button className="button" onClick={() => handleButtonClick('/search')}>Search Guardians
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;