import AppHeader from '@/components/AppHeader';
import Card from '@/components/Card';
import ProfileHeader from '@/components/ProfileHeader';
import { useAuth } from '@/contexts/AuthContext';
import GameStatCard from '@/components/GameStatCard';
import { GameType } from '@/models/gameType.enum';

const ProfilePage = () => {
  const { userProfile } = useAuth();

  return (
    <>
      <div className="page">
        <AppHeader title="Profile" />
        <ProfileHeader userProfile={userProfile!} />
        <h2 className=" mt-8 mb-4 text-lg font-semibold">Your Games</h2>

        {userProfile?.games ? (
          Object.keys(userProfile!.games!).map((gameName) => (
            <GameStatCard
              key={gameName}
              gameStats={{
                gameName,
                ...userProfile!.games![gameName as GameType],
              }}
            />
          ))
        ) : (
          <Card className="text-center flex flex-col">
            <p className="font-semibold">No games played yet</p>
            <p>Complete a game to see your stats here!</p>
          </Card>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
