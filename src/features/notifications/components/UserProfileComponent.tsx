import Card from '@/components/Card';
import GameStatCard from '@/components/GameStatCard';
import ProfileHeader from '@/components/ProfileHeader';
import { GameType } from '@/models/gameType.enum';
import { SimpleUserProfile } from '@/models/user.model';
import { formatName } from '@/utils';

type Props = {
  userProfile: SimpleUserProfile;
  isCurrentUser?: boolean;
};

const UserProfileComponent = ({
  userProfile,
  isCurrentUser = false,
}: Props) => {
  return (
    <>
      <ProfileHeader userProfile={userProfile} />
      <h2 className=" mt-8 mb-4 text-lg font-semibold">
        {isCurrentUser ? 'Your' : formatName(userProfile.fullName)}'s Games
      </h2>
{/* add api hook to fetch game data */}
      {/* {userProfile.games ? (
        Object.keys(userProfile.games).map((gameName) => (
          <GameStatCard
            key={gameName}
            gameStats={{
              gameName,
              ...userProfile.games![gameName as GameType],
            }}
          />
        ))
      ) : ( */}
      <Card className="text-center flex flex-col">
        <p className="font-semibold">No games played yet</p>
        {isCurrentUser ? (
          <p>Start playing games to see your stats here!</p>
        ) : (
          <p>
            They'll need to complete a game in order to see their stats here.
          </p>
        )}
      </Card>
      {/* )} */}
    </>
  );
};

export default UserProfileComponent;
