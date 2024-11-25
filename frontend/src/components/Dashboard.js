import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../dashboard.css'; 
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { getUserData } from '../api/auth';
import adani from '../images/sez.jpg';
import airtel from '../images/airtel logo.png';
import bfinserv from '../images/bfinserv logo.png';
import britania from '../images/britannia logo.jpg';
import cipla from '../images/cipla logo.png';
import reddy from '../images/Dr.reddy logo.png';
import grasim from '../images/Grasim logo.png';
import hdfc from '../images/hdfc logo.png';
import hero from '../images/hero logo.png';
import hindustan from '../images/hindustan logo.png';
import icici from '../images/ICICI logo.png';
import itc from '../images/ITC logo.png';
import kotak from '../images/kotak logo.png';
import lt from '../images/L&T logo.png';
import mahindra from '../images/mahindra logo.png';
import maruti from '../images/maruti logo.png';
import nestle from '../images/nestle logo.png';
import ntpc from '../images/ntpc logo.png';
import ongc from '../images/ONGC logo.png';
import powergrid from '../images/powergrid logo.png';
import reliance from '../images/reliance logo.png';
import sun from '../images/sun logo.png';
import tata from '../images/Tata loog.png';
import tcs from '../images/tcs logo.png';
import techmahindra from '../images/techmahindra logo.png';
import titan from '../images/titan logo.png';
import ultratech from '../images/UltraTech logo.png';
import wipro from '../images/wipro logo.png';
import infosys from '../images/infosys-logo.jpg';
import bajaj from '../images/Bajaj-logo.jpg';
import sbi from '../images/sbi-logo.jpg';
import hcl from '../images/hcl_technologies-logo.png';
import axis from '../images/Axis-logo.jpg';
import asian from '../images/asian-paints-logo.png';
import ambuja from '../images/ambuja logo.jpg';
import bharat from '../images/bharat logo.jpg';
import bosch from '../images/bosch logo.jpg';
import dabur from '../images/dabur logo.jpg';
import divi from '../images/divi.png';
import mart from '../images/Dmart logo.jpg';
import eicher from '../images/eicher.jpg';
import gail from '../images/gail logo.jpg';
import havels from '../images/havels logo.jpg';
import hindalco from '../images/hindalco logo.jpg';
import indusind from '../images/indusind.jpg';
import jsw from '../images/jsw logo.jpg';
import motors from '../images/motors logo.jpg';
import pidilite from '../images/pidilite logo.jpg';
import sez from '../images/sez.jpg';
import shree from '../images/shree logo.jpg';
import simens from '../images/Siemens logo.png';
import upl from '../images/upl.jpg';
import vedanta from '../images/vedanta logo.jpg';

