import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import fakeAuth from '../../components/FakeAuth';

const Header = (props) => {
    let history = useHistory();
    const handleLogout = (e) => {
        e.preventDefault();
        fakeAuth.signout(() => history.push('/'))
    }
    return(
        <>
            <header className="app-header">
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid">
                        <span className="navbar-brand">Hack Ideas</span>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/challenges">Challenges</Link>
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <span onClick={handleLogout} className="nav-link cursor-pointer">Logout</span>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Header;