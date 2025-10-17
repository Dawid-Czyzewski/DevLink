import { ProfileHeader, ProfileMenu, LastChat } from '../components/profile';

const ProfilePage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
			<ProfileHeader />
			<ProfileMenu />
			<LastChat />
		</div>
	);
};

export default ProfilePage;
