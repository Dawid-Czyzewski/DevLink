import { 
    DescriptionSection, 
    TagsSection, 
    CategorySection, 
    ExperienceSection, 
    ContactSection 
} from '../profile';

const EditProfileForm = ({ 
    formData, 
    errors, 
    handleInputChange, 
    handleTagsChange, 
    handleCheckboxChange, 
    handleSubmit, 
    isLoading 
}) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-10">
            <DescriptionSection
                description={formData.description}
                onChange={(value) => handleInputChange('description', value)}
                error={errors.description}
            />

            <TagsSection
                tags={formData.tags}
                onChange={handleTagsChange}
                error={errors.tags}
            />

            <CategorySection
                category={formData.category}
                onChange={(value) => handleInputChange('category', value)}
                error={errors.category}
            />

            <ExperienceSection
                hasCommercialExperience={formData.hasCommercialExperience}
                experienceLevel={formData.experienceLevel}
                onCheckboxChange={(checked) => handleCheckboxChange('hasCommercialExperience', checked)}
                onLevelChange={(value) => handleInputChange('experienceLevel', value)}
                error={errors.experienceLevel}
            />

            <ContactSection
                github={formData.github}
                website={formData.website}
                linkedin={formData.linkedin}
                onChange={handleInputChange}
                errors={errors}
            />
        </form>
    );
};

export default EditProfileForm;
