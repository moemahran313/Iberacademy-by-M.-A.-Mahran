import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Crown,
  Flame,
  Zap,
  Award,
  Sparkles,
  RefreshCw,
  Users,
  ShieldCheck,
  ChevronUp,
  Medal,
  Globe,
  TrendingUp,
  Info,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { UserProgress, CEFRLevel } from '../types';
import { soundEffects } from '../utils/audio';
import { AvatarDisplay } from './AvatarDisplay';

export interface LeaderboardUser {
  uid: string;
  displayName: string;
  photoURL?: string;
  avatarId?: string;
  currentLevel: CEFRLevel | string;
  streakDays: number;
  xp: number;
  countryFlag?: string;
  isCurrentUser?: boolean;
  rank?: number;
}

interface GlobalLeagueProps {
  userProgress: UserProgress;
}

export const GlobalLeague: React.FC<GlobalLeagueProps> = ({ userProgress }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [activeTier, setActiveTier] = useState<'diamond' | 'alltime'>('diamond');

  const currentUser = auth.currentUser;
  const currentUid = currentUser?.uid || 'local_user';
  const currentDisplayName = currentUser?.displayName || 'You (Learner)';
  const currentPhotoURL = currentUser?.photoURL || '';

  // Subscribe to real-time top users from Firestore
  useEffect(() => {
    setLoading(true);
    let unsubscribe = () => {};

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('xp', 'desc'), limit(15));

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const firestoreUsers: LeaderboardUser[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            firestoreUsers.push({
              uid: data.uid || doc.id,
              displayName: data.displayName || 'Learner',
              photoURL: data.photoURL || '',
              avatarId: data.avatarId || undefined,
              currentLevel: data.currentLevel || 'A1',
              streakDays: typeof data.streakDays === 'number' ? data.streakDays : 0,
              xp: typeof data.xp === 'number' ? data.xp : 0,
            });
          });

          // Build integrated list with real Firestore user profiles
          mergeAndRankLeaderboard(firestoreUsers);
          setLoading(false);
          setIsRefreshing(false);
        },
        (error) => {
          console.warn('Firestore onSnapshot subscription notice:', error);
          // Fallback to real active user if query encounters issue
          mergeAndRankLeaderboard([]);
          setLoading(false);
          setIsRefreshing(false);
        }
      );
    } catch (e) {
      console.warn('Error setting up leaderboard listener:', e);
      mergeAndRankLeaderboard([]);
      setLoading(false);
      setIsRefreshing(false);
    }

    return () => unsubscribe();
  }, [userProgress.xp, userProgress.streakDays, userProgress.currentLevel, currentUid]);

  // Rank strictly real Firestore users and current authenticated/active user
  const mergeAndRankLeaderboard = (rawFirestoreUsers: LeaderboardUser[]) => {
    const userMap = new Map<string, LeaderboardUser>();

    // Add strictly real Firestore users
    rawFirestoreUsers.forEach((fu) => {
      userMap.set(fu.uid, fu);
    });

    // Ensure current active user is included with live XP if not already present or needs live update
    const existing = userMap.get(currentUid);
    userMap.set(currentUid, {
      uid: currentUid,
      displayName: existing?.displayName || currentDisplayName,
      photoURL: existing?.photoURL || currentPhotoURL,
      currentLevel: userProgress.currentLevel || 'A1',
      streakDays: userProgress.streakDays || 0,
      xp: Math.max(userProgress.xp || 0, existing?.xp || 0),
      isCurrentUser: true,
    });

    // Sort by XP descending
    const sorted = Array.from(userMap.values()).sort((a, b) => b.xp - a.xp);

    // Assign 1-indexed ranks
    const ranked = sorted.map((user, idx) => ({
      ...user,
      rank: idx + 1,
      isCurrentUser: user.uid === currentUid,
    }));

    setLeaderboard(ranked);
  };

  const handleManualRefresh = () => {
    soundEffects.playPop();
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Find user rank and next target
  const userItem = leaderboard.find((u) => u.isCurrentUser);
  const userRank = userItem?.rank || 1;
  const userAbove = userRank > 1 ? leaderboard[userRank - 2] : null;
  const xpNeeded = userAbove ? userAbove.xp - (userItem?.xp || 0) + 10 : 0;

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
      {/* Header & Division Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 text-amber-500 shrink-0">
            <Trophy className="w-5 h-5 text-amber-500" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-black uppercase bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                Liga Diamante • Division 1
              </span>
              <span className="text-[10px] text-stone-400 dark:text-stone-500 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" /> Reset in 2d
              </span>
            </div>
            <h3 className="text-lg font-black text-stone-900 dark:text-white mt-0.5">
              Global League
            </h3>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
          <div className="flex items-center p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
            <button
              onClick={() => {
                soundEffects.playPop();
                setActiveTier('diamond');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTier === 'diamond'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Top 10
            </button>
            <button
              onClick={() => {
                soundEffects.playPop();
                setActiveTier('alltime');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTier === 'alltime'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              All Time
            </button>
          </div>

          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition cursor-pointer"
            title="Refresh Leaderboard"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Motivation Banner for Current User */}
      {userItem && (
        <div className="p-3.5 bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-700/60 rounded-2xl flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 font-black flex items-center justify-center shrink-0 shadow-xs">
              #{userRank}
            </div>
            <div>
              <div className="font-extrabold text-stone-900 dark:text-stone-100">
                You are placed <span className="text-amber-600 dark:text-amber-400">Rank #{userRank}</span> globally
              </div>
              <div className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                {userAbove
                  ? `Earn ${xpNeeded} XP to overtake ${userAbove.displayName}!`
                  : '🔥 You are leading the Global League at #1!'}
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-black font-mono bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
            <Zap className="w-3.5 h-3.5 fill-amber-500" />
            <span>{userItem.xp.toLocaleString()} XP</span>
          </div>
        </div>
      )}

      {/* Leaderboard Mobile-First List */}
      {loading ? (
        <div className="py-12 text-center space-y-3">
          <RefreshCw className="w-6 h-6 text-amber-500 animate-spin mx-auto" />
          <p className="text-xs text-stone-400 font-mono">Connecting to Global League...</p>
        </div>
      ) : (
        <div className="space-y-2">
          {leaderboard
            .slice(0, activeTier === 'diamond' ? 10 : 15)
            .map((item) => {
              const isTop3 = item.rank && item.rank <= 3;
              const rankColor =
                item.rank === 1
                  ? 'text-amber-500 bg-amber-500/10 border-amber-500/30'
                  : item.rank === 2
                  ? 'text-stone-400 bg-stone-200/50 dark:bg-stone-800 border-stone-300 dark:border-stone-700'
                  : item.rank === 3
                  ? 'text-amber-700 dark:text-amber-600 bg-amber-700/10 border-amber-700/30'
                  : 'text-stone-500 bg-stone-100 dark:bg-stone-800/80 border-stone-200 dark:border-stone-700/50';

              return (
                <motion.div
                  key={item.uid}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-2xl border transition flex items-center justify-between gap-3 ${
                    item.isCurrentUser
                      ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/40 shadow-xs'
                      : isTop3
                      ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-500/30'
                      : 'bg-white dark:bg-stone-900 border-stone-200/70 dark:border-stone-800/70 hover:bg-stone-50/50 dark:hover:bg-stone-800/30'
                  }`}
                >
                  {/* Rank Badge & User Metadata */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Rank Badge */}
                    <div
                      className={`w-8 h-8 rounded-xl border flex items-center justify-center font-black font-mono text-xs shrink-0 ${rankColor}`}
                    >
                      {item.rank === 1 ? (
                        <Crown className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ) : item.rank === 2 ? (
                        <Medal className="w-4 h-4 text-stone-400" />
                      ) : item.rank === 3 ? (
                        <Award className="w-4 h-4 text-amber-700 dark:text-amber-600" />
                      ) : (
                        `#${item.rank}`
                      )}
                    </div>

                    {/* Avatar Image or Cultural Avatar */}
                    <div className="relative shrink-0">
                      <AvatarDisplay
                        photoURL={item.photoURL}
                        avatarId={item.avatarId}
                        name={item.displayName}
                        size="sm"
                      />
                      {item.countryFlag && (
                        <span className="absolute -bottom-1 -right-1 text-[11px] leading-none drop-shadow-xs">
                          {item.countryFlag}
                        </span>
                      )}
                    </div>

                    {/* Name & CEFR Level */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-stone-900 dark:text-white truncate">
                          {item.displayName}
                        </span>
                        {item.isCurrentUser && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-amber-500 text-stone-950">
                            YOU
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-stone-400 dark:text-stone-500 font-mono mt-0.5">
                        <span className="px-1.5 py-0.2 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-black">
                          {item.currentLevel}
                        </span>
                        <span className="flex items-center gap-0.5 text-orange-500 dark:text-orange-400 font-bold">
                          <Flame className="w-3 h-3 fill-orange-500" />
                          {item.streakDays}d
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* XP Total */}
                  <div className="text-right shrink-0">
                    <div className="text-xs font-black text-amber-600 dark:text-amber-400 font-mono flex items-center justify-end gap-1">
                      <Zap className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{item.xp.toLocaleString()}</span>
                    </div>
                    <span className="text-[9px] text-stone-400 dark:text-stone-500 uppercase font-mono font-semibold">
                      XP Points
                    </span>
                  </div>
                </motion.div>
              );
            })}
        </div>
      )}

      {/* Community Footer Notice */}
      <div className="pt-2 text-center text-[11px] text-stone-400 dark:text-stone-500 font-mono flex items-center justify-center gap-1.5">
        <Globe className="w-3.5 h-3.5 text-stone-400" />
        <span>Ranks update in real-time as learners read and complete lessons.</span>
      </div>
    </div>
  );
};
