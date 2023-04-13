import { Theme } from '@mui/material';
import type { ISourceOptions } from 'tsparticles-engine';

import { AppTheme } from 'store/app/appTypes';

export const getParticlesOptions = (
    theme: AppTheme,
    muiTheme: Theme,
): ISourceOptions => ({
    background: {
        color: {
            value: muiTheme.palette.background.default,
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
                distance: 120,
                radius: 120,
                links: {
                    opacity: 0.05,
                },
            },
        },
    },
    particles: {
        color: {
            value: theme === 'dark' ? '#eee' : '',
        },
        collisions: {
            enable: true,
        },
        move: {
            direction: 'none',
            enable: true,
            outModes: {
                default: 'out',
            },
            random: true,
            speed: 0.1,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 1200,
            },
            value: 80,
        },
        opacity: {
            animation: {
                enable: true,
                speed: 0.1,
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
