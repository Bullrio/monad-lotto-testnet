import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Trophy, Calendar } from 'lucide-react';

const GameStats = ({ gameData }) => {
  const stats = [
    {
      icon: Users,
      label: 'Slots Filled', // Changed from 'Slot Terisi'
      value: `${gameData.filledSlots}/${gameData.totalSlots}`,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: Target,
      label: 'Current Round', // Changed from 'Ronde Saat Ini'
      value: `#${gameData.currentRound}`,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30'
    },
    {
      icon: Trophy,
      label: 'Last Winner', // Changed from 'Pemenang Terakhir'
      value: gameData.lastWinner || 'None Yet', // Changed from 'Belum Ada'
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/30'
    },
    {
      icon: Calendar,
      label: 'Weekly Reward', // Changed from 'Hadiah Mingguan'
      value: `${gameData.weeklyReward} MONAD`,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30'
    }
  ];

  return (
    <motion.div 
      className="glass-card rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Target className="w-5 h-5 mr-2 text-blue-400" />
        Game Statistics 
      </h3>
      
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={`p-4 rounded-lg border ${stat.bgColor} ${stat.borderColor}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-sm text-gray-300">{stat.label}</span>
              </div>
              <span className={`font-semibold ${stat.color}`}>
                {stat.value}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Slot Progress</span> 
          <span>{Math.round((gameData.filledSlots / gameData.totalSlots) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(gameData.filledSlots / gameData.totalSlots) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default GameStats;