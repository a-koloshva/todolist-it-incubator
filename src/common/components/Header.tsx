import { AppBar, IconButton, Switch, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuButton } from './MenuButton/MenuButton';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { changeThemeAC, ThemeMode } from '../../app/app-reducer';
import { getTheme } from '../theme/theme';

export const Header = () => {
    const dispatch = useDispatch();

    const themeMode = useSelector<RootState, ThemeMode>((state) => state.app.themeMode);

    const theme = getTheme(themeMode);

    const changeModeHandler = useCallback(() => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'));
    }, [dispatch, themeMode]);

    return (
        <AppBar position="static" sx={{ mb: '30px' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton color="inherit">
                    <MenuIcon />
                </IconButton>
                <div>
                    <MenuButton>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={'default'} onChange={changeModeHandler} />
                </div>
            </Toolbar>
        </AppBar>
    );
};
