import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const WalletConnection = ({ isConnected, walletAddress, onConnect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const mockAddress = '0x742d35Cc6634C0532925a3b8D4C9db96590b5b8e';
        onConnect(mockAddress);
      } else {
        toast({
          title: "❌ MetaMask Not Found",
          description: "Please install MetaMask to continue.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "❌ Connection Failed",
        description: "An error occurred while connecting the wallet.",
        variant: "destructive"
      });
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "📋 Address Copied",
      description: "Wallet address copied to clipboard.",
    });
  };

  const disconnectWallet = () => {
    setIsDropdownOpen(false);
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const addMonadNetwork = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Button 
          onClick={connectWallet}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 glow-purple"
        >
          <Wallet className="w-5 h-5 mr-2" />
          Connect Wallet
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
          <Wallet className="w-4 h-4 text-white" />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-white">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
          <p className="text-xs text-green-400">Connected</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {isDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl z-50"
        >
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Wallet Connected</p>
                <p className="text-xs text-green-400">MONAD Testnet</p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={copyAddress}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Address</span>
              </button>

              <button
                onClick={addMonadNetwork}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Add MONAD Network</span>
              </button>

              <hr className="border-white/20 my-2" />

              <button
                onClick={disconnectWallet}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WalletConnection;