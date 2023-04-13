import { GitHub as GitHubIcon } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme, Box, Link, IconButton, Tooltip } from '@mui/material';
import React, { ReactElement } from 'react';

import { useSelector, useDispatch } from 'store';
import { toggleTheme } from 'store/app/appActions';
import { getAppTheme } from 'store/app/appSelectors';

export const Header = (): ReactElement => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const appTheme = useSelector(getAppTheme);

    const onToggleThemeClick = (): void => {
        dispatch(toggleTheme());
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
            <Link
                color={theme.palette.text.primary}
                href="/"
                sx={{
                    transition: 'color 400ms ease-in-out',
                }}
                underline="none"
                variant="h5"
            >
                stats.space
            </Link>
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
