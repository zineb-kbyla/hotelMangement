import React from "react"
import { Navigate, useLocation } from "react-router-dom"

const normalizeRoles = (rawRoles) => {
	if (!rawRoles) {
		return []
	}
	if (Array.isArray(rawRoles)) {
		return rawRoles
	}
	return String(rawRoles)
		.split(",")
		.map((role) => role.trim())
		.filter(Boolean)
}

const RequireAuth = ({ children, requiredRole }) => {
	const user = localStorage.getItem("userId")
	const location = useLocation()
	if (!user) {
		return <Navigate to="/login" state={{ path: location.pathname }} />
	}
	if (requiredRole) {
		const roles = normalizeRoles(localStorage.getItem("userRole"))
		if (!roles.includes(requiredRole)) {
			return <Navigate to="/login" state={{ path: location.pathname }} />
		}
	}
	return children
}
export default RequireAuth
