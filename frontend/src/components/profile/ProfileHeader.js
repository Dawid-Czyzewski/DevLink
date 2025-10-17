import { useAuth } from '../../contexts/AuthContext';

const ProfileHeader = () => {
	const { user } = useAuth();

	return (
		<div className="bg-gray-800/30 backdrop-blur-lg border-b border-gray-700/50 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-white mb-2">
						{user?.nickname}
					</h1>
					<p className="text-gray-400 text-lg">
						{user?.email}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProfileHeader;
