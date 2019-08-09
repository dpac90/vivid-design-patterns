import React, { useEffect, useState, Component } from 'react';
import Dropdown from '../atoms/NavDropdown';
import NavGroup from '../atoms/NavGroup';
import NavSubGroup from '../atoms/NavSubGroup';
import VividLogo from '../atoms/VividSeatsLogo';
import menuData from './fakeMenuResponse';

const isMobile = false;
const loggedInAccount = true;

const myAccountItems = [
    { text: 'Dashboard', href: '/account/Account.action' },
    { text: 'Order History', href: '/account/OrderHistory.action' },
    { text: 'Listing Manager', href: '/account/ListingManager.action' },
    { text: 'Profile', href: '/account/Profile.action' },
    { text: 'Sign out', href: '/Login.action?logout', dividerAbove: true }
];

// const useMenus = () => {
//     const [menuData, setMenuData] = useState({});
//     useEffect(() => {
//         (async () => {
//             const res = await fetch('https://vividseats.com/rest/v2/web/menu/site-menu-links');
//             if (res.status === 200) setMenuData(await res.json());
//         })();
//     }, []);

//     return menuData;
// };

class Nav extends Component {
    // const menuData = useMenus();
    // const [activeGroup, setActiveGroup] = useState('mlb');
    state = {
        activeMainMenu: '',
        activeSubMenu: 'mlb'
    };

    setActiveMainMenu = val => {
        this.setState({ activeMainMenu: val });
    };

    setActiveSubMenu = val => {
        this.setState({ activeSubMenu: val });
    };

    render() {
        const { activeMainMenu, activeSubMenu } = this.state;
        const { setActiveSubMenu, setActiveMainMenu } = this;
        const mainGroupProps = { active: activeMainMenu, setActive: setActiveMainMenu };
        const subGroupProps = { active: activeSubMenu, setActive: setActiveSubMenu };

        return (
            <header id="siteHeader">
                <nav className="vdp-row--justify-between--align-center vdp-container ">
                    <VividLogo href="https://vividseats.com/" width={130} height="auto" />
                    <div className="vdp-drawer__body--compressed">
                        <ul className="vdp-tab-bar--compressed vdp-menu" data-nav="primary" data-state="visible">
                            <NavGroup text="Sport" href="/sports/" {...{ ...mainGroupProps, activeKey: 'sports' }}>
                                <ul className="vdp-tab-bar--compressed vdp-menu" data-nav="secondary" data-state="visible">
                                    <NavSubGroup text="MLB" href="/mlb-baseball/" {...{ ...subGroupProps, activeKey: 'mlb' }}>
                                        <Dropdown
                                            items={menuData.mlb ? menuData.mlb.links : []}
                                            footerItems={[{ text: 'View All MLB Tickets', href: '/mlb/' }]}
                                            cols={3}
                                        />
                                    </NavSubGroup>
                                    <NavSubGroup text="NFL" href="/nfl/" {...{ ...subGroupProps, activeKey: 'nfl' }}>
                                        <Dropdown
                                            items={menuData.nfl ? menuData.nfl.links : []}
                                            footerItems={[{ text: 'View All NFL Tickets', href: '/nfl/' }]}
                                        />
                                    </NavSubGroup>
                                    <NavSubGroup text="NHL" href="/nhl/" {...{ ...subGroupProps, activeKey: 'nhl' }}>
                                        <Dropdown
                                            items={menuData.nhl ? menuData.nhl.links : []}
                                            footerItems={[{ text: 'View All NHL Tickets', href: '/nhl/' }]}
                                        />
                                    </NavSubGroup>
                                </ul>
                            </NavGroup>
                            <NavGroup text="Concerts" href="/concerts/" {...{ ...mainGroupProps, activeKey: 'concerts' }}>
                                <Dropdown
                                    items={menuData.concert ? menuData.concert.links : []}
                                    footerItems={[{ text: 'View All Concert Tickets', href: '/concerts/' }]}
                                />
                            </NavGroup>
                            <NavGroup text="Theater" href="/theater/" {...{ ...mainGroupProps, activeKey: 'theater' }}>
                                <Dropdown
                                    items={menuData.theater ? menuData.theater.links : []}
                                    footerItems={[{ text: 'View All Theater Tickets', href: '/concerts/' }]}
                                />
                            </NavGroup>
                            <div className="vdp-menu__divider" />
                            <li className="vdp-menu__item">
                                {!loggedInAccount ? (
                                    <li className="vdp-menu__item">
                                        <a className="vdp-tab" href="/Login.action">
                                            Sign In
                                        </a>
                                    </li>
                                ) : (
                                    <NavGroup
                                        text="My Account"
                                        href="/account/Account.action"
                                        {...{ ...mainGroupProps, activeKey: 'myAccount' }}>
                                        <Dropdown items={myAccountItems} cols={1} small />
                                    </NavGroup>
                                )}
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Nav;
