import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  RefreshCw, 
  Server, 
  Check, 
  AlertTriangle, 
  X, 
  Clock, 
  Users, 
  Database, 
  BarChart 
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext'; // Adjust import path as needed

const ChainHealthMonitor = ({ chains: initialChains }) => {
  const { isDarkMode } = useTheme();
  const [chains, setChains] = useState(initialChains || []);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Simulate a refresh action
  const refreshData = () => {
    setIsRefreshing(true);
    
    // Simulate network delay
    setTimeout(() => {
      // Update some random metrics to simulate live data
      const updatedChains = chains.map(chain => ({
        ...chain,
        blocks: chain.status === 'running' ? 
          (chain.blocks || Math.floor(Math.random() * 1000) + 45000) + Math.floor(Math.random() * 10) : 
          chain.blocks,
        peers: chain.status === 'running' ? 
          Math.floor(Math.random() * 10) + 3 : 
          chain.peers,
        tps: chain.status === 'running' ? 
          parseFloat((Math.random() * 50 + 10).toFixed(1)) : 
          chain.tps,
        latency: chain.status === 'running' ? 
          Math.floor(Math.random() * 200) + 50 : 
          chain.latency
      }));
      
      setChains(updatedChains);
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 800);
  };
  
  // Initial data setup for metrics not included in the props
  useEffect(() => {
    if (initialChains && initialChains.length > 0) {
      const enrichedChains = initialChains.map(chain => ({
        ...chain,
        blocks: chain.status === 'running' ? Math.floor(Math.random() * 1000) + 45000 : null,
        peers: chain.status === 'running' ? Math.floor(Math.random() * 10) + 3 : null,
        tps: chain.status === 'running' ? parseFloat((Math.random() * 50 + 10).toFixed(1)) : null,
        latency: chain.status === 'running' ? Math.floor(Math.random() * 200) + 50 : null
      }));
      setChains(enrichedChains);
    }
  }, [initialChains]);
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'running':
        return <Check size={14} />;
      case 'starting':
        return <Clock size={14} />;
      case 'stopping':
        return <AlertTriangle size={14} />;
      case 'error':
        return <X size={14} />;
      default:
        return <AlertTriangle size={14} />;
    }
  };
  
  const styles = {
    container: {
      width: '100%',
      padding: '24px',
      backgroundColor: isDarkMode ? '#1f2937' : 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '24px',
      transition: 'all 0.3s ease'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: isDarkMode ? '#f3f4f6' : '#111827'
    },
    lastUpdated: {
      fontSize: '12px',
      color: isDarkMode ? '#9ca3af' : '#6b7280',
      marginTop: '4px'
    },
    refreshButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '8px',
      backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
      color: isDarkMode ? '#f3f4f6' : '#374151',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '14px',
      fontWeight: '500'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: '16px'
    },
    card: (status) => ({
      padding: '20px',
      borderRadius: '10px',
      border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: isDarkMode ? '#273549' : '#f9fafb',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
      ':hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      },
      boxShadow: status === 'running' ? 
        `0 0 0 1px ${isDarkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'}` : 
        status === 'error' ? 
          `0 0 0 1px ${isDarkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)'}` : 
          'none'
    }),
    chainIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: isDarkMode ? '#374151' : '#e5e7eb',
      marginBottom: '12px'
    },
    chainNameRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '12px'
    },
    chainName: {
      fontSize: '16px',
      fontWeight: '600',
      color: isDarkMode ? '#f3f4f6' : '#111827'
    },
    statusBadge: (status) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px 8px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: '500',
      backgroundColor: 
        status === 'running' ? (isDarkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)') : 
        status === 'starting' ? (isDarkMode ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)') :
        status === 'stopping' ? (isDarkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)') :
        status === 'error' ? (isDarkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)') : 
        (isDarkMode ? 'rgba(156, 163, 175, 0.2)' : 'rgba(156, 163, 175, 0.1)'),
      color: 
        status === 'running' ? '#10b981' : 
        status === 'starting' ? '#f59e0b' :
        status === 'stopping' ? '#ef4444' :
        status === 'error' ? '#ef4444' : 
        isDarkMode ? '#9ca3af' : '#6b7280'
    }),
    divider: {
      height: '1px',
      backgroundColor: isDarkMode ? '#374151' : '#e5e7eb',
      width: '100%',
      margin: '8px 0 16px'
    },
    metricsContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px'
    },
    metric: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    metricLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '12px',
      color: isDarkMode ? '#9ca3af' : '#6b7280'
    },
    metricValue: {
      fontSize: '16px',
      fontWeight: '500',
      color: isDarkMode ? '#f3f4f6' : '#111827',
    },
    errorMessage: {
      fontSize: '12px',
      color: '#ef4444',
      marginTop: '8px'
    },
    noDataMessage: {
      fontSize: '12px',
      color: isDarkMode ? '#9ca3af' : '#6b7280',
      fontStyle: 'italic',
      textAlign: 'center',
      marginTop: '8px'
    },
    spinAnimation: {
      animation: 'spin 1.5s linear infinite',
      '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
      }
    }
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>
            <Activity size={24} color={isDarkMode ? '#10b981' : '#047857'} />
            <span>Network Status</span>
          </h3>
          <div style={styles.lastUpdated}>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
        <button 
          style={styles.refreshButton} 
          onClick={refreshData}
          disabled={isRefreshing}
        >
          <RefreshCw 
            size={16} 
            style={isRefreshing ? {
              animation: 'spin 1.5s linear infinite'
            } : {}}
          />
          <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>
      
      <div style={styles.grid}>
        {chains.map(chain => (
          <div key={chain.id} style={styles.card(chain.status)} onClick={() => console.log(`${chain.display_name} details clicked`)}>
            <div style={styles.chainNameRow}>
              <div style={styles.chainName}>{chain.display_name}</div>
              <div style={styles.statusBadge(chain.status)}>
                {getStatusIcon(chain.status)}
                <span>
                  {chain.status === 'running' ? 'Online' : 
                   chain.status === 'starting' ? 'Starting' :
                   chain.status === 'stopping' ? 'Stopping' :
                   chain.status === 'error' ? 'Error' : 'Offline'}
                </span>
              </div>
            </div>
            
            <div style={styles.divider}></div>
            
            {chain.status === 'running' ? (
              <div style={styles.metricsContainer}>
                <div style={styles.metric}>
                  <div style={styles.metricLabel}>
                    <Database size={12} />
                    <span>Blocks</span>
                  </div>
                  <div style={styles.metricValue}>
                    {chain.blocks?.toLocaleString() || '—'}
                  </div>
                </div>
                
                <div style={styles.metric}>
                  <div style={styles.metricLabel}>
                    <Users size={12} />
                    <span>Peers</span>
                  </div>
                  <div style={styles.metricValue}>
                    {chain.peers || '—'}
                  </div>
                </div>
                
                <div style={styles.metric}>
                  <div style={styles.metricLabel}>
                    <BarChart size={12} />
                    <span>TPS</span>
                  </div>
                  <div style={styles.metricValue}>
                    {chain.tps || '—'}
                  </div>
                </div>
                
                <div style={styles.metric}>
                  <div style={styles.metricLabel}>
                    <Activity size={12} />
                    <span>Latency</span>
                  </div>
                  <div style={styles.metricValue}>
                    {chain.latency ? `${chain.latency}ms` : '—'}
                  </div>
                </div>
              </div>
            ) : chain.status === 'error' ? (
              <div style={styles.errorMessage}>
                Error connecting to node. Check network connectivity.
              </div>
            ) : (
              <div style={styles.noDataMessage}>
                No metrics available while {chain.status}.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Default props
ChainHealthMonitor.defaultProps = {
  chains: [
    { id: 'bitcoin', display_name: 'Bitcoin', status: 'running' },
    { id: 'thunder', display_name: 'Thunder', status: 'running' },
    { id: 'zside', display_name: 'ZSide', status: 'starting' },
    { id: 'bitnames', display_name: 'BitNames', status: 'error' }
  ]
};

export default ChainHealthMonitor;