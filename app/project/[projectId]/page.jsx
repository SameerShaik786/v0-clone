import React from 'react'

import ProjectView from '@/modules/projects/components/ProjectView';

const ProjectPage = async ({ params }) => {
    const {projectId} = await params
    return (
    <ProjectView projectId= {projectId} />
    )
}

export default ProjectPage