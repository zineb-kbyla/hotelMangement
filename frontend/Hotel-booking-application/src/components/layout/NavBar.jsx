import React, { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import Logout from "../auth/Logout"


const NavBar = () => {
	const [showAccount, setShowAccount] = useState(false)
	const [isNavOpen, setIsNavOpen] = useState(false)

	const handleAccountClick = () => {
		setShowAccount(!showAccount)
	}

	const handleNavToggle = () => {
		setIsNavOpen(!isNavOpen)
	}

	const isLoggedIn = localStorage.getItem("token")
	const rawRoles = localStorage.getItem("userRole")
	const roles = rawRoles ? rawRoles.split(",").map((role) => role.trim()) : []
	const isAdmin = roles.includes("ROLE_ADMIN")

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
			<div className="container-fluid">
				<Link to={"/"} className="navbar-brand">
					<span className="hotel-color">Luminous Haven Hotel</span>
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					aria-controls="navbarScroll"
					aria-expanded={isNavOpen}
					aria-label="Toggle navigation"
					onClick={handleNavToggle}>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div
					className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
					id="navbarScroll">
					<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
								Browse all rooms
							</NavLink>
						</li>

						{isLoggedIn && isAdmin && (
							<li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to={"/admin"}>
									Admin
								</NavLink>
							</li>
						)}
					</ul>

					<ul className="d-flex navbar-nav">
						<li className="nav-item">
							<NavLink className="nav-link" to={"/find-booking"}>
								Find my booking
							</NavLink>
						</li>

						<li className="nav-item dropdown">
							<a
								className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								onClick={handleAccountClick}>
								{" "}
								Account
							</a>

							<ul
								className={`dropdown-menu ${showAccount ? "show" : ""}`}
								aria-labelledby="navbarDropdown">
								{isLoggedIn ? (
									<Logout />
								) : (
									<li>
										<Link className="dropdown-item" to={"/login"}>
											Login
										</Link>
									</li>
								)}
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default NavBar
