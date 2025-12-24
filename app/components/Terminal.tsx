'use client';

import { motion } from 'motion/react';
import React, { useState, useRef, useEffect } from 'react';
import { Contact } from './Contact';
import Skills from './Skills';
import { Minus, Square, SquareTerminal, X } from 'lucide-react';
/* import MorphingLoader from './MorphLoading'; */
import { Timeline } from './timeline';
import Image from 'next/image';

interface TerminalLine {
    type: 'input' | 'output';
    content: string | React.ReactNode;
    cwd?: string;
}

interface Command {
    cmd: string;
    desc: string;
    isImportant: boolean | false;
}

const Terminal: React.FC = () => {
    const [history, setHistory] = useState<TerminalLine[]>([
        { type: 'output', content: 'Type "help" to see available commands.' },
        { type: 'output', content: '' },
    ]);
    const [currentInput, setCurrentInput] = useState('');
    const [cwd, setCwd] = useState('~');
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const totalCommand: Command[] = [
        { cmd: 'whoami', desc: 'Print about developer', isImportant: true },
        { cmd: 'skill', desc: 'Show skills', isImportant: true },
        { cmd: 'ls', desc: 'List directory contents', isImportant: false },
        { cmd: 'date', desc: 'Display current date and time', isImportant: false },
        { cmd: 'clear', desc: 'Clear the screen', isImportant: false },
        { cmd: 'help', desc: 'Show available commands', isImportant: false },

    ];

    const timeLineData = [
        {
            title: "Discover Myanmar",
            content: (
                <div>
                    <p className="mb-8 text-xs font-normal  md:text-sm text-neutral-200">
                        Discover Myanmar is a web application that showcases the beauty of
                        Myanmar through user-generated content. Users can share their
                        experiences and photos of beautiful locations across Myanmar,
                        creating an interactive platform for exploring the country&apos;s
                        diverse landscapes and cultural sites. The platform features a
                        moderation system where administrators review and approve posts to
                        ensure quality content, making it a reliable source for travelers
                        and locals alike to discover hidden gems and popular destinations
                        throughout Myanmar. The combination of user submissions and
                        administrative oversight creates a curated collection of authentic
                        Myanmar experiences.
                    </p>
                    <a
                        href="https://discover-myanmar.vercel.app/user/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 mb-8 text-sm font-medium text-black bg-white rounded-lg ">
                        Visit Website
                    </a>
                    <div className="grid grid-cols-2 gap-4">
                        <Image
                            src="/project/discover-myanmar/dm-1.png"
                            alt="startup template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <Image
                            src="/project/discover-myanmar/dm-2.png"
                            alt="startup template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <Image
                            src="/project/discover-myanmar/dm-3.png"
                            alt="startup template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <Image
                            src="/project/discover-myanmar/dm-4.png"
                            alt="startup template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "untold",
            content: (
                <div>
                    <p className="mb-8 text-xs font-normal text-neutral-200 md:text-sm ">
                        untold is like NGL with better feature. You can create a book and
                        share it with your friends. You can also join other people&apos;s
                        book. You can also create a book and share it with your friends. You
                        can also join other people&apos;s book. You can also create a book
                        and share it with your friends. You can also join other
                        people&apos;s book.
                    </p>
                    <a
                        href="https://untold-tan.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 mb-8 text-sm font-medium text-black bg-white rounded-lg ">
                        Visit Website
                    </a>
                    <div className="grid grid-cols-2 gap-4">
                        <Image
                            src="/project/untold/untold-1.png"
                            alt="startup template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <Image
                            src="/project/untold/untold-2.png"
                            alt="startup template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />{" "}
                        <Image
                            src="/project/untold/untold-3.png"
                            alt="startup template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "ch2k",
            content: (
                <div>
                    <p className="mb-8 text-xs font-normal text-neutral-200 md:text-sm">
                        ch2k is a web app. Design to manage your Jewelry shop with easy and
                        simple. This product is on production.
                    </p>
                    <p className="mb-8 text-xs font-normal text-neutral-200 md:text-sm ">
                        Ch2k is a comprehensive jewelry shop management system that I
                        developed from the ground up. It features inventory tracking, sales
                        management, customer relationship tools, and detailed reporting
                        capabilities. The system helps jewelry shop owners streamline their
                        operations, manage their precious inventory more effectively, and
                        provide better service to their customers. Built with modern web
                        technologies, it offers a responsive and intuitive interface that
                        works seamlessly across all devices.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <Image
                            src="/project/ch2k/ch2k-1.png"
                            alt="hero template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <Image
                            src="/project/ch2k/ch2k-2.png"
                            alt="hero template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />{" "}
                        <Image
                            src="/project/ch2k/ch2k-3.png"
                            alt="hero template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />{" "}
                        <Image
                            src="/project/ch2k/ch2k-4.png"
                            alt="hero template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Au-Helper",
            content: (
                <div>
                    <p className="mb-4 text-xs font-normal text-neutral-200 md:text-sm">
                        AU-HELPER is a web app for Assumption University that helps students
                        navigate classes and access school services. Users can easily browse
                        and find information about classes, facilities, and campus services.
                        As an admin, you have full control over the content management
                        system - you can create new posts about services or locations, edit
                        existing information to keep it up to date, and remove outdated
                        content. The admin dashboard provides a simple interface to moderate
                        and maintain all the information displayed to users.
                    </p>
                    <a
                        href="https://au-helper.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 mb-8 text-sm font-medium text-black bg-white rounded-lg ">
                        Visit Website
                    </a>

                    <div className="grid grid-cols-2 gap-4">
                        <Image
                            src="/project/au-helper/au-helper-1.png"
                            alt="hero template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <Image
                            src="/project/au-helper/au-helper-2.png"
                            alt="hero template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <Image
                            src="/project/au-helper/au-helper-4.png"
                            alt="hero template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <Image
                            src="/project/au-helper/au-helper-3.png"
                            alt="hero template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Snake and Ladder",
            content: (
                <div>
                    <a
                        href="https://snake-ladder-eight.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 mb-8 text-sm font-medium text-black bg-white rounded-lg ">
                        Visit Website
                    </a>
                    <div className="grid grid-cols-2 gap-4">
                        <Image
                            src="/project/snake-ladder/sl-1.png"
                            alt="startup template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <Image
                            src="/project/snake-ladder/sl-2.png"
                            alt="startup template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <Image
                            src="/project/snake-ladder/sl-3.png"
                            alt="startup template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <Image
                            src="/project/snake-ladder/sl-4.png"
                            alt="startup template"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 hover:scale-200 over"
                        />
                    </div>
                </div>
            ),
        },
    ];

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim();

        // Add input to history
        const newHistory: TerminalLine[] = [
            ...history,
            { type: 'input', content: cmd, cwd }
        ];
        switch (trimmedCmd) {
            case 'help':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="mt-1 mb-2">
                            <div className="grid grid-cols-3 gap-x-6 gap-y-1 ">
                                {totalCommand.map(({ cmd, desc, isImportant }) => (
                                    <React.Fragment key={cmd}>
                                        <span className="font-semibold text-yellow-300">{cmd}</span>
                                        <span className={`col-span-2 ${isImportant ? 'text-[#8ae234]' : 'text-[#d3d7cf]'}`}>{desc}</span>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )
                });
                break;
            case 'clear':
                setHistory([]);
                setCurrentInput('');
                return; // Early return to avoid adding extra output
            case 'project':
                newHistory.push({ type: 'output', content: (<Timeline data={timeLineData} />) });
                break;
            case 'ls':
                newHistory.push({ type: 'output', content: 'Documents  Downloads  Music  Pictures  Public  Templates  Videos' });
                break;
            case 'date':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="text-[#d3d7cf]">
                            <span className="text-[#729fcf] font-semibold">Today</span> is{' '}
                            <span className="text-[#8ae234]">{new Date().toLocaleDateString(undefined, { weekday: 'long' })}</span>,{' '}
                            <span className="text-yellow-300">{new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</span>{' '}
                            <span className="text-[#ad7fa8]">{new Date().getFullYear()}</span> at{' '}
                            <span className="text-[#34e2e2]">{new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    )
                });
                break;
            case 'whoami':
                newHistory.push({
                    type: 'output',
                    content: (
                        <Contact />
                    ),
                });
                break;
            case 'skill':
                newHistory.push({ type: 'output', content: (<Skills />) });
                break;
            default:
                newHistory.push({ type: 'output', content: `${trimmedCmd} : command not found` });
        }


        setHistory(newHistory);
        setCurrentInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(currentInput);
        }
    };

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    if (loading) {
        return null;
    }

    return (
        <div className='w-full max-w-4xl '>
            {/*             <div>
                <Timeline data={timeLineData} />
            </div> */}

            <motion.div
                className="mx-auto my-8  rounded-sm overflow-hidden  font-mono text-sm rounded-none bg-[#2C2C2C] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#000000] "
                initial={{ opacity: 0, y: 40, }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                    staggerChildren: 0.08,
                    delayChildren: 0.2
                }}

            >
                {/* Title Bar */}
                <div className="bg-[#2D2D2D] h-10 flex items-center justify-between px-3 select-none border-b border-black/50">
                    {/* Left: Terminal Icon */}
                    <div className="flex items-center justify-center w-8 h-8 rounded hover:bg-white/10 cursor-pointer transition-colors">
                        <SquareTerminal />
                    </div>

                    {/* Center: Title */}
                    <div className="font-bold text-[#E6E6E6] text-sm tracking-wide flex-1 text-center">
                        banyar@ubuntu
                    </div>

                    {/* Right: Controls */}
                    <div className="flex items-center gap-1">

                        {/* Minimize */}
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors group">
                            <Minus />
                        </button>
                        {/* Maximize */}
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors group">
                            <Square />
                        </button>
                        {/* Close */}
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#E95420] transition-colors group">
                            <X />
                        </button>
                    </div>
                </div>

                {/* Terminal Content */}
                <div
                    className="bg-[#300a24] text-white p-2 h-132 md:h-150 overflow-y-auto cursor-text scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-white scrollbar-track-slate-300 overflow-y-scroll"
                    onClick={focusInput}
                >
                    <div className="flex flex-col space-y-1">
                        {history.map((line, index) => (
                            <div key={index} className="break-words">
                                {line.type === 'input' ? (
                                    <div>
                                        <span className="text-[#8ae234] font-bold">banyar@ubuntu</span>

                                        <span className="text-[#729fcf] font-bold px-1">{line.cwd}</span>
                                        <span className="text-white mr-2">$</span>
                                        <span className="text-yellow-300"> {line.content}</span>
                                    </div>
                                ) : typeof line.content === 'string' ? (
                                    <div className="whitespace-pre-wrap">{line.content}</div>
                                ) : (
                                    <>{line.content}</>
                                )}
                            </div>
                        ))}
                    </div>


                    {/* Input Line */}
                    <div className="flex items-center mt-1">
                        <span className="text-[#8ae234] font-bold">banyar@ubuntu</span>
                        <span className="text-[#729fcf] font-bold px-1">{cwd}</span>
                        <span className="text-white mr-2">$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent border-none outline-none focus:ring-0 p-0 text-sm font-ubuntu text-yellow-300"
                            autoFocus
                            autoComplete="off"
                            spellCheck="false"
                        />
                    </div>
                    <div ref={bottomRef} />
                </div>
            </motion.div>

        </div>
    );
};

export default Terminal;
