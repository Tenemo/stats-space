import type { ISourceOptions } from 'tsparticles-engine';

export const getParticlesOptions = (
    isUIDisplayed: boolean,
): ISourceOptions => ({
    background: {
        color: {
            value: `#000`,
        },
    },
    fpsLimit: 165,
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: 'connect',
            },
            resize: true,
        },
        modes: {
            connect: {
                distance: isUIDisplayed ? 120 : 140,
                radius: isUIDisplayed ? 120 : 140,
                links: {
                    opacity: isUIDisplayed ? 0.1 : 0.2,
                },
            },
        },
    },
    particles: {
        color: {
            value: '#eee',
        },
        collisions: {
            enable: true,
        },
        move: {
            direction: 'right',
            enable: true,
            outModes: {
                default: 'out',
            },
            random: false,
            speed: 0.05,
            straight: true,
        },
        number: {
            density: {
                enable: true,
                area: 1200,
            },
            value: 120,
        },
        opacity: {
            animation: {
                enable: true,
                speed: 0.4,
                sync: false,
            },
            value: { min: 0, max: 1 },
        },
        shape: {
            type: 'circle',
        },
        size: {
            value: { min: 1, max: 3 },
        },
    },
});
