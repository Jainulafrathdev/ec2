import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../dashboard.css'; // Import the CSS file
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserData } from '../api/auth';
import account from '../images/account-icon.svg';
import logout from '../images/logout.svg';
import Footer from './Footer';




const Dashboard = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // For user profile dropdown
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar initially hidden
  const [searchSymbol, setSearchSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  // 

  const email = localStorage.getItem('userEmail'); 

  // Fetch user data on component mount
  useEffect(() => {
    if (email) {
      const fetchData = async () => {
        const userData = await getUserData(email);
        setUser(userData);
      };
      fetchData();
    }
  }, [email]);

  const companies = [
    { symbol: "RELIANCE.NSE", name: "Reliance Industries Ltd" },
    { symbol: "TCS.NSE", name: "Tata Consultancy Services Ltd" },
    { symbol: "INFY.NSE", name: "Infosys Ltd" },
    { symbol: "HDFCBANK.NSE", name: "HDFC Bank Ltd" },
    { symbol: "ICICIBANK.NSE", name: "ICICI Bank Ltd" },
    { symbol: "HINDUNILVR.NSE", name: "Hindustan Unilever Ltd" },
    { symbol: "BAJFINANCE.NSE", name: "Bajaj Finance Ltd" },
    { symbol: "KOTAKBANK.NSE", name: "Kotak Mahindra Bank Ltd" },
    { symbol: "LT.NSE", name: "Larsen & Toubro Ltd" },
    { symbol: "HCLTECH.NSE", name: "HCL Technologies Ltd" },
    { symbol: "SBIN.NSE", name: "State Bank of India" },
    { symbol: "ASIANPAINT.NSE", name: "Asian Paints Ltd" },
    { symbol: "ITC.NSE", name: "ITC Ltd" },
    { symbol: "BHARTIARTL.NSE", name: "Bharti Airtel Ltd" },
    { symbol: "AXISBANK.NSE", name: "Axis Bank Ltd" },
    { symbol: "MARUTI.NSE", name: "Maruti Suzuki India Ltd" },
    { symbol: "WIPRO.NSE", name: "Wipro Ltd" },
    { symbol: "ULTRACEMCO.NSE", name: "UltraTech Cement Ltd" },
    { symbol: "ONGC.NSE", name: "Oil & Natural Gas Corporation Ltd" },
    { symbol: "TITAN.NSE", name: "Titan Company Ltd" },
    { symbol: "DRREDDY.NSE", name: "Dr. Reddy's Laboratories Ltd" },
    { symbol: "ADANIENT.NSE", name: "Adani Enterprises Ltd" },
    { symbol: "SUNPHARMA.NSE", name: "Sun Pharmaceutical Industries Ltd" },
    { symbol: "POWERGRID.NSE", name: "Power Grid Corporation of India Ltd" },
    { symbol: "M&M.NSE", name: "Mahindra & Mahindra Ltd" },
    { symbol: "NTPC.NSE", name: "NTPC Ltd" },
    { symbol: "TATASTEEL.NSE", name: "Tata Steel Ltd" },
    { symbol: "BAJAJFINSV.NSE", name: "Bajaj Finserv Ltd" },
    { symbol: "HEROMOTOCO.NSE", name: "Hero MotoCorp Ltd" },
    { symbol: "GRASIM.NSE", name: "Grasim Industries Ltd" },
    { symbol: "CIPLA.NSE", name: "Cipla Ltd" },
    { symbol: "COALINDIA.NSE", name: "Coal India Ltd" },
    { symbol: "NESTLEIND.NSE", name: "Nestle India Ltd" },
    { symbol: "BRITANNIA.NSE", name: "Britannia Industries Ltd" },
    { symbol: "TECHM.NSE", name: "Tech Mahindra Ltd" },
    { symbol: "HDFC.NSE", name: "Housing Development Finance Corporation Ltd" },
    { symbol: "DIVISLAB.NSE", name: "Divi's Laboratories Ltd" },
    { symbol: "HINDALCO.NSE", name: "Hindalco Industries Ltd" },
    { symbol: "JSWSTEEL.NSE", name: "JSW Steel Ltd" },
    { symbol: "BPCL.NSE", name: "Bharat Petroleum Corporation Ltd" },
    { symbol: "EICHERMOT.NSE", name: "Eicher Motors Ltd" },
    { symbol: "ADANIPORTS.NSE", name: "Adani Ports & SEZ Ltd" },
    { symbol: "SHREECEM.NSE", name: "Shree Cement Ltd" },
    { symbol: "INDUSINDBK.NSE", name: "IndusInd Bank Ltd" },
    { symbol: "UPL.NSE", name: "UPL Ltd" },
    { symbol: "TATAMOTORS.NSE", name: "Tata Motors Ltd" },
    { symbol: "DABUR.NSE", name: "Dabur India Ltd" },
    { symbol: "VEDL.NSE", name: "Vedanta Ltd" },
    { symbol: "GAIL.NSE", name: "GAIL (India) Ltd" },
    { symbol: "BOSCHLTD.NSE", name: "Bosch Ltd" },
    { symbol: "PIDILITIND.NSE", name: "Pidilite Industries Ltd" },
    { symbol: "HAVELLS.NSE", name: "Havells India Ltd" },
    { symbol: "SIEMENS.NSE", name: "Siemens Ltd" },
    { symbol: "AMBUJACEM.NSE", name: "Ambuja Cements Ltd" },
    { symbol: "DMART.NSE", name: "Avenue Supermarts Ltd" }
  ];
  

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchSymbol.trim()) {
      navigate(`/stock/${searchSymbol.trim().toUpperCase()}`); // Navigate to stock detail page
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    setSearchSymbol(value);

    if (value) {
      const filteredCompanies = companies.filter(
        (company) =>
          company.name.toUpperCase().includes(value) || company.symbol.includes(value)
      );
      setSuggestions(filteredCompanies);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (symbol, name) => {
    setSearchSymbol(symbol); // Set the clicked suggestion as the search symbol
    setSuggestions([]); // Clear suggestions
    navigate(`/stock/${symbol}`, { state: { name } }); // Navigate to stock detail page
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="header-icons">
          {/* List icon to toggle sidebar */}
          <i className="fas fa-list" onClick={toggleSidebar}></i>
          <div className="logo">ShariaStock</div>
        </div>

        <div className="user-icon" onClick={toggleDropdown}>
          <img src={`http://localhost:5000/${user.profilePicture}`} alt="Profile" className="profile-pic" /> {/* Profile Picture */}
          <div className='user-info'>
          <p>{user.name}</p>
          </div>
          
        </div>
      </nav>

      {/* User profile dropdown */}
      {isDropdownOpen && (
        <div className="profile-dropdown">
          <div className='profile-section'>
          
          <div className='profile-info'>
          <p className='profile-username'><strong>{user.name}</strong></p>
          <p className='profile-email'>{user.email}</p>
          
          </div>
          
          </div>
          
          
          <div className='edit-profile-section'>
            <img src={account} alt="account" />
          <Link to="/editprofile"><strong>Profile</strong></Link>
          </div>
          
          <div className='logout-section'>
            <img src={logout} alt="logout" />
          <button className="logout-btn">Logout</button>
          </div>
          
        </div>
      )}
      {isSidebarOpen && (
          <div className="sidebar">
            <ul className="sidebar-links">
              <li><i className="fas fa-tachometer-alt"></i> Dashboard</li>
              <li><i className="fas fa-eye"></i> Watchlist</li>
              <li><i className="fas fa-briefcase"></i> Portfolio</li>
            </ul>
            <div className="market-overview">
              <h4>Market Overview</h4>
              <p>NSE <span className="red">25,0625</span></p>
              <p>BSE <span className="green">25,0545</span></p>
            </div>
          </div>
        )}

      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar - only show if isSidebarOpen is true */}
        <div className='stock-container'>
        <h1 className="stock-search-title">Stock Search</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            value={searchSymbol}
            onChange={handleInputChange}
            placeholder="Search for a stock symbol..."
          />
          <button className="search-button" type="submit">Search</button>
        </form>

        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((company, index) => (
              <li key={index} className="suggestion-item" onClick={() => handleSuggestionClick(company.symbol, company.name)}>
                {company.symbol} - {company.name}
              </li>
            ))}
          </ul>
        )}

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
        
      </div>

      

      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
