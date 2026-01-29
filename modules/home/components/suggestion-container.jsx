import { Image } from 'lucide-react'
import React from 'react'
import { emoji } from 'zod';
import ProjectForm from './project-form';
import ProjectList from './project-list';

const PROJECT_TEMPLATES = [
    {
        emoji: "🎬",
        title: "Build a Netflix clone",
        prompt:
            "Build a Netflix-style homepage with a hero banner (use a nice, dark-mode compatible gradient here), movie sections, responsive cards, and a modal for viewing details using mock data and local state. Use dark mode.",
    },
    {
        emoji: "📦",
        title: "Build an admin dashboard",
        prompt:
            "Create an admin dashboard with a sidebar, stat cards, a chart placeholder, and a basic table with filter and pagination using local state. Use clear visual grouping and balance in your design for a modern, professional look.",
    },
    {
        emoji: "📋",
        title: "Build a kanban board",
        prompt:
            "Build a kanban board with drag-and-drop using react-beautiful-dnd and support for adding and removing tasks with local state. Use consistent spacing, column widths, and hover effects for a polished UI.",
    },
    {
        emoji: "🗂️",
        title: "Build a file manager",
        prompt:
            "Build a file manager with folder list, file grid, and options to rename or delete items using mock data and local state. Focus on spacing, clear icons, and visual distinction between folders and files.",
    },
    {
        emoji: "📺",
        title: "Build a YouTube clone",
        prompt:
            "Build a YouTube-style homepage with mock video thumbnails, a category sidebar, and a modal preview with title and description using local state. Ensure clean alignment and a well-organized grid layout.",
    },
    {
        emoji: "🛍️",
        title: "Build a store page",
        prompt:
            "Build a store page with category filters, a product grid, and local cart logic to add and remove items. Focus on clear typography, spacing, and button states for a great e-commerce UI.",
    },
    {
        emoji: "🏡",
        title: "Build an Airbnb clone",
        prompt:
            "Build an Airbnb-style listings grid with mock data, filter sidebar, and a modal with property details using local state. Use card spacing, soft shadows, and clean layout for a welcoming design.",
    },
    {
        emoji: "🎵",
        title: "Build a Spotify clone",
        prompt:
            "Build a Spotify-style music player with a sidebar for playlists, a main area for song details, and playback controls. Use local state for managing playback and song selection. Prioritize layout balance and intuitive control placement for a smooth user experience. Use dark mode.",
    }
];

const SuggestionContainer = () => {
    return (
        <div className='max-w-5xl mx-auto mt-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
                {
                    PROJECT_TEMPLATES.map((template, index) => {
                        return (
                            <button
                                key={index}
                                className="group relative p-4 rounded-xl border bg-card hover:bg-accent/50 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md hover:border-primary/30"
                            >
                                <div className="flex flex-col gap-2 items-center">
                                    <span className="text-3xl" role="img" aria-label={template.title}>
                                        {template.emoji}
                                    </span>
                                    <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                                        {template.title}
                                    </h3>
                                </div>
                            </button>
                        )
                    })
                }
            </div>
            <div className="flex items-center w-full gap-3 mt-4 mb-4">
                <div className="grow border-t border-white/40"></div>

                <p className="text-white/60 text-sm whitespace-nowrap">
                    OR DESCRIBE YOUR OWN IDEA
                </p>

                <div className="grow border-t border-white/40"></div>
            </div>
            <ProjectForm />
            <ProjectList />
        </div>
    )
}

export default SuggestionContainer