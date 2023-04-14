import { GitHub as GitHubIcon } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
    useTheme,
    Box,
    Link,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material';
import React, { ReactElement } from 'react';

import { useSelector, useDispatch } from 'store';
import { toggleTheme, toggleDisplayUI } from 'store/app/appActions';
import { getAppTheme } from 'store/app/appSelectors';

let clickCount = 0;
let isToggleBlocked = false;

export const Header = (): ReactElement => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const appTheme = useSelector(getAppTheme);

    const onToggleThemeClick = (): void => {
        dispatch(toggleTheme());
    };

    const onPClick = (): void => {
        if (isToggleBlocked) return;
        clickCount += 1;
        setTimeout(() => {
            clickCount -= 1;
        }, 1000);
        if (clickCount === 5) {
            dispatch(toggleDisplayUI());
            isToggleBlocked = true;
            setTimeout(() => {
                isToggleBlocked = false;
            }, 2000);
        }
    };

    return (
        <Box
            alignItems="center"
            component="header"
            display="flex"
            justifyContent="space-between"
            sx={{
                px: 1,
                zIndex: 1,
            }}
        >
            <Typography
                sx={{
                    userSelect: 'none',
                    color: theme.palette.text.secondary,
                    transition: 'color 2000ms linear',
                }}
                variant="h5"
            >
                stats.s
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link
                    onClick={onPClick}
                    sx={{
                        color: theme.palette.text.secondary,
                        transition: 'color 1500ms linear',
                        textDecoration: 'none',
                    }}
                >
                    p
                </Link>
                ace
            </Typography>
            <Box
                alignItems="center"
                display="flex"
                justifyContent="space-between"
            >
                <Tooltip title="Toggle dark mode">
                    <IconButton
                        onClick={onToggleThemeClick}
                        size="large"
                        sx={{ padding: 1 }}
                    >
                        {appTheme === 'dark' ? (
                            <Brightness7Icon color="primary" />
                        ) : (
                            <Brightness4Icon color="primary" />
                        )}
                    </IconButton>
                </Tooltip>
                <Tooltip title="github.com/Tenemo/stats-space">
                    <IconButton
                        href="https://github.com/Tenemo/stats-space"
                        size="large"
                        sx={{
                            cursor: 'pointer',
                            padding: 1,
                        }}
                    >
                        <GitHubIcon color="primary" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default Header;
