import { useState } from 'react'
import style from "./MenuTop.module.scss";
import { Menu } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

export function MenuTop() {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState("users");

    const goTo = async (item: string, route = '') => {
        route = route.length > 0 ? route : item;
        setActiveItem(item);
        navigate(`/${route}`, { replace: true })
    }

    return (
        <div>
            <Menu inverted>
                <Menu.Item
                    name='users'
                    icon='users'
                    active={activeItem === 'users'}
                    onClick={() => { goTo('users') }}
                ></Menu.Item>
                <Menu.Item
                    name='scopes'
                    icon='clipboard check'
                    active={activeItem === 'scopes'}
                    onClick={() => { goTo('scopes') }}
                ></Menu.Item>
                <Menu.Item
                    name='projects'
                    icon='file alternate'
                    active={activeItem === 'projects'}
                    onClick={() => { goTo('projects') }}
                ></Menu.Item>
            </Menu>
        </div>
    )
}
