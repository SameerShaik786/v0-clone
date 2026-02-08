"use client";

import { Image } from 'lucide-react'
import React, { useState, useRef } from 'react'
import { emoji } from 'zod';
import ProjectForm from './project-form';
import ProjectList from './project-list';
/*
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
*/

const PROJECT_TEMPLATES = [
    {
        emoji: "🧠",
        title: "Smart Todo Manager",
        prompt:
            "Build a smart todo manager with priority tagging, due date badges, progress tracking bar, and category filters using local state. Include smooth add/edit animations, subtle color coding for priority levels, and a clean productivity-focused layout.",
    },
    {
        emoji: "🧮",
        title: "Scientific Calculator UI",
        prompt:
            "Create a modern scientific calculator with history panel, memory buttons, keyboard input support, and theme toggle using local state. Focus on tactile button feedback, clean numeric typography, and compact professional layout.",
    },
    {
        emoji: "🗨️",
        title: "Realtime Chat Workspace",
        prompt:
            "Build a chat workspace with conversation sidebar, message reactions, typing indicator, message grouping, and file attachment placeholder using local state. Focus on message readability, bubble spacing, and smooth scrolling behavior.",
    },
    {
        emoji: "🎼",
        title: "Immersive Music Player",
        prompt:
            "Design an immersive music player with animated album art, playlist drawer, playback queue panel, and progress waveform placeholder using local state. Use a dark aesthetic with strong visual focus on currently playing media.",
    },
    {
        emoji: "🧾",
        title: "Subscription Tracker",
        prompt:
            "Build a subscription tracking dashboard showing monthly cost summary, upcoming renewal alerts, service logos, and category grouping using local state. Emphasize financial clarity, color-coded spending indicators, and card-based layout.",
    },
    {
        emoji: "🌗",
        title: "Habit + Mood Tracker",
        prompt:
            "Create a habit and mood tracking interface with daily check grid, streak counters, mood emoji selector, and weekly progress chart placeholder using local state. Focus on calming colors, simple interaction flow, and motivational UI feedback.",
    },
    {
        emoji: "🧭",
        title: "Learning Roadmap Planner",
        prompt:
            "Build a learning roadmap planner with skill tree visualization placeholder, milestone cards, progress tracking, and resource links using local state. Focus on clear learning progression visuals and structured content sections.",
    },
    {
        emoji: "📦",
        title: "Personal Inventory Manager",
        prompt:
            "Create a personal inventory manager with item categories, quantity tracking, search filter, and low-stock alerts using local state. Focus on dense but readable data layout and fast scanning usability.",
    }
];


const PROJECT_TEMPLATES2 = [
    {
        emoji: "🧮",
        title: "Build a calculator",
        prompt:
            "Build a simple calculator with number buttons, basic operators (+, -, *, /), and a display screen. Use local state to manage input and results. Keep the UI clean and centered.",
    },
    {
        emoji: "✅",
        title: "Build a todo list",
        prompt:
            "Build a todo list where users can add, delete, and mark tasks as completed using local state. Show completed tasks with strike-through styling. Keep layout simple and responsive.",
    },
    {
        emoji: "📝",
        title: "Build a notes app",
        prompt:
            "Build a notes app where users can create, edit, and delete notes using local state. Display notes in a simple card layout with clear spacing and readable typography.",
    },
    {
        emoji: "⏱️",
        title: "Build a timer / stopwatch",
        prompt:
            "Build a timer app with start, pause, and reset functionality using local state and intervals. Show time in minutes and seconds. Keep UI minimal and centered.",
    },
    {
        emoji: "🔐",
        title: "Build a login form UI",
        prompt:
            "Build a login form with email and password fields, inline validation messages, and submit handling using local state. Center the form and keep styling clean.",
    },
    {
        emoji: "📊",
        title: "Build a mini analytics dashboard",
        prompt:
            "Build a mini dashboard with stat cards showing mock analytics data. Add a button to refresh data using local state. Keep layout professional and structured.",
    },
    {
        emoji: "📁",
        title: "Build a file list viewer",
        prompt:
            "Build a file list viewer showing file name, size, and file type icon using mock data. Allow sorting by file name using local state. Keep UI simple and readable.",
    },
    {
        emoji: "🛒",
        title: "Build a mini cart system",
        prompt:
            "Build a simple product list with add-to-cart and remove-from-cart functionality using local state. Show cart item count and total price. Keep layout clean and structured.",
    },
];


const SuggestionContainer = () => {
    const [selectedPrompt, setSelectedPrompt] = useState("")
    const formRef = useRef(null)

    const handleTemplateClick = (prompt) => {
        setSelectedPrompt(prompt)
        // Scroll to the form after a short delay to allow the prompt to be set
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100)
    }

    return (
        <div className='max-w-5xl mx-auto mt-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
                {
                    PROJECT_TEMPLATES.map((template, index) => {
                        return (
                            <button
                                key={index}
                                onClick={() => handleTemplateClick(template.prompt)}
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
                <div className="grow border-t border-muted-foreground/40"></div>

                <p className="text-muted-foreground text-sm whitespace-nowrap">
                    OR DESCRIBE YOUR OWN IDEA
                </p>

                <div className="grow border-t border-muted-foreground/40"></div>
            </div>
            <div ref={formRef}>
                <ProjectForm initialPrompt={selectedPrompt} />
            </div>
            <ProjectList />
        </div>
    )
}

export default SuggestionContainer