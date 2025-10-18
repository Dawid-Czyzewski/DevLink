import { 
    ViewProfileCategory,
    ViewProfileDescription,
    ViewProfileTags,
    ViewProfileExperience,
    ViewProfileContact
} from './ViewProfileSections';

const ViewProfileContent = ({ user }) => {

    return (
        <div className="px-6 pt-8 pb-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <ViewProfileDescription description={user.description} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ViewProfileCategory category={user.category} />
                    <ViewProfileTags tags={user.tags} />
                    <ViewProfileExperience experienceLevel={user.experienceLevel} />
                    <ViewProfileContact 
                        github={user.github}
                        website={user.website}
                        linkedin={user.linkedin}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewProfileContent;
