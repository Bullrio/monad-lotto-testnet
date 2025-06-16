import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Trophy, Users, Clock, Zap, Star, Coins, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import NumberGrid from '@/components/NumberGrid';
import WalletConnection from '@/components/WalletConnection';
import GameStats from '@/components/GameStats';
import RewardPool from '@/components/RewardPool';
import FloatingParticles from '@/components/FloatingParticles';

const FIXED_JOIN_AMOUNT = 1; // Fixed join amount of 1 MONAD

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [gameData, setGameData] = useState({
    currentRound: 1,
    totalSlots: 50, // Changed to 50 slots
    filledSlots: 15, // Example: 15 filled slots
    rewardPool: 15, // Example: 15 MONAD in pool (15 slots * 1 MONAD)
    walletPool: 3.75, // Example: 25% of 15 MONAD
    timeLeft: 3600,
    takenNumbers: [1, 7, 13, 21, 33, 42], // Example taken numbers within 1-50 range
    lastWinner: null,
    weeklyReward: 15.75
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setGameData(prev => ({
        ...prev,
        timeLeft: prev.timeLeft > 0 ? prev.timeLeft - 1 : 0
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleWalletConnect = (address) => {
    setIsConnected(true);
    setWalletAddress(address);
    toast({
      title: "🎉 Wallet Connected!",
      description: `Welcome to MONAD Lotto! Address: ${address.slice(0, 6)}...${address.slice(-4)}`,
    });
  };

  const handleNumberSelect = (number) => {
    if (gameData.takenNumbers.includes(number)) {
      toast({
        title: "❌ Number Already Taken",
        description: "Please choose another available number!",
        variant: "destructive"
      });
      return;
    }

    setSelectedNumber(number);
    toast({
      title: "✨ Number Selected!",
      description: `You selected number ${number}. Confirm to join!`,
    });
  };

  const handleJoinLottery = () => {
    if (!selectedNumber) {
      toast({
        title: "⚠️ Select a Number First",
        description: "Please choose your lucky number!",
        variant: "destructive"
      });
      return;
    }
    
    setGameData(prev => ({
      ...prev,
      filledSlots: prev.filledSlots + 1,
      rewardPool: prev.rewardPool + FIXED_JOIN_AMOUNT,
      takenNumbers: [...prev.takenNumbers, selectedNumber]
    }));

    toast({
      title: "🎊 Successfully Joined!",
      description: `You have joined with number ${selectedNumber} for ${FIXED_JOIN_AMOUNT} MONAD. Good luck!`,
    });

    setSelectedNumber(null);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen lottery-bg relative">
      <FloatingParticles />
      
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center glow-green">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-orbitron font-bold text-white neon-text">
                  MONAD LOTTO
                </h1>
                <p className="text-sm text-green-400">Testnet Edition</p>
              </div>
            </motion.div>

            <WalletConnection 
              isConnected={isConnected}
              walletAddress={walletAddress}
              onConnect={handleWalletConnect}
            />
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <GameStats gameData={gameData} />
            <RewardPool gameData={gameData} />
            
            <motion.div 
              className="glass-card rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Time Left</h3>
              </div>
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold countdown-digit mb-2">
                  {formatTime(gameData.timeLeft)}
                </div>
                <p className="text-sm text-gray-400">Until draw starts</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.div 
              className="glass-card rounded-xl p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-xl font-semibold text-white">Pick Your Lucky Number (1-50)</h2>
                </div>
                <div className="text-sm text-gray-400">
                  {gameData.filledSlots}/{gameData.totalSlots} slots filled
                </div>
              </div>

              <NumberGrid 
                selectedNumber={selectedNumber}
                takenNumbers={gameData.takenNumbers}
                onNumberSelect={handleNumberSelect}
                maxNumber={50} // Pass maxNumber prop
              />

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleJoinLottery}
                  disabled={!isConnected || !selectedNumber}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 glow-green"
                >
                  <Coins className="w-5 h-5 mr-2" />
                  Join Now ({FIXED_JOIN_AMOUNT} MONAD)
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                    });
                  }}
                  className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Auto Pick
                </Button>
              </div>

              <AnimatePresence>
                {selectedNumber && (
                  <motion.div 
                    className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                          {selectedNumber}
                        </div>
                        <div>
                          <p className="text-white font-semibold">Selected Number</p>
                          <p className="text-sm text-gray-400">Ready to join</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedNumber(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div 
              className="mt-8 glass-card rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                How to Play
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-300">
                <div className="space-y-2">
                  <p>• Connect your MONAD Testnet wallet</p>
                  <p>• Pick an available number from 1-50</p>
                  <p>• Pay {FIXED_JOIN_AMOUNT} MONAD to join</p>
                </div>
                <div className="space-y-2">
                  <p>• Wait until {gameData.totalSlots} slots are filled</p>
                  <p>• System randomly picks a winning number</p>
                  <p>• Winner gets 75% of the total pool</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Toaster />
    </div>
  );
}

export default App;