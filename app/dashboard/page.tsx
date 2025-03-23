"use client";

import { useAuthStore } from "@/store/auth";
import React from "react";
import StudentDashboardPage from "./student";
import TeacherDashboardPage from "./teacher";

export default function DashbaordLayout({ children }: { children: React.ReactNode }) {
	const { user } = useAuthStore();
	if (user?.role === "student") {
		return <StudentDashboardPage />;
	} else {
		return <TeacherDashboardPage />;
	}
	return null;
}
