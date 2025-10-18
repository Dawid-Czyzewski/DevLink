import { useAuth } from '../../contexts/AuthContext';

const ProfileHeader = () => {
	const { user, isLoading } = useAuth();

	if (isLoading || !user) {
		return (
			<div className="bg-gray-800/30 backdrop-blur-lg border-b border-gray-700/50 py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<div className="animate-pulse">
							<div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-2"></div>
							<div className="h-4 bg-gray-700 rounded w-32 mx-auto"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-gray-800/30 backdrop-blur-lg border-b border-gray-700/50 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-white mb-2">
						{user.nickname}
					</h1>
					<p className="text-gray-400 text-lg">
						{user.email}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProfileHeader;
