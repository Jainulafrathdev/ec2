const express = require('express');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();



connectDB();

// Init Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static('uploads'));

const portfolioSchema = new mongoose.Schema({
  userId: String,
  symbol: String,
  price: Number,
  change: String,
  changePercent: String,
  lastUpdated: String,
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

const watchlistSchema = new mongoose.Schema({
  userId: String,
  symbol: String,
  price: Number,
  change: String,
  changePercent: String,
  lastUpdated: String,
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);


app.get('/api/portfolio',async (req,res)=>{
  const {userId} =req.query;
  if(!userId){
    return res.status(400).json({error:"UserId is required"})
  }
  try {
    const portfolioItems = await Portfolio.find({userId});
    res.status(200).json(portfolioItems);
  } catch (error) {
    console.log('error fetching portfolio:',error);
    res.status(500).json({error:'Error fetching portfolio'})
  }
})

app.post('/api/portfolio',async (req,res)=>{
  const {userId , symbol , price , change , changePercent , lastUpdated}= req.body;
  if(!userId || !symbol || !price || !change || !changePercent || !lastUpdated){
    return res.status(400).json({error:"All fields is required"})
  }
  try {
    const newPortfolioItem = new Portfolio({
      userId,symbol,price,change,changePercent,lastUpdated
    })
    await newPortfolioItem.save(
      res.status(201).json({message:'Stock added to portfolio successfully'})
    )
  } catch (error) {
    res.status(500).json({error:'Error addin to portfolio'})
  }
})

app.delete('/api/portfolio/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const { userId } = req.query;

  if (!userId || !symbol) {
    return res.status(400).json({ error: 'UserId and symbol are required' });
  }

  try {
    const deletedItem = await Portfolio.findOneAndDelete({ userId, symbol });
    if (!deletedItem) {
      return res.status(404).json({ error: 'Stock not found in portfolio' });
    }
    res.status(200).json({ message: `Successfully removed ${symbol} from portfolio` });
  } catch (error) {
    console.error('Error removing stock from portfolio:', error);
    res.status(500).json({ error: 'Error removing stock from portfolio' });
  }
});

app.get('/api/watchlist', async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "UserId is required" });
  }
  try {
    const watchlistItems = await Watchlist.find({ userId });
    res.status(200).json(watchlistItems);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ error: 'Error fetching watchlist' });
  }
});

app.post('/api/watchlist', async (req, res) => {
  const { userId, symbol, price, change, changePercent, lastUpdated } = req.body;

  if (!userId || !symbol || !price || !change || !changePercent || !lastUpdated) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newWatchlistItem = new Watchlist({
      userId,
      symbol,
      price,
      change,
      changePercent,
      lastUpdated,
    });

    await newWatchlistItem.save();
    res.status(201).json({ message: 'Stock added to watchlist successfully' });
  } catch (error) {
    console.error('Error adding stock to watchlist:', error);
    res.status(500).json({ error: 'Error adding stock to watchlist' });
  }
});

app.delete('/api/watchlist/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const { userId } = req.query;

  if (!userId || !symbol) {
    return res.status(400).json({ error: 'UserId and symbol are required' });
  }

  try {
    const deletedItem = await Watchlist.findOneAndDelete({ userId, symbol });
    if (!deletedItem) {
      return res.status(404).json({ error: 'Stock not found in watchlist' });
    }
    res.status(200).json({ message: `Successfully removed ${symbol} from watchlist` });
  } catch (error) {
    console.error('Error removing stock from watchlist:', error);
    res.status(500).json({ error: 'Error removing stock from watchlist' });
  }
});

// Get portfolio data for a user
app.get('/api/portfolio/:email', async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ userId: req.params.email });
    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


// Get watchlist data for a user
app.get('/api/watchlist/:email', async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ userId: req.params.email });
    res.json(watchlist);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// const path = require('path');
// app.use(express.static(path.join(__dirname, '../frontend/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
