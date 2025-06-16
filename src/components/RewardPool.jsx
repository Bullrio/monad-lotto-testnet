import React from 'react';
import { motion } from 'framer-motion';
import { Coins, TrendingUp, Gift, Wallet } from 'lucide-react';

const RewardPool = ({ gameData }) => {
  const winnerReward = gameData.rewardPool * 0.75;
  const poolContribution = gameData.rewardPool * 0.25;

  return (
    <motion.div 
      className="glass-card rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Coins className="w-5 h-5 mr-2 text-yellow-400" />
        Reward Pool 
      </h3>

      <div className="mb-6 p-4 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-lg">
        <div className="text-center">
          <p className="text-sm text-gray-300 mb-1">Current Total Pool</p>
          <p className="text-3xl font-orbitron font-bold text-yellow-400 neon-text">
            {gameData.rewardPool.toFixed(2)} MONAD
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">Winner's Prize (75%)</span>
          </div>
          <span className="font-semibold text-green-400">
            {winnerReward.toFixed(2)} MONAD
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Wallet className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">To Wallet Pool (25%)</span>
          </div>
          <span className="font-semibold text-purple-400">
            {poolContribution.toFixed(2)} MONAD
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Gift className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Total Wallet Pool</span>
          </div>
          <span className="font-semibold text-blue-400">
            {gameData.walletPool.toFixed(2)} MONAD
          </span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-lg">
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">Next Weekly Reward</p>
          <p className="text-lg font-semibold text-indigo-400">
            {gameData.weeklyReward.toFixed(2)} MONAD
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Daily total + 20% of Wallet Pool
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RewardPool;