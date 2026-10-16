import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {getTheme} from "@/common/theme/theme.ts";
import {changeThemeModeAC} from "@/app/app-reducer.ts";
import {AppBar, Button, Container, IconButton, Toolbar} from "@mui/material";
import {containerSx} from "@/TodolistItem.styles.ts";
import MenuIcon from "@mui/icons-material/Menu";
import {NavButton} from "@/NavButton.ts";
import Switch from "@mui/material/Switch";

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)

    const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }

    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar>
                <Container maxWidth={'lg'} sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Button color={"inherit"}>Sign in</Button>
                    <div>
                        <NavButton color="inherit">Sign in</NavButton>
                        <NavButton color="inherit">Sign up</NavButton>
                        <NavButton background={theme.palette.primary.dark} color="inherit">Faq</NavButton>
                        <Switch color={'default'} onChange={changeMode}/>
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    )
}



