import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { 
  Search, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Calendar, 
  Hash, 
  Database, 
  RefreshCw, 
  ChevronRight, 
  ChevronLeft, 
  Layers,
  ArrowRight,
  Clock,
  FileCode,
  Wallet,
  BarChart2
} from 'lucide-react';

// Main Explorer Component
const MultiChainExplorer = () => {
  const chains = useSelector(state => state.chains);
  const [selectedChain, setSelectedChain] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [blocksData, setBlocksData] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedTx, setSelectedTx] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [chainInfo, setChainInfo] = useState(null);
  const [stats, setStats] = useState({
    blocks: 0,
    transactions: 0,
    mainchainHeight: 0,
    peerCount: 0
  });

  const perPage = 10;

  // Initialize with Bitcoin chain if available
  useEffect(() => {
    if (chains.length > 0) {
      // Find Bitcoin or first available chain
      const bitcoinChain = chains.find(c => c.id === 'bitcoin');
      const targetChain = bitcoinChain || chains.find(c => c.status === 'running') || chains[0];
      if (targetChain) {
        setSelectedChain(targetChain);
      }
    }
  }, [chains]);

  // Fetch data when chain changes
  useEffect(() => {
    if (selectedChain) {
      fetchChainInfo();
      fetchLatestBlocks();
      fetchChainStats();
    }
  }, [selectedChain]);

  // Simulated data fetching functions (replace with actual RPC calls)
  const fetchChainInfo = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate fetching chain info from the node
      // In a real implementation, you would use window.electronAPI to call the chain's RPC
      setTimeout(() => {
        const info = {
          name: selectedChain.display_name,
          version: "0.1.0",
          protocolVersion: 70015,
          chain: selectedChain.id === 'bitcoin' ? "mainchain" : "sidechain",
          blocks: selectedChain.id === 'bitcoin' ? 789241 : 45321,
          connections: 8,
          difficulty: selectedChain.id === 'bitcoin' ? 54073476139.64772 : 1254.78,
          isSyncing: false,
          sidechain: selectedChain.id !== 'bitcoin' ? {
            parentChainHeight: 789241,
            deposits: 143,
            withdrawals: 87,
            pendingWithdrawals: 3
          } : null
        };
        setChainInfo(info);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      setError("Failed to fetch chain information");
      setIsLoading(false);
    }
  }, [selectedChain]);

  const fetchLatestBlocks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate fetching latest blocks
      setTimeout(() => {
        // Generate random blocks data for demonstration
        const blockHeight = selectedChain.id === 'bitcoin' ? 789241 : 45321;
        const blocks = Array.from({ length: 20 }, (_, i) => {
          const height = blockHeight - i;
          const txCount = Math.floor(Math.random() * 100) + 1;
          const size = (Math.floor(Math.random() * 900) + 100) * 1024;
          const timestamp = new Date(Date.now() - i * 600000).toISOString();
          const hash = `000000${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}...`;
          
          return {
            height,
            hash,
            timestamp,
            txCount,
            size,
            miner: `Miner ${Math.floor(Math.random() * 10) + 1}`,
            difficulty: selectedChain.id === 'bitcoin' ? 
              54073476139.64772 - (Math.random() * 1000000) : 
              1254.78 - (Math.random() * 10),
            merkleRoot: `${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}...`,
            nonce: Math.floor(Math.random() * 1000000000),
            bits: "1a44b9f2",
            transactions: Array.from({ length: txCount }, (_, j) => ({
              txid: `${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}...`,
              size: Math.floor(Math.random() * 1000) + 200,
              fee: Math.random() * 0.001,
              inputs: Math.floor(Math.random() * 5) + 1,
              outputs: Math.floor(Math.random() * 5) + 1,
              isCoinbase: j === 0,
              total: j === 0 ? 6.25 : Math.random() * 10,
              isCrossChain: Math.random() > 0.9, // 10% chance of cross-chain tx
              crossChainType: Math.random() > 0.5 ? 'deposit' : 'withdrawal',
              crossChainTarget: Math.random() > 0.5 ? 'Bitcoin' : 'Thunder'
            }))
          };
        });
        
        setBlocksData(blocks);
        setIsLoading(false);
      }, 700);
    } catch (err) {
      setError("Failed to fetch latest blocks");
      setIsLoading(false);
    }
  }, [selectedChain]);

  const fetchChainStats = useCallback(async () => {
    try {
      // Simulate fetching chain stats
      setTimeout(() => {
        const stats = {
          blocks: selectedChain.id === 'bitcoin' ? 789241 : 45321,
          transactions: selectedChain.id === 'bitcoin' ? 845326741 : 1254872,
          mainchainHeight: 789241,
          peerCount: Math.floor(Math.random() * 20) + 5,
          lastUpdated: new Date().toISOString(),
          hashRate: selectedChain.id === 'bitcoin' ? 
            "527.32 EH/s" : 
            "342.56 TH/s",
          averageBlockTime: selectedChain.id === 'bitcoin' ? 
            "10 minutes" : 
            "30 seconds",
          mempoolSize: Math.floor(Math.random() * 10000) + 1000,
          totalCoins: selectedChain.id === 'bitcoin' ? 
            "19,312,456 BTC" : 
            "15,823,456 THN",
          chainSize: selectedChain.id === 'bitcoin' ? 
            "498.7 GB" : 
            "42.3 GB"
        };
        
        setStats(stats);
      }, 600);
    } catch (err) {
      console.error("Failed to fetch chain stats", err);
    }
  }, [selectedChain]);

  const handleBlockSelect = (block) => {
    setSelectedBlock(block);
    setSelectedTx(null);
    setSelectedAddress(null);
    setActiveView('block');
  };
  
  const handleTxSelect = (tx) => {
    setSelectedTx(tx);
    setSelectedBlock(null);
    setSelectedAddress(null);
    setActiveView('transaction');
  };
  
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setSelectedBlock(null);
    setSelectedTx(null);
    setActiveView('address');
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    // Search format detection logic
    setTimeout(() => {
      // Block height search (all numbers)
      if (/^\d+$/.test(searchQuery)) {
        const height = parseInt(searchQuery);
        // Find block with matching height
        const block = blocksData.find(b => b.height === height);
        if (block) {
          handleBlockSelect(block);
        } else {
          setError(`Block #${height} not found`);
        }
      } 
      // Block hash or tx search (starts with 0x or long hex)
      else if (/^(0x)?[0-9a-f]{10,}/i.test(searchQuery)) {
        // Check if it's a transaction in our cached blocks
        let foundTx = null;
        
        for (const block of blocksData) {
          const tx = block.transactions.find(t => 
            t.txid.includes(searchQuery.replace(/^0x/, '')));
          
          if (tx) {
            foundTx = tx;
            foundTx.blockHeight = block.height;
            foundTx.blockHash = block.hash;
            foundTx.timestamp = block.timestamp;
            break;
          }
        }
        
        if (foundTx) {
          handleTxSelect(foundTx);
        } else {
          // Check if it's a block hash
          const block = blocksData.find(b => 
            b.hash.includes(searchQuery.replace(/^0x/, '')));
            
          if (block) {
            handleBlockSelect(block);
          } else {
            setError("Transaction or block not found");
          }
        }
      }
      // Address search
      else if (/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[ac-hj-np-z0-9]{8,87}$/i.test(searchQuery)) {
        // For demo, just create a mock address record
        const mockAddress = {
          address: searchQuery,
          balance: Math.random() * 10,
          totalReceived: Math.random() * 20,
          totalSent: Math.random() * 15,
          txCount: Math.floor(Math.random() * 100) + 1,
          transactions: Array.from({ length: 10 }, () => ({
            txid: `${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}...`,
            timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toISOString(),
            amount: (Math.random() * 2) - 1, // Negative for sent, positive for received
            confirmations: Math.floor(Math.random() * 1000),
            blockHeight: stats.blocks - Math.floor(Math.random() * 1000)
          }))
        };
        
        handleAddressSelect(mockAddress);
      } else {
        setError("Invalid search query format");
      }
      
      setIsLoading(false);
    }, 800);
  };

  const handleRefresh = () => {
    if (activeView === 'dashboard') {
      fetchChainInfo();
      fetchLatestBlocks();
      fetchChainStats();
    } else if (activeView === 'block' && selectedBlock) {
      // Refresh block data
      console.log("Refreshing block data");
    } else if (activeView === 'transaction' && selectedTx) {
      // Refresh transaction data
      console.log("Refreshing transaction data");
    } else if (activeView === 'address' && selectedAddress) {
      // Refresh address data
      console.log("Refreshing address data");
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  // Get display name for a chain
  const getChainDisplayName = (chainId) => {
    const chain = chains.find(c => c.id === chainId);
    return chain ? chain.display_name : chainId;
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Block Explorer</h1>
          
          {/* Chain Selector */}
          <div className="relative">
            <select 
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedChain ? selectedChain.id : ''}
              onChange={(e) => {
                const chain = chains.find(c => c.id === e.target.value);
                setSelectedChain(chain);
                setActiveView('dashboard');
                setSelectedBlock(null);
                setSelectedTx(null);
                setSelectedAddress(null);
              }}
            >
              {chains && chains.length > 0 ? (
                  chains.map(chain => (
                    <option key={chain.id} value={chain.id}>
                      {chain.display_name}
                    </option>
                  ))
                ) : (
                  <option value="">No chains available</option>
                )}
            </select>
          </div>
        </div>
        
        {/* Search */}
        <div className="flex items-center w-1/2">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by block height, hash, transaction ID, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-md flex items-center justify-center"
            onClick={handleSearch}
          >
            <Search size={20} />
          </button>
        </div>
        
        {/* Refresh Button */}
        <button
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center space-x-1"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>
      
      {/* Navigation */}
      <div className="flex p-2 border-b border-gray-200 dark:border-gray-700 space-x-1">
        <button
          className={`px-3 py-1 rounded-md ${activeView === 'dashboard' 
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100' 
            : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          onClick={() => setActiveView('dashboard')}
        >
          Dashboard
        </button>
        
        {selectedBlock && (
          <div className="flex items-center">
            <ChevronRight size={16} className="mx-1 text-gray-500" />
            <button
              className={`px-3 py-1 rounded-md ${activeView === 'block' 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              onClick={() => setActiveView('block')}
            >
              Block #{selectedBlock.height}
            </button>
          </div>
        )}
        
        {selectedTx && (
          <div className="flex items-center">
            <ChevronRight size={16} className="mx-1 text-gray-500" />
            <button
              className={`px-3 py-1 rounded-md ${activeView === 'transaction' 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              onClick={() => setActiveView('transaction')}
            >
              Transaction
            </button>
          </div>
        )}
        
        {selectedAddress && (
          <div className="flex items-center">
            <ChevronRight size={16} className="mx-1 text-gray-500" />
            <button
              className={`px-3 py-1 rounded-md ${activeView === 'address' 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              onClick={() => setActiveView('address')}
            >
              Address
            </button>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800">
            {error}
          </div>
        )}
        
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {activeView === 'dashboard' && (
              <Dashboard 
                chainInfo={chainInfo} 
                blocksData={blocksData} 
                stats={stats}
                onBlockSelect={handleBlockSelect}
                onTxSelect={handleTxSelect}
                selectedChain={selectedChain}
                getChainDisplayName={getChainDisplayName}
              />
            )}
            
            {activeView === 'block' && selectedBlock && (
              <BlockView 
                block={selectedBlock} 
                onTxSelect={handleTxSelect}
                chainType={selectedChain?.id === 'bitcoin' ? 'mainchain' : 'sidechain'}
                chainName={selectedChain?.display_name || 'Unknown'}
              />
            )}
            
            {activeView === 'transaction' && selectedTx && (
              <TransactionView 
                tx={selectedTx} 
                onAddressSelect={handleAddressSelect}
                onBlockSelect={handleBlockSelect}
                chainType={selectedChain?.id === 'bitcoin' ? 'mainchain' : 'sidechain'}
                chainName={selectedChain?.display_name || 'Unknown'}
              />
            )}
            
            {activeView === 'address' && selectedAddress && (
              <AddressView 
                address={selectedAddress} 
                onTxSelect={handleTxSelect}
                chainName={selectedChain?.display_name || 'Unknown'}
              />
            )}
          </>
        )}
      </div>
      
      {/* Footer - only show in dashboard view */}
      {activeView === 'dashboard' && (
        <div className="p-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {stats.lastUpdated && (
              <>Last updated: {new Date(stats.lastUpdated).toLocaleTimeString()}</>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={20} />
            </button>
            
            <span className="text-sm">
              Page {currentPage}
            </span>
            
            <button
              className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
              onClick={handleNextPage}
              disabled={blocksData.length === 0 || blocksData.length < perPage}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ chainInfo, blocksData, stats, onBlockSelect, onTxSelect, selectedChain, getChainDisplayName }) => {
  return (
    <div className="space-y-6">
      {/* Chain Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Basic Chain Info */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Database size={18} className="mr-2" /> 
            Chain Info
          </h2>
          
          {chainInfo ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Name:</span>
                <span className="font-medium">{chainInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Type:</span>
                <span className="font-medium capitalize">{chainInfo.chain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Version:</span>
                <span className="font-medium">{chainInfo.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Connections:</span>
                <span className="font-medium">{chainInfo.connections}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Block Height:</span>
                <span className="font-medium">{chainInfo.blocks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Difficulty:</span>
                <span className="font-medium">{chainInfo.difficulty.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Syncing:</span>
                <span className={`font-medium ${chainInfo.isSyncing ? 'text-yellow-500' : 'text-green-500'}`}>
                  {chainInfo.isSyncing ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 text-center">No chain info available</div>
          )}
        </div>
        
        {/* Middle Column - Stats */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart2 size={18} className="mr-2" /> 
            Chain Statistics
          </h2>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Total Blocks:</span>
              <span className="font-medium">{stats.blocks.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Total Transactions:</span>
              <span className="font-medium">{stats.transactions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Mempool Size:</span>
              <span className="font-medium">{stats.mempoolSize?.toLocaleString() || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Hash Rate:</span>
              <span className="font-medium">{stats.hashRate || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Avg Block Time:</span>
              <span className="font-medium">{stats.averageBlockTime || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Chain Size:</span>
              <span className="font-medium">{stats.chainSize || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Coin Supply:</span>
              <span className="font-medium">{stats.totalCoins || 'N/A'}</span>
            </div>
          </div>
        </div>
        
        {/* Right Column - Cross Chain Info */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Layers size={18} className="mr-2" /> 
            Cross-Chain Info
          </h2>
          
          {chainInfo?.sidechain ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Parent Chain:</span>
                <span className="font-medium">Bitcoin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Parent Height:</span>
                <span className="font-medium">{chainInfo.sidechain.parentChainHeight.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Total Deposits:</span>
                <span className="font-medium">{chainInfo.sidechain.deposits.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Total Withdrawals:</span>
                <span className="font-medium">{chainInfo.sidechain.withdrawals.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Pending Withdrawals:</span>
                <span className="font-medium text-yellow-500">{chainInfo.sidechain.pendingWithdrawals.toLocaleString()}</span>
              </div>
              
              <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-medium mb-2">BIP300/301 Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Next BMM Hash:</span>
                    <span className="font-medium truncate max-w-32">0x86fe3...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Last CTIP Update:</span>
                    <span className="font-medium">789,235</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Voting Status:</span>
                    <span className="font-medium text-green-500">Active</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Chain Type:</span>
                <span className="font-medium">Mainchain</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Active Sidechains:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Miner Upvotes:</span>
                <span className="font-medium">25 (83%)</span>
              </div>
              
              <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-medium mb-2">Connected Sidechains</h3>
                <div className="space-y-1.5">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>Thunder</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>zSide</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>BitNames</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-medium mb-2">Recent Sidechain Activity</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Deposits:</span>
                    <span className="font-medium">24 (6h)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Withdrawals:</span>
                    <span className="font-medium">12 (6h)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Latest Blocks */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold flex items-center">
            <Calendar size={18} className="mr-2" /> 
            Latest Blocks
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Height
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Hash
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Transactions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {blocksData.slice(0, 10).map((block) => (
                <tr key={block.height} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500 dark:text-blue-400 cursor-pointer" onClick={() => onBlockSelect(block)}>
                    {block.height.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-mono">
                    {block.hash}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {new Date(block.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {block.txCount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {(block.size / 1024).toFixed(2)} KB
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      onClick={() => onBlockSelect(block)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Recent Cross-Chain Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold flex items-center">
            <Layers size={18} className="mr-2" /> 
            Recent Cross-Chain Transactions
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Transaction
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Block
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  From
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  To
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {blocksData
                .slice(0, 10)
                .flatMap(block => 
                  block.transactions
                    .filter(tx => tx.isCrossChain)
                    .map(tx => ({ ...tx, blockHeight: block.height }))
                )
                .slice(0, 5)
                .map((tx, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500 dark:text-blue-400 cursor-pointer" onClick={() => onTxSelect(tx)}>
                      {tx.txid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {tx.blockHeight.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {tx.crossChainType === 'deposit' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          <ArrowDownLeft size={12} className="mr-1" /> Deposit
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          <ArrowUpRight size={12} className="mr-1" /> Withdrawal
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {tx.crossChainType === 'deposit' ? 'Bitcoin' : tx.crossChainTarget}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {tx.crossChainType === 'deposit' ? tx.crossChainTarget : 'Bitcoin'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300">
                      {tx.total.toFixed(8)} {tx.crossChainType === 'deposit' ? 'BTC' : 'THN'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      {/* Random status for demo purposes */}
                      {Math.random() > 0.2 ? (
                        <span className="text-green-500 dark:text-green-400">Confirmed</span>
                      ) : (
                        <span className="text-yellow-500 dark:text-yellow-400">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              
              {blocksData
                .flatMap(block => block.transactions.filter(tx => tx.isCrossChain))
                .length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No cross-chain transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Block Detail View Component
const BlockView = ({ block, onTxSelect, chainType, chainName }) => {
  return (
    <div className="space-y-6">
      {/* Block Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Hash size={20} className="mr-2" /> Block #{block.height.toLocaleString()}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">Hash</span>
              <span className="font-mono text-sm break-all">{block.hash}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">Timestamp</span>
              <span className="text-sm">{new Date(block.timestamp).toLocaleString()}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">Merkle Root</span>
              <span className="font-mono text-sm break-all">{block.merkleRoot}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">Miner</span>
              <span className="text-sm">{block.miner}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Difficulty</span>
              <span className="text-sm">{block.difficulty.toLocaleString('en-US', { maximumFractionDigits: 8 })}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Size</span>
              <span className="text-sm">{(block.size / 1024).toFixed(2)} KB</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Bits</span>
              <span className="text-sm font-mono">{block.bits}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Nonce</span>
              <span className="text-sm">{block.nonce.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Transaction Count</span>
              <span className="text-sm">{block.txCount.toLocaleString()}</span>
            </div>
            
            {chainType === 'sidechain' && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">BMM Hash</span>
                <span className="text-sm font-mono">0x4a3b2f1c...</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Block Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Transactions</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Inputs
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Outputs
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Fee
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {block.transactions.map((tx, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => onTxSelect({...tx, blockHeight: block.height, blockHash: block.hash, timestamp: block.timestamp})}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500 dark:text-blue-400">
                    {tx.txid}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {tx.isCoinbase ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        Coinbase
                      </span>
                    ) : tx.isCrossChain ? (
                      tx.crossChainType === 'deposit' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          <ArrowDownLeft size={12} className="mr-1" /> Deposit
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          <ArrowUpRight size={12} className="mr-1" /> Withdrawal
                        </span>
                      )
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {tx.size.toLocaleString()} bytes
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {tx.isCoinbase ? 'Coinbase' : tx.inputs}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {tx.outputs}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {tx.total.toFixed(8)} {chainType === 'mainchain' ? 'BTC' : chainName.substring(0, 3).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {tx.isCoinbase ? '-' : tx.fee.toFixed(8)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Transaction Detail View Component
const TransactionView = ({ tx, onAddressSelect, onBlockSelect, chainType, chainName }) => {
  return (
    <div className="space-y-6">
      {/* Transaction Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FileCode size={20} className="mr-2" /> Transaction Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">Transaction ID</span>
              <span className="font-mono text-sm break-all">{tx.txid}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">Block</span>
              <span className="text-sm text-blue-500 dark:text-blue-400 cursor-pointer" onClick={() => onBlockSelect({ height: tx.blockHeight, hash: tx.blockHash })}>
                #{tx.blockHeight.toLocaleString()}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">Timestamp</span>
              <span className="text-sm">{new Date(tx.timestamp).toLocaleString()}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
              <span className="inline-flex items-center text-sm text-green-500 dark:text-green-400">
                Confirmed
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Type</span>
              <span className="text-sm">
                {tx.isCoinbase ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Coinbase
                  </span>
                ) : tx.isCrossChain ? (
                  tx.crossChainType === 'deposit' ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <ArrowDownLeft size={12} className="mr-1" /> Deposit
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      <ArrowUpRight size={12} className="mr-1" /> Withdrawal
                    </span>
                  )
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    Standard
                  </span>
                )}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Size</span>
              <span className="text-sm">{tx.size.toLocaleString()} bytes</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Inputs</span>
              <span className="text-sm">{tx.isCoinbase ? 'Coinbase' : tx.inputs}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Outputs</span>
              <span className="text-sm">{tx.outputs}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Total</span>
              <span className="text-sm">{tx.total.toFixed(8)} {chainType === 'mainchain' ? 'BTC' : chainName.substring(0, 3).toUpperCase()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Fee</span>
              <span className="text-sm">{tx.isCoinbase ? '-' : `${tx.fee.toFixed(8)} ${chainType === 'mainchain' ? 'BTC' : chainName.substring(0, 3).toUpperCase()}`}</span>
            </div>
          </div>
        </div>
        
        {/* Cross-Chain Transaction Details (if applicable) */}
        {tx.isCrossChain && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-md font-semibold mb-3">Cross-Chain Details</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-md p-3">
              <div className="flex items-center mb-2">
                <div className={`font-medium flex items-center ${tx.crossChainType === 'deposit' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
                  {tx.crossChainType === 'deposit' ? (
                    <>
                      <ArrowDownLeft size={16} className="mr-1" />
                      Deposit from Mainchain to Sidechain
                    </>
                  ) : (
                    <>
                      <ArrowUpRight size={16} className="mr-1" />
                      Withdrawal from Sidechain to Mainchain
                    </>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex flex-col">
                    <span className="text-gray-500 dark:text-gray-400">From Chain</span>
                    <span>{tx.crossChainType === 'deposit' ? 'Bitcoin' : chainName}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-gray-500 dark:text-gray-400">To Chain</span>
                    <span>{tx.crossChainType === 'deposit' ? chainName : 'Bitcoin'}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex flex-col">
                    <span className="text-gray-500 dark:text-gray-400">Amount</span>
                    <span className="font-medium">{tx.total.toFixed(8)} {tx.crossChainType === 'deposit' ? 'BTC' : chainName.substring(0, 3).toUpperCase()}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-gray-500 dark:text-gray-400">Status</span>
                    <span className="text-green-500 dark:text-green-400">Confirmed</span>
                  </div>
                </div>
              </div>
              
              {tx.crossChainType === 'withdrawal' && (
                <div className="mt-3 border-t border-blue-200 dark:border-blue-800 pt-3">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Verification Status: </span>
                    <span className="text-green-500 dark:text-green-400">Verified by 12 miners (40%)</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Waiting for 51% of hashpower for mainchain inclusion. Estimated time: 2 days, 4 hours.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Inputs Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Inputs</h2>
        </div>
        
        <div className="p-4">
          {!tx.isCoinbase ? (
            <div className="space-y-3">
              {Array.from({ length: tx.inputs }, (_, i) => (
                <div 
                  key={i} 
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-750"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <div className="flex-1">
                      <div className="text-sm text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                        <span className="font-medium mr-2">Address:</span>
                        <span 
                          className="text-blue-500 dark:text-blue-400 cursor-pointer" 
                          onClick={() => onAddressSelect({ 
                            address: `bc1q${Math.random().toString(16).substring(2, 12)}`,
                            balance: Math.random() * 10
                          })}
                        >
                          bc1q{Math.random().toString(16).substring(2, 12)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                        <span className="font-medium mr-2">Previous Output:</span>
                        <span className="font-mono text-gray-600 dark:text-gray-400">
                          {Math.random().toString(16).substring(2, 10)}...:{i}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{(Math.random() * tx.total / tx.inputs).toFixed(8)} {chainType === 'mainchain' ? 'BTC' : chainName.substring(0, 3).toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-md bg-purple-50 dark:bg-purple-900/20">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                    <span className="font-medium">Coinbase (Newly Generated Coins)</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                    {Math.random().toString(16).substring(2, 30)}...
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">{tx.total.toFixed(8)} {chainType === 'mainchain' ? 'BTC' : chainName.substring(0, 3).toUpperCase()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Outputs Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Outputs</h2>
        </div>
        
        <div className="p-4">
          <div className="space-y-3">
            {Array.from({ length: tx.outputs }, (_, i) => (
              <div 
                key={i} 
                className={`p-3 border rounded-md ${
                  tx.isCrossChain && i === 0 
                    ? 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750'
                }`}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div className="flex-1">
                    {tx.isCrossChain && i === 0 ? (
                      <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                        <span className="font-medium">{tx.crossChainType === 'deposit' ? 'Deposit' : 'Withdrawal'} Output</span>
                      </div>
                    ) : null}
                    
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                      <span className="font-medium mr-2">Address:</span>
                      <span 
                        className="text-blue-500 dark:text-blue-400 cursor-pointer"
                        onClick={() => onAddressSelect({ 
                          address: `bc1q${Math.random().toString(16).substring(2, 12)}`,
                          balance: Math.random() * 10
                        })}
                      >
                        bc1q{Math.random().toString(16).substring(2, 12)}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                      <span className="font-medium mr-2">Script Type:</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {tx.isCrossChain && i === 0 
                          ? `OP_RETURN (${tx.crossChainType === 'deposit' ? 'Deposit' : 'Withdrawal'})` 
                          : 'P2WPKH'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">
                      {(tx.total / tx.outputs * (Math.random() * 0.4 + 0.8)).toFixed(8)} {chainType === 'mainchain' ? 'BTC' : chainName.substring(0, 3).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Address Detail View Component 
const AddressView = ({ address, onTxSelect, chainName }) => {
  return (
    <div className="space-y-6">
      {/* Address Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <Wallet size={20} className="mr-2" /> 
          Address Details
        </h2>
        
        <div className="flex flex-wrap md:flex-nowrap items-start gap-4">
          <div className="w-full md:w-2/3">
            <div className="break-all font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
              {address.address}
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                <div className="text-sm text-gray-500 dark:text-gray-400">Balance</div>
                <div className="text-xl font-semibold">{address.balance.toFixed(8)} {chainName === 'Bitcoin' ? 'BTC' : chainName.substring(0, 3).toUpperCase()}</div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                <div className="text-sm text-gray-500 dark:text-gray-400">Transactions</div>
                <div className="text-xl font-semibold">{address.txCount}</div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 rounded-md p-3 border border-gray-200 dark:border-gray-700">
            <h3 className="text-md font-medium mb-2">Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Total Received:</span>
                <span>{address.totalReceived.toFixed(8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Total Sent:</span>
                <span>{address.totalSent.toFixed(8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">First Seen:</span>
                <span>~2 months ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Last Activity:</span>
                <span>2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Transactions</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Balance Change
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Confirmations
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {address.transactions.map((tx, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => onTxSelect(tx)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500 dark:text-blue-400">
                    {tx.txid}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1 text-gray-400" />
                      {new Date(tx.timestamp).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {Math.abs(tx.amount).toFixed(8)} {chainName === 'Bitcoin' ? 'BTC' : chainName.substring(0, 3).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={tx.amount > 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(8)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {tx.confirmations.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MultiChainExplorer;