const Dashboard = ({ addToPortfolio, addToWatchlist }) => {
  const [searchSymbol, setSearchSymbol] = useState('');
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [user, setUser] = useState({});
  const [isAddedToPortfolio, setIsAddedToPortfolio] = useState(false);
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
  const [currentView, setCurrentView] = useState('watchlist');

// Define state variables
const [portfolio, setPortfolio] = useState([]);
const [watchlist, setWatchlist] = useState([]);


  const navigate = useNavigate(); // Initialize useNavigate
  const email = localStorage.getItem('userEmail');

  const companies = [
    { symbol: "RELIANCE.NSE", name: "Reliance Industries Ltd" ,logos:`${reliance}`},
    { symbol: "TCS.NSE", name: "Tata Consultancy Services Ltd" ,logos:`${tcs}`},
    { symbol: "INFY.NSE", name: "Infosys Ltd" ,logos:`${infosys}`},
    { symbol: "HDFCBANK.NSE", name: "HDFC Bank Ltd" ,logos:`${hdfc}`},
    { symbol: "ICICIBANK.NSE", name: "ICICI Bank Ltd" ,logos:`${icici}`},
    { symbol: "HINDUNILVR.NSE", name: "Hindustan Unilever Ltd" ,logos:`${hindustan}`},
    { symbol: "BAJFINANCE.NSE", name: "Bajaj Finance Ltd" ,logos:`${bajaj}`},
    { symbol: "KOTAKBANK.NSE", name: "Kotak Mahindra Bank Ltd" ,logos:`${kotak}`},
    { symbol: "LT.NSE", name: "Larsen & Toubro Ltd" ,logos:`${lt}`},
    { symbol: "HCLTECH.NSE", name: "HCL Technologies Ltd" ,logos:`${hcl}`},
    { symbol: "SBIN.NSE", name: "State Bank of India" ,logos:`${sbi}`},
    { symbol: "ASIANPAINT.NSE", name: "Asian Paints Ltd" ,logos:`${asian}`},
    { symbol: "ITC.NSE", name: "ITC Ltd" ,logos:`${itc}`},
    { symbol: "BHARTIARTL.NSE", name: "Bharti Airtel Ltd" ,logos:`${airtel}`},
    { symbol: "AXISBANK.NSE", name: "Axis Bank Ltd" ,logos:`${axis}`},
    { symbol: "MARUTI.NSE", name: "Maruti Suzuki India Ltd" ,logos:`${maruti}`},
    { symbol: "WIPRO.NSE", name: "Wipro Ltd" ,logos:`${wipro}`},
    { symbol: "ULTRACEMCO.NSE", name: "UltraTech Cement Ltd" ,logos:`${ultratech}`},
    { symbol: "ONGC.NSE", name: "Oil & Natural Gas Corporation Ltd" ,logos:`${ongc}`},
    { symbol: "TITAN.NSE", name: "Titan Company Ltd" ,logos:`${titan}`},
    { symbol: "DRREDDY.NSE", name: "Dr. Reddy's Laboratories Ltd" ,logos:`${reddy}`},
    { symbol: "ADANIENT.NSE", name: "Adani Enterprises Ltd" ,logos:`${adani}`},
    { symbol: "SUNPHARMA.NSE", name: "Sun Pharmaceutical Industries Ltd" ,logos:`${sun}`},
    { symbol: "POWERGRID.NSE", name: "Power Grid Corporation of India Ltd" ,logos:`${powergrid}`},
    { symbol: "M&M.NSE", name: "Mahindra & Mahindra Ltd" ,logos:`${mahindra}`},
    { symbol: "NTPC.NSE", name: "NTPC Ltd" ,logos:`${ntpc}`},
    { symbol: "TATASTEEL.NSE", name: "Tata Steel Ltd" ,logos:`${tata}`},
    { symbol: "BAJAJFINSV.NSE", name: "Bajaj Finserv Ltd" ,logos:`${bfinserv}`},
    { symbol: "HEROMOTOCO.NSE", name: "Hero MotoCorp Ltd" ,logos:`${hero}`},
    { symbol: "GRASIM.NSE", name: "Grasim Industries Ltd" ,logos:`${grasim}`},
    { symbol: "CIPLA.NSE", name: "Cipla Ltd" ,logos:`${cipla}`},
    // { symbol: "COALINDIA.NSE", name: "Coal India Ltd" ,companylogo:},
    { symbol: "NESTLEIND.NSE", name: "Nestle India Ltd" ,logos:`${nestle}`},
    { symbol: "BRITANNIA.NSE", name: "Britannia Industries Ltd" ,logos:`${britania}`},
    { symbol: "TECHM.NSE", name: "Tech Mahindra Ltd" ,logos:`${techmahindra}`},
    // { symbol: "HDFC.NSE", name: "Housing Development Finance Corporation Ltd" , logos:`${}`},
    { symbol: "DIVISLAB.NSE", name: "Divi's Laboratories Ltd", logos:`${divi}`},
    { symbol: "HINDALCO.NSE", name: "Hindalco Industries Ltd", logos:`${hindalco}`},
    { symbol: "JSWSTEEL.NSE", name: "JSW Steel Ltd", logos:`${jsw}`},
    { symbol: "BPCL.NSE", name: "Bharat Petroleum Corporation Ltd" , logos:`${bharat}`},
    { symbol: "EICHERMOT.NSE", name: "Eicher Motors Ltd" , logos:`${eicher}`},
    { symbol: "ADANIPORTS.NSE", name: "Adani Ports & SEZ Ltd" , logos:`${sez}`},
    { symbol: "SHREECEM.NSE", name: "Shree Cement Ltd" , logos:`${shree}`},
    { symbol: "INDUSINDBK.NSE", name: "IndusInd Bank Ltd", logos:`${indusind}`},
    { symbol: "UPL.NSE", name: "UPL Ltd", logos:`${upl}`},
    { symbol: "TATAMOTORS.NSE", name: "Tata Motors Ltd" , logos:`${motors}`},
    { symbol: "DABUR.NSE", name: "Dabur India Ltd" , logos:`${dabur}`},
    { symbol: "VEDL.NSE", name: "Vedanta Ltd" , logos:`${vedanta}`},
    { symbol: "GAIL.NSE", name: "GAIL (India) Ltd", logos:`${gail}`},
    { symbol: "BOSCHLTD.NSE", name: "Bosch Ltd" , logos:`${bosch}`},
    { symbol: "PIDILITIND.NSE", name: "Pidilite Industries Ltd", logos:`${pidilite}`},
    { symbol: "HAVELLS.NSE", name: "Havells India Ltd" ,logos:`${havels}`}, 
    { symbol: "SIEMENS.NSE", name: "Siemens Ltd" , logos:`${simens}`},
    { symbol: "AMBUJACEM.NSE", name: "Ambuja Cements Ltd", logos:`${ambuja}`},
    { symbol: "DMART.NSE", name: "Avenue Supermarts Ltd" , logos:`${mart}`}
  ];
  
  useEffect(() => {
    if (email) {
      const fetchData = async () => {
        try {
          const userData = await getUserData(email);
          setUser(userData);
          // Fetch portfolio and watchlist data
        const portfolioResponse = await axios.get(`/api/portfolio/${email}`);
        const watchlistResponse = await axios.get(`/api/watchlist/${email}`);
        setPortfolio(portfolioResponse.data || []); // Example state: portfolio
        setWatchlist(watchlistResponse.data || []); // Example state: watchlist
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchData();
    }
  }, [email]);

  const checkPortfolio = (symbol) => {
    return Array.isArray(portfolio) && portfolio.some((item) => item.symbol === symbol);
  };
  
  const checkWatchlist = (symbol) => {
    return Array.isArray(watchlist) && watchlist.some((item) => item.symbol === symbol);
  };
  // Update UI based on portfolio/watchlist status
  useEffect(() => {
    if (stock) {
      setIsAddedToPortfolio(checkPortfolio(stock.symbol));
      setIsAddedToWatchlist(checkWatchlist(stock.symbol));
    }
  }, [stock]);

  const fetchStockData = async (symbol) => {
    setLoading(true);
    setError(null);
    try {
      
      const API_KEY = '67441b5c13a6c0.33616598';
      const response = await axios.get(
        `https://eodhistoricaldata.com/api/real-time/${symbol}.NSE?api_token=${API_KEY}&fmt=json`
      );
      const stockInfoData = response.data;
      setStock({
        symbol,
        price: stockInfoData.close,
        change: (stockInfoData.close - stockInfoData.previousClose).toFixed(2),
        changePercent: (
          ((stockInfoData.close - stockInfoData.previousClose) / stockInfoData.previousClose) *
          100
        ).toFixed(2) + '%',
        lastUpdated: new Date(stockInfoData.timestamp * 1000).toLocaleDateString(),
      });
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Error fetching data');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchSymbol.trim()) {
       fetchStockData(searchSymbol.trim().toUpperCase());
      setIsAddedToPortfolio(false);
      setIsAddedToWatchlist(false);
      
      //navigate(`/stock/${searchSymbol.trim().toUpperCase()}`); // Navigate to stock detail page
    }
  };

  const handleInputChange = async (e) => {
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

  const handleSuggestionClick = (symbol,name) => {
    setSearchSymbol(symbol.replace('.NSE', '')); 
    setSuggestions([]);
    console.log(symbol, name)
   
  };

  const handleAddToPortfolio = async () => {
    if (!user.email) {
      console.error('User email missing');
      setError('User email is required to add to portfolio');
      return;
    }

    if (!stock || !stock.symbol || !stock.price) {
      console.error('Stock data missing');
      setError('Stock data is required to add to portfolio');
      return;
    }

    // Check if the stock is already in the portfolio
  const isStockInPortfolio = checkPortfolio(stock.symbol);
  if (isStockInPortfolio) {
    setError('Stock is already in your portfolio');
    return;
  }

    try {
      await axios.post('api/portfolio', {
        userId: user.email,
        symbol: stock.symbol,
        price: stock.price,
        change: stock.change,
        changePercent: stock.changePercent,
        lastUpdated: stock.lastUpdated
      });

      addToPortfolio(stock);
      setIsAddedToPortfolio(true);
      // Update the portfolio state directly after successful addition
    setPortfolio((prevPortfolio) => [...prevPortfolio, stock]);
    } catch (error) {
      console.error('Error adding to portfolio:', error);
      setError('Error adding stock to portfolio');
    }
  };

  const handleAddToWatchlist = async () => {
    if (!user.email) {
      console.error('User email missing');
      setError("User email is required to add to watchlist");
      return;
    }
  
    if (!stock || !stock.symbol || !stock.price) {
      console.error('Stock data missing');
      setError("Stock data is required to add to watchlist");
      return;
    }

     // Check if the stock is already in the watchlist
  const isStockInWatchlist = checkWatchlist(stock.symbol);
  if (isStockInWatchlist) {
    setError('Stock is already in your watchlist');
    return;
  }
  
    try {
      await axios.post('api/watchlist', {
        userId: user.email,
        symbol: stock.symbol,
        price: stock.price,
        change: stock.change,
        changePercent: stock.changePercent,
        lastUpdated: stock.lastUpdated
      });
  
      addToWatchlist(stock);
      setIsAddedToWatchlist(true);
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      setError('Error adding stock to watchlist');
    }
  };

  // const handleNavigateToStockDetails = (symbol,name) =>{
  //   console.log(name)
  //   console.log(symbol)
  //   navigate(`/stock/${symbol}`, { state: { name } });
  // }

  const removeFromPortfolio = (stockToRemove) => {
    setPortfolio((prevPortfolio) =>
      prevPortfolio.filter((stock) => stock.symbol !== stockToRemove.symbol)
    );
  };
  
  const removeFromWatchlist = (stockToRemove) => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((stock) => stock.symbol !== stockToRemove.symbol)
    );
  };

  const handleNavigateToStockDetails = (symbol) => {
    const company = companies.find((c) => c.symbol === `${symbol}.NSE`);
    if (company) {
      console.log("Navigating to:", company.name, company.symbol);
      navigate(`/stock/${symbol}`, { state: { name: company.name , logo : company.logos } });
    } else {
      console.error(`Company with symbol ${symbol} not found in companies array.`);
    }
  };
  
// Function to handle the view switch
const handleViewSwitch = (view) => {
  setCurrentView(view); // Update the current view (watchlist or portfolio)
};
  return (
    <div className="App">
     <Header />
      {/* Main Content */}
      <div className="main-content">
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
                 <img src={company.logos} alt={`${company.name} logos`} className="company-logo" />
                {company.symbol.replace('.NSE', '')} - {company.name}
              </li>
            ))}
          </ul>
        )}

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {stock && (
          <table className="stock-table">
            <thead>
              <tr>
                <th className="stock-header">Symbol</th>
                <th className="stock-header">Price</th>
                <th className="stock-header">Change</th>
                <th className="stock-header">Change (%)</th>
                <th className="stock-header">Last Updated</th>
                <th className="stock-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td onClick={() => handleNavigateToStockDetails(stock.symbol, stock.name)} className="stock-symbol">{stock.symbol}</td>
                <td onClick={() => handleNavigateToStockDetails(stock.symbol, stock.name)} className="stock-price">₹{stock.price}</td>
                <td onClick={() => handleNavigateToStockDetails(stock.symbol, stock.name)} className="stock-change">{stock.change}</td>
                <td onClick={() => handleNavigateToStockDetails(stock.symbol, stock.name)} className="stock-change-percent">{stock.changePercent}</td>
                <td onClick={() => handleNavigateToStockDetails(stock.symbol, stock.name)} className="last-updated">{stock.lastUpdated}</td>
                <td className="icon-cell">
                  {isAddedToPortfolio ? (
                    <i className="fa-solid fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i
                      className="fa-regular fa-address-card"
                      title="Add to portfolio"
                      onClick={handleAddToPortfolio}
                      style={{ cursor: 'pointer' }}
                    ></i>
                  )}
                  {isAddedToWatchlist ? (
                    <i className="fa-solid fa-star" style={{ color: 'gold', marginLeft: '10px' }} title="In Watchlist"></i>
                  ) : (
                    <i
                      className="fa-regular fa-star"
                      title="Add to watchlist"
                      onClick={handleAddToWatchlist}
                      style={{ cursor: 'pointer', marginLeft: '10px' }}
                    ></i>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